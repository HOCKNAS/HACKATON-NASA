export const world = (function () {
    let engine, canvas, scene, camera, galacticlight, skybox;

    // Initial empty planetary system
    const system = {};
    const SCALE_FACTOR = 10; // Scale factor to adjust distance in the scene for visualization

    // Camera type for configuring scene camera
    const cameraType = {
        ARCROTATE: 'arcrotate'
    };

    /**
     * Displays errors in the console
     * @param {string} errorMessage - The error message to display
     */
    const showError = function (errorMessage) {
        console.error(errorMessage);
    };

    /**
     * Getter for BabylonJS engine (used for resizing)
     * @returns {BABYLON.Engine} - The current BabylonJS engine instance
     */
    const getEngine = function () {
        return engine;
    };

    // Array to store labels for celestial bodies
    const labels = [];

    /**
     * Creates a label for a celestial body
     * @param {string} bodyName - The name of the body
     * @param {BABYLON.Mesh} bodyMesh - The mesh representing the body
     * @param {object} card - Data to display on the information card
     * @param {string} type - Type of celestial body (e.g., planet, PHA)
     * @returns {BABYLON.GUI.Rectangle} - The created label rectangle
     */
    const createLabelForBody = (bodyName, bodyMesh, card, type) => {
        // Creates a full-screen GUI texture to render the label
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // Creates a rectangular GUI element for the label
        const labelRect = new BABYLON.GUI.Rectangle();
        labelRect.width = "60px";
        labelRect.height = "30px";
        labelRect.cornerRadius = 5;
        labelRect.color = "white";
        labelRect.thickness = 1;
        labelRect.background = "black";
        labelRect.isPointerBlocker = true; // Makes the label interactive
        advancedTexture.addControl(labelRect);

        // Creates a text block within the label rectangle
        const labelText = new BABYLON.GUI.TextBlock();
        labelText.text = bodyName;
        labelText.color = "white";
        labelText.fontSize = 12;
        labelRect.addControl(labelText);

        // Links the label to the celestial body mesh and offsets it for visibility
        labelRect.linkWithMesh(bodyMesh);
        labelRect.linkOffsetY = -30; // Adjusts Y-axis position

        // Adds an on-click event to the label
        labelRect.onPointerDownObservable.add(function () {
            // Displays the information card for the celestial body
            showCardInfo(type, card);

            // Centers the camera on the selected body
            camera.setTarget(bodyMesh.getAbsolutePosition());

            // Calculates optimal camera radius based on body size
            const meshRadius = bodyMesh.getBoundingInfo().boundingSphere.radiusWorld;
            const desiredRadius = Math.max(meshRadius * 3, 5); // Ensures a minimum radius for small objects

            // Adjusts the camera's minimum radius to avoid collisions
            camera.lowerRadiusLimit = desiredRadius; // Adjust multiplier as necessary

            // Configures an animation to smoothly zoom in the camera
            const animation = new BABYLON.Animation(
                "cameraZoom",
                "radius",
                30, // FPS
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            );

            // Defines keyframes for the camera zoom animation
            const keys = [];
            keys.push({ frame: 0, value: camera.radius }); // Starts at current radius
            keys.push({ frame: 60, value: desiredRadius }); // Ends at desired radius

            // Sets the keyframes for the animation
            animation.setKeys(keys);

            // Applies the animation to the camera
            camera.animations.push(animation);

            // Starts the camera zoom animation
            scene.beginAnimation(camera, 0, 60, false);

            // Saves the selected object for camera tracking
            selectedObject = bodyMesh;
        });

        // Adds the label to the labels array for later reference
        labels.push(labelRect);
        return labelRect;
    };

    /**
     * Creates and returns a material for a celestial body
     * @param {string} name - The name of the material
     * @param {string} mapPath - Path to the texture map
     * @param {boolean} emissive - Determines if the material is emissive
     * @returns {BABYLON.StandardMaterial} - The created material
     */
    const createMaterial = function (name, mapPath, emissive) {
        const material = new BABYLON.StandardMaterial(name, scene);
        const texturePath = 'img/textures/' + mapPath;

        // Configures emissive or diffuse texture based on parameters
        if (emissive) {
            material.emissiveTexture = new BABYLON.Texture(texturePath, scene);
            material.diffuseColor = new BABYLON.Color3(0, 0, 0); // Darkens diffuse to enhance glow
        } else {
            material.diffuseTexture = new BABYLON.Texture(texturePath, scene);
        }

        // Removes specular highlights to avoid shine
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        return material;
    };

    /**
     * Creates a visual orbit for a planet
     * @param {string} planetName - The name of the planet
     * @param {number} radius - The radius of the orbit
     * @param {BABYLON.Color3} color - The color of the orbit
     * @returns {BABYLON.LinesMesh} - The created orbit mesh
     */
    const createOrbit = function (planetName, radius, color) {
        const orbitPoints = [];
        const orbitSegments = 64; // Defines circle with 64 segments for smoothness

        // Calculates the points of the orbit circle
        for (let i = 0; i <= orbitSegments; i++) {
            const theta = (i / orbitSegments) * 2 * Math.PI;
            const x = radius * Math.cos(theta);
            const z = radius * Math.sin(theta);
            orbitPoints.push(new BABYLON.Vector3(x, 0, z));
        }

        // Creates a lines mesh to represent the orbit
        const orbit = BABYLON.MeshBuilder.CreateLines(`${planetName}_orbit`, { points: orbitPoints }, scene);
        orbit.color = color; // Sets the orbit color

        return orbit;
    };

    /**
     * Creates the BabylonJS scene with default lighting and camera setup
     * @param {string} type - The type of camera to use (arcrotate in this case)
     * @returns {BABYLON.Scene} - The created scene
     */
    const createScene = function (type) {
        // Initializes the BabylonJS scene
        scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0, 0, 0); // Sets background to black

        // Creates and configures the camera
        camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 25, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true); // Enables user interaction

        // Creates a global hemispheric light source
        galacticlight = new BABYLON.HemisphericLight('galacticlight', new BABYLON.Vector3(0, 1, 0), scene);
        galacticlight.intensity = 0.5; // Sets light intensity

        // Creates a skybox to represent space background
        skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('img/textures/skybox/skybox', scene,
            ['_px.png', '_py.png', '_pz.png', '_nx.png', '_ny.png', '_nz.png']);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.material = skyboxMaterial;

        return scene;
    };

    /**
     * Adds a child satellite to a planet node
     * @param {string} type - The type of celestial body (e.g., satellite)
     * @param {object} satelliteData - Data for the satellite
     * @param {object} parentPlanet - The parent planet object
     * @param {number} distanceFactor - Distance from the parent planet
     * @param {number} scaleX - Scale factor for X dimension
     * @param {number} scaleY - Scale factor for Y dimension
     * @param {number} scaleZ - Scale factor for Z dimension
     */
    const addChildNode = function (type, satelliteData, parentPlanet, distanceFactor, scaleX, scaleY, scaleZ) {
        // Creates a sphere mesh for the satellite
        satelliteData.mesh = BABYLON.Mesh.CreateSphere(satelliteData.name, 64, 5, scene);
        // Scales the satellite mesh based on the provided scale factors
        satelliteData.mesh.scaling = new BABYLON.Vector3(scaleX * 0.1, scaleX * 0.1, scaleX * 0.1);

        // Creates and applies a material to the satellite
        satelliteData.mesh.material = createMaterial(satelliteData.name, `${satelliteData.name.toLowerCase()}.jpg`, false);

        // Sets the initial position of the satellite relative to its parent
        satelliteData.mesh.position = new BABYLON.Vector3(distanceFactor, 0, 0);

        // Makes the satellite a child of the parent planet, enabling relative orbit
        satelliteData.mesh.parent = parentPlanet.mesh;

        // Creates a circular orbit animation for the satellite
        const orbitAnimation = new BABYLON.Animation(
            `${satelliteData.name}Orbit`,
            "position",
            30, // Frames per second
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        // Defines the keyframes for the orbit animation
        const keyFrames = [];
        const orbitRadius = distanceFactor; // Orbit radius
        const numFrames = 360; // Frames for one complete orbit

        // Calculates circular path around parent planet
        for (let frame = 0; frame <= numFrames; frame++) {
            const angle = (frame / numFrames) * 2 * Math.PI; // Angle in radians
            const x = orbitRadius * Math.cos(angle); // X position
            const z = orbitRadius * Math.sin(angle); // Z position
            keyFrames.push({
                frame: frame,
                value: new BABYLON.Vector3(x, 0, z), // Orbit on X-Z plane
            });
        }

        // Sets the keyframes for the animation
        orbitAnimation.setKeys(keyFrames);

        // Attaches the orbit animation to the satellite mesh
        satelliteData.mesh.animations.push(orbitAnimation);

        // Begins the orbit animation
        scene.beginAnimation(satelliteData.mesh, 0, numFrames, true);

        // Adds interactivity to the celestial body
        addActionToCelestialBody(type, satelliteData.mesh, satelliteData.card);

        // Creates and attaches a label for the satellite
        const label = createLabelForBody(satelliteData.name, satelliteData.mesh, satelliteData.card, type);

        label.isVisible = document.getElementById('toggleLabels').checked;
       
    };

    /**
     * Creates a parent node with inclination for the orbit and planet
     * @param {object} planetData - Data of the planet
     * @param {number} orbitRadius - Radius of the orbit
     * @param {number} inclination - Orbital inclination in degrees
     * @param {BABYLON.Color3} orbitColor - Color of the visual orbit
     * @returns {BABYLON.TransformNode} - The created parent node for orbit
     */
    const createOrbitAndParentNode = function (planetData, orbitRadius, inclination, orbitColor) {
        // Creates a parent node to apply inclination
        const orbitParentNode = new BABYLON.TransformNode(`${planetData.name}_orbit_parent`, scene);

        // Creates a visual orbit as a child of the parent node
        createOrbit(planetData.name, orbitRadius, orbitColor).parent = orbitParentNode;

        // Applies the inclination to the parent node (rotates on the X-axis)
        orbitParentNode.rotation.x = inclination * (Math.PI / 180);

        return orbitParentNode;
    };

    /**
     * Displays information on the interactive card
     * @param {string} type - Type of celestial body
     * @param {object} card - Data to be displayed on the card
     */
    const showCardInfo = (type, card) => {
        // Grabs the HTML elements for card display and updates them with the body info
        const infoCard = document.getElementById('info-box');
        document.getElementById('cardTitle').innerText = card.title;
        document.getElementById('cardType').innerText = card.type;
        document.getElementById('cardDescription').innerText = card.description;
        if (type === 'planets') {
            document.getElementById('cardurl').innerText = "https://science.nasa.gov/" + card.title.toLowerCase();
            document.getElementById('cardurl').href = "https://science.nasa.gov/" + card.title.toLowerCase();
        }
        document.getElementById('parrafo').style.display = 'none';
        infoCard.style.display = 'block';
    };

    /**
     * Adds interactivity (click events) to a celestial body
     * @param {string} type - Type of celestial body
     * @param {BABYLON.Mesh} mesh - The mesh of the body
     * @param {object} card - Data to display on the card
     */
    const addActionToCelestialBody = (type, mesh, card) => {
        // Initializes an action manager for the mesh
        mesh.actionManager = new BABYLON.ActionManager(scene);

        // Registers an on-click event for the mesh
        mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                // Displays the information card for the celestial body
                showCardInfo(type, card);

                // Centers the camera on the selected mesh
                camera.setTarget(mesh.getAbsolutePosition());

                // Calculates optimal camera radius based on body size
                const meshRadius = mesh.getBoundingInfo().boundingSphere.radiusWorld;
                const desiredRadius = Math.max(meshRadius * 3, 5); // Ensures a minimum radius for small objects

                // Sets the camera's lower radius limit
                camera.lowerRadiusLimit = desiredRadius;

                // Configures the camera zoom animation
                const animation = new BABYLON.Animation(
                    "cameraZoom",
                    "radius",
                    30, // FPS
                    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                );

                // Defines keyframes for the zoom animation
                const keys = [];
                keys.push({ frame: 0, value: camera.radius }); // Starts at current radius
                keys.push({ frame: 60, value: desiredRadius }); // Ends at desired radius

                // Sets the keyframes to the animation
                animation.setKeys(keys);

                // Applies the animation to the camera
                camera.animations.push(animation);

                // Starts the zoom animation
                scene.beginAnimation(camera, 0, 60, false);

                // Saves the selected mesh for camera tracking
                selectedObject = mesh;
            })
        );
    };

    /**
     * Adds a planet and its orbit to the system
     * @param {string} type - Type of celestial body (e.g., planet)
     * @param {object} elementData - Data for the celestial body
     * @param {BABYLON.Color3} orbitColor - Color for the orbit
     * @param {number} diameterScale - Scale for the body's diameter
     */
    const addPlanetAndOrbit = function (type, elementData, orbitColor, diameterScale = 1) {
        const { name, semiMajorAxis, orbitalInclination, siderealPeriod, meanAnomalyAtEpoch, card } = elementData;

        // Defines properties for the planet
        const diameter = diameterScale; // Adjust diameter as needed
        const orbitRadius = semiMajorAxis * SCALE_FACTOR; // Scales semi-major axis for visualization

        // Creates a parent node with inclination for the orbit and planet
        const orbitParentNode = createOrbitAndParentNode(elementData, orbitRadius, orbitalInclination, orbitColor);

        // Creates the planet as a child of the orbit node
        system[name.toLowerCase()] = {
            mesh: BABYLON.Mesh.CreateSphere(name, 16, diameter, scene),
            name: name.toLowerCase(),
            emissive: false,
            map: `${name.toLowerCase()}.jpg`,
            diameter,
            orbitParentNode,
            rotation: {
                speed: 0.01, // Adjusts the speed of self-rotation
                angle: 0
            },
            orbit: {
                radius: orbitRadius,
                speed: (1 / siderealPeriod) * 0.001, // Adjusts orbit speed for visualization
                angle: meanAnomalyAtEpoch * (Math.PI / 180) // Converts initial angle to radians
            }
        };

        // Applies the material to the planet
        if (name.toLowerCase() === "sun") {
            // For the Sun, uses an emissive texture and point light to simulate glowing
            system[name.toLowerCase()].mesh.material = createMaterial(name, `${name.toLowerCase()}.jpg`, true);
            const sunLight = new BABYLON.PointLight('sunlight', BABYLON.Vector3.Zero(), scene);
            sunLight.intensity = 2.2; // Adjusts light intensity
            sunLight.diffuse = new BABYLON.Color3(1, 0.9, 0.7); // Warm color to simulate sunlight
            sunLight.position = new BABYLON.Vector3(0, 0, 0);
        } else {
            // For other planets, uses a standard diffuse material
            system[name.toLowerCase()].mesh.material = createMaterial(name, `${name.toLowerCase()}.jpg`, false);
        }

        // Positions the planet in its orbit and makes it a child of the orbit node
        system[name.toLowerCase()].mesh.position.x = orbitRadius;
        system[name.toLowerCase()].mesh.parent = orbitParentNode;

        // Adds interactivity to the planet mesh
        addActionToCelestialBody(type, system[name.toLowerCase()].mesh, card);

        // Creates a label for the planet and sets its visibility
        const label = createLabelForBody(name, system[name.toLowerCase()].mesh, card, type);
        label.isVisible = document.getElementById('toggleLabels').checked;;

    };

    // Arrays to store meshes of celestial bodies based on their type
    let normalPlanetsMeshes = [];
    let phaMeshes = [];
    let dwarfPlanetsMeshes = [];

    /**
     * Clears the scene of all celestial bodies and labels
     */
    function clearScene() {
        // Disposes all existing celestial body meshes
        normalPlanetsMeshes.forEach(mesh => mesh.dispose());
        phaMeshes.forEach(mesh => mesh.dispose());
        dwarfPlanetsMeshes.forEach(mesh => mesh.dispose());

        // Clears the arrays
        normalPlanetsMeshes = [];
        phaMeshes = [];
        dwarfPlanetsMeshes = [];
    }

    /**
     * Processes a celestial element and adds it to the scene
     * @param {string} type - Type of celestial body
     * @param {object} elementData - Data of the celestial body
     * @param {BABYLON.Color3} color - Color for the orbit
     * @param {number} diameterScale - Scale for the body's diameter
     */
    function processElement(type, elementData, color, diameterScale) {
        addPlanetAndOrbit(type, elementData, color, diameterScale);

        // Adds the mesh to the appropriate array based on type
        if (type === 'planet') {
            normalPlanetsMeshes.push(system[elementData.name.toLowerCase()].mesh);
        } else if (type === 'pha') {
            phaMeshes.push(system[elementData.name.toLowerCase()].mesh);
        } else if (type === 'dwarf_planet') {
            dwarfPlanetsMeshes.push(system[elementData.name.toLowerCase()].mesh);
        }
    }

    /**
     * Fetches and processes data for celestial bodies
     * @param {string} type - The type of bodies to fetch (e.g., planets, pha)
     */
    const fetchAndProcessPlanets = async function (type) {
        try {
            const response = await fetch('https://hocknas.pythonanywhere.com/trajectories');
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            const data = await response.json();

            // Clears the scene before adding new celestial bodies
            clearScene();

            // Processes planets and renders them in the scene
            if (type === 'planets') {
                data.bodies.planets.forEach(planet => {
                    processElement(type, planet, new BABYLON.Color3(1, 1, 1), 1.3); // White color for planets
                    if (planet.child) {
                        // Adds satellite when the planet is fully rendered
                        addChildNode(type, planet.child, system[planet.name.toLowerCase()], 2, 0.7, 0.3, 0.3);
                    }
                });

            } else if (type === 'pha') {
                data.bodies.pha.forEach(pha => {
                    processElement(type, pha, new BABYLON.Color3(1, 0, 0), 0.1); // Red color and reduced size for PHA
                });
            } else if (type === 'dwarf_planets') {
                data.bodies.dwarf_planets.forEach(dwarf => {
                    processElement(type, dwarf, new BABYLON.Color3(0, 0, 1), 1.0); // Blue color for dwarf planets
                });
            }
        } catch (error) {
            showError(error);
        }
    };

    // Event handlers for buttons to fetch and display different types of celestial bodies
    document.getElementById('showPlanets').addEventListener('click', () => fetchAndProcessPlanets('planets'));
    document.getElementById('showPHA').addEventListener('click', () => fetchAndProcessPlanets('pha'));
    document.getElementById('showDwarfs').addEventListener('click', () => fetchAndProcessPlanets('dwarf_planets'));

    // Event handler for toggling label visibility
    document.getElementById('toggleLabels').addEventListener('change', function (e) {
        const showLabels = e.target.checked;

        // Toggles label visibility based on checkbox state
        labels.forEach(label => {
            label.isVisible = showLabels;
        });
    });

    /**
     * Updates positions of all celestial bodies in the system
     */
    const updateCelestialPositions = function () {
        for (let key in system) {
            const planet = system[key];

            // Updates the orbit position
            if (planet.orbit.angle !== 0) {
                const x = planet.orbit.radius * Math.cos(planet.orbit.angle);
                const z = planet.orbit.radius * Math.sin(planet.orbit.angle);

                planet.mesh.position.x = x;
                planet.mesh.position.z = z;

                // Updates orbital angle based on speed
                planet.orbit.angle += planet.orbit.speed;
            }

            // Rotates the planet on its own axis
            planet.mesh.rotate(new BABYLON.Vector3(0, 1, 0), planet.rotation.speed);
        }
    };

    /**
     * Initializes the canvas, engine, scene, and render loop
     */
    const init = function () {
        try {
            canvas = document.getElementById('renderCanvas');
            if (!canvas) showError('Canvas not found');

            // Initializes the BabylonJS engine
            engine = new BABYLON.Engine(canvas, true);
            scene = createScene(cameraType.ARCROTATE);

            // Animation for updating celestial positions
            engine.scenes[0].beforeRender = updateCelestialPositions;

            // Starts the render loop
            engine.runRenderLoop(function () {
                if (scene) scene.render();
            });

            // Fetches and processes initial planets from the endpoint
            fetchAndProcessPlanets();

        } catch (e) {
            showError(e);
        }
    };

    // Public method to start the simulation
    const run = function () {
        init();
    };

    return {
        run,
        getEngine
    };
})();
