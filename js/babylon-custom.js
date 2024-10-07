export const world = (function () {
    let engine, canvas, scene, camera, galacticlight, skybox;

    // Sistema de planetas inicial vacío
    const system = {};
    const SCALE_FACTOR = 10; // Ajustar la escala de distancia

    const cameraType = {
        ARCROTATE: 'arcrotate'
    };

    /**
     * Muestra errores en la consola
     */
    const showError = function (errorMessage) {
        console.error(errorMessage);
    };

    /**
     * Getter para el motor de BabylonJS (usado para el resizing)
     */
    const getEngine = function () {
        return engine;
    };

    /**
     * Crea y retorna un material para un cuerpo celeste
     */
    const createMaterial = function (name, mapPath, emissive) {
        const material = new BABYLON.StandardMaterial(name, scene);
        const texturePath = 'img/textures/' + mapPath;

        if (emissive) {
            material.emissiveTexture = new BABYLON.Texture(texturePath, scene);
            material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        } else {
            material.diffuseTexture = new BABYLON.Texture(texturePath, scene);
        }

        // Eliminar brillo especular
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        return material;
    };

    /**
     * Crea un planeta basado en datos proporcionados
     */
    const createPlanet = function (planetData) {
        planetData.mesh = BABYLON.Mesh.CreateSphere(planetData.name, 16, planetData.diameter, scene);
        planetData.mesh.position.x = planetData.xpos;
    };

    /**
     * Crea una órbita visual para un planeta
     */
    const createOrbit = function (planetName, radius, color) {
        const orbitPoints = [];
        const orbitSegments = 64; // Definición del círculo con 64 segmentos

        for (let i = 0; i <= orbitSegments; i++) {
            const theta = (i / orbitSegments) * 2 * Math.PI;
            const x = radius * Math.cos(theta);
            const z = radius * Math.sin(theta);
            orbitPoints.push(new BABYLON.Vector3(x, 0, z));
        }

        const orbit = BABYLON.MeshBuilder.CreateLines(`${planetName}_orbit`, { points: orbitPoints }, scene);
        orbit.color = color;

        return orbit;
    };

    /**
     * Crea la escena de BabylonJS
     */
    const createScene = function (type) {
        // Crear la escena
        scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0, 0, 0);

        // Crear la cámara
        camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 25, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Luz global
        galacticlight = new BABYLON.HemisphericLight('galacticlight', new BABYLON.Vector3(0, 1, 0), scene);
        galacticlight.intensity = 0.5;

        // Skybox
        skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('img/textures/skybox/skybox', scene,
            ['_px.png', '_py.png', '_pz.png', '_nx.png', '_ny.png', '_nz.png']);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.material = skyboxMaterial;

        return scene;
    };

    const addChildNode = function (satelliteData, parentPlanet, distanceFactor, scaleX, scaleY, scaleZ) {

        // Create a sphere for the satellite
        satelliteData.mesh = BABYLON.Mesh.CreateSphere(satelliteData.name, 64, 5, scene);

        // Scale the satellite based on the parameters provided
        satelliteData.mesh.scaling = new BABYLON.Vector3(scaleX * 0.1, scaleX * 0.1, scaleX * 0.1);

        // Create and apply the material for the satellite
        satelliteData.mesh.material = createMaterial(satelliteData.name, `${satelliteData.name.toLowerCase()}.jpg`, false);

        // Set the initial position of the satellite relative to its parent
        satelliteData.mesh.position = new BABYLON.Vector3(distanceFactor, 0, 0);

        // Make the satellite a child of the parent planet so it orbits around it
        satelliteData.mesh.parent = parentPlanet.mesh;

        // Create a path animation to simulate the orbit around the parent
        const orbitAnimation = new BABYLON.Animation(
            `${satelliteData.name}Orbit`,
            "position",
            30, // Frames per second
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        // Define the keyframes for the orbit (circular path)
        const keyFrames = [];
        const orbitRadius = distanceFactor; // Set the radius of the orbit
        const numFrames = 360; // Number of frames for one full orbit

        for (let frame = 0; frame <= numFrames; frame++) {
            const angle = (frame / numFrames) * 2 * Math.PI; // Angle in radians
            const x = orbitRadius * Math.cos(angle); // X position
            const z = orbitRadius * Math.sin(angle); // Z position
            keyFrames.push({
                frame: frame,
                value: new BABYLON.Vector3(x, 0, z), // Orbit on the X-Z plane
            });
        }

        // Set the keyframes to the animation
        orbitAnimation.setKeys(keyFrames);

        // Attach the animation to the satellite's mesh
        satelliteData.mesh.animations.push(orbitAnimation);

        // Begin the animation
        scene.beginAnimation(satelliteData.mesh, 0, numFrames, true);
    };

    /**
     * Crea un nodo padre con inclinación para la órbita y el planeta
     */
    const createOrbitAndParentNode = function (planetData, orbitRadius, inclination, orbitColor) {
        // Crear el nodo padre para aplicar la inclinación
        const orbitParentNode = new BABYLON.TransformNode(`${planetData.name}_orbit_parent`, scene);

        // Crear la órbita visual como hijo del nodo
        createOrbit(planetData.name, orbitRadius, orbitColor).parent = orbitParentNode;

        // Aplicar la inclinación al nodo padre
        orbitParentNode.rotation.x = inclination * (Math.PI / 180);

        return orbitParentNode;
    };

    const showCardInfo = (card) => {
        //document.getElementById('parrafo').style.display = 'none';
        const infoCard = document.getElementById('info-box');
        document.getElementById('cardTitle').innerText = card.title;
        document.getElementById('cardType').innerText = card.type;
        document.getElementById('cardDescription').innerText = card.description;
        document.getElementById('parrafo').style.display = 'none';
        infoCard.style.display = 'block';
    };

    const addActionToCelestialBody = (mesh, card) => {
        mesh.actionManager = new BABYLON.ActionManager(scene);

        // Evento al hacer clic
        mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                showCardInfo(card);
            })
        );
    };

    /**
     * Añade un planeta y su órbita al sistema
     */
    const addPlanetAndOrbit = function (elementData, orbitColor, diameterScale = 1) {
        const { name, semiMajorAxis, orbitalInclination, siderealPeriod, meanAnomalyAtEpoch, child, card } = elementData;

        // Definir propiedades del planeta
        const diameter = diameterScale; // Ajustar el diámetro según sea necesario
        const orbitRadius = semiMajorAxis * SCALE_FACTOR;

        // Crear el nodo padre con inclinación para la órbita y el planeta
        const orbitParentNode = createOrbitAndParentNode(elementData, orbitRadius, orbitalInclination, orbitColor);

        // Crear el planeta como hijo del nodo de la órbita
        system[name.toLowerCase()] = {
            mesh: BABYLON.Mesh.CreateSphere(name, 16, diameter, scene),
            name: name.toLowerCase(),
            emissive: false,
            map: `${name.toLowerCase()}.jpg`,
            diameter,
            orbitParentNode,
            rotation: {
                speed: 0.01, // Ajustar la velocidad de rotación si es necesario
                angle: 0
            },
            orbit: {
                radius: orbitRadius,
                speed: (1 / siderealPeriod) * 0.001, // Ajustar la velocidad orbital para la visualización
                angle: meanAnomalyAtEpoch * (Math.PI / 180) // Convertir el ángulo a radianes
            }
        };

        // Aplicar el material al planeta
        system[name.toLowerCase()].mesh.material = createMaterial(name, `${name.toLowerCase()}.jpg`, false);

        // Posicionar el planeta en su órbita y hacerlo hijo del nodo padre
        system[name.toLowerCase()].mesh.position.x = orbitRadius;
        system[name.toLowerCase()].mesh.parent = orbitParentNode;

        // Añadir el evento de clic para mostrar la tarjeta
        addActionToCelestialBody(system[name.toLowerCase()].mesh, card);

        // Añadir satélite si existe
        if (child) {
            addChildNode(child, system[name.toLowerCase()], child.semiMajorAxis, 0.3, 0.3, 0.3);
        }
    };


    // Variables para almacenar los cuerpos celestes según su tipo
    let normalPlanetsMeshes = [];
    let phaMeshes = [];
    let dwarfPlanetsMeshes = [];

    /**
     * Función para limpiar la escena
     */
    function clearScene() {
        // Oculta todos los cuerpos celestes existentes
        normalPlanetsMeshes.forEach(mesh => mesh.dispose());
        phaMeshes.forEach(mesh => mesh.dispose());
        dwarfPlanetsMeshes.forEach(mesh => mesh.dispose());

        // Vacía los arrays
        normalPlanetsMeshes = [];
        phaMeshes = [];
        dwarfPlanetsMeshes = [];
    }

    /**
     * Procesar un elemento y agregarlo a la escena
     */
    function processElement(elementData, color, diameterScale) {
        addPlanetAndOrbit(elementData, color, diameterScale);

        // Agregar el mesh al array correspondiente
        if (elementData.type === 'planet') {
            normalPlanetsMeshes.push(system[elementData.name.toLowerCase()].mesh);
        } else if (elementData.type === 'pha') {
            phaMeshes.push(system[elementData.name.toLowerCase()].mesh);
        } else if (elementData.type === 'dwarf_planet') {
            dwarfPlanetsMeshes.push(system[elementData.name.toLowerCase()].mesh);
        }
    }
    /**
     * Obtiene y procesa los datos de los cuerpos celestes
     */
    /**
 * Obtiene y procesa los datos de los cuerpos celestes
 */
    const fetchAndProcessPlanets = async function (type) {
        try {
            const response = await fetch('https://hocknas.pythonanywhere.com/trajectories');
            if (!response.ok) {
                throw new Error(`Error al obtener los datos: ${response.status}`);
            }
            const data = await response.json();

            // Limpiar la escena antes de añadir nuevos cuerpos celestes
            clearScene();

            // Procesar según el tipo especificado
            if (type === 'planets') {
                data.bodies.planets.forEach(planet => {
                    processElement(planet, new BABYLON.Color3(1, 1, 1), 1.3); // Color blanco para planetas
                });
            } else if (type === 'pha') {
                data.bodies.pha.forEach(pha => {
                    processElement(pha, new BABYLON.Color3(1, 0, 0), 0.1); // Color rojo y tamaño reducido para PHA
                });
            } else if (type === 'dwarf_planets') {
                data.bodies.dwarf_planets.forEach(dwarf => {
                    processElement(dwarf, new BABYLON.Color3(0, 0, 1), 1.0); // Color azul para planetas enanos
                });
            }
        } catch (error) {
            showError(error);
        }
    };

    // Manejadores de eventos para los botones
    document.getElementById('showPlanets').addEventListener('click', () => fetchAndProcessPlanets('planets'));
    document.getElementById('showPHA').addEventListener('click', () => fetchAndProcessPlanets('pha'));
    document.getElementById('showDwarfs').addEventListener('click', () => fetchAndProcessPlanets('dwarf_planets'));


    /**
     * Actualiza las posiciones de todos los cuerpos celestes en el sistema
     */
    const updateCelestialPositions = function () {
        for (let key in system) {
            const planet = system[key];

            // Actualizar posición de la órbita
            if (planet.orbit.angle !== 0) {
                const x = planet.orbit.radius * Math.cos(planet.orbit.angle);
                const z = planet.orbit.radius * Math.sin(planet.orbit.angle);

                planet.mesh.position.x = x;
                planet.mesh.position.z = z;

                // Actualizar el ángulo orbital
                planet.orbit.angle += planet.orbit.speed;
            }

            // Rotación del planeta sobre su propio eje
            planet.mesh.rotate(new BABYLON.Vector3(0, 1, 0), planet.rotation.speed);
        }
    };

    /**
     * Inicializa el canvas, motor, escena y bucle de render
     */
    const init = function () {
        try {
            canvas = document.getElementById('renderCanvas');
            if (!canvas) showError('Canvas no encontrado');

            engine = new BABYLON.Engine(canvas, true);
            scene = createScene(cameraType.ARCROTATE);

            // Animación del sistema
            engine.scenes[0].beforeRender = updateCelestialPositions;

            engine.runRenderLoop(function () {
                if (scene) scene.render();
            });

            // Llama a la función para obtener y procesar los planetas del endpoint
            fetchAndProcessPlanets();

        } catch (e) {
            showError(e);
        }
    };

    // Método público para iniciar el proyecto
    const run = function () {
        init();
    };

    return {
        run,
        getEngine
    };
})();
