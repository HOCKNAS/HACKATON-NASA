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
    const createOrbit = function (planetName, radius, inclination) {
        const orbitPoints = [];
        const orbitSegments = 64; // Definición del círculo con 64 segmentos

        for (let i = 0; i <= orbitSegments; i++) {
            const theta = (i / orbitSegments) * 2 * Math.PI;
            const x = radius * Math.cos(theta);
            const z = radius * Math.sin(theta);
            orbitPoints.push(new BABYLON.Vector3(x, 0, z));
        }

        const orbit = BABYLON.MeshBuilder.CreateLines(`${planetName}_orbit`, { points: orbitPoints }, scene);
        orbit.color = new BABYLON.Color3(1, 0, 0); // Color rojo

        // Aplicar la inclinación
        orbit.rotation.z = inclination * (Math.PI / 180);
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
     * Añade un planeta y su órbita al sistema
     */
    const addPlanetAndOrbit = function (elementData) {
        const { name, semiMajorAxis, orbitalInclination, siderealPeriod, meanAnomalyAtEpoch, child } = elementData;
    
        // Definir propiedades del planeta
        const diameter = 1.0; // Ajustar el diámetro según sea necesario
        const orbitRadius = semiMajorAxis * SCALE_FACTOR;
        
        system[name.toLowerCase()] = {
            mesh: null,
            name: name.toLowerCase(),
            emissive: false,
            map: `${name.toLowerCase()}.jpg`,
            diameter,
            xpos: orbitRadius,
            rotation: {
                speed: 0.01, // Ajustar la velocidad de rotación si es necesario
                angle: 0
            },
            orbit: {
                radius: orbitRadius,
                speed: (1 / siderealPeriod) * 0.01, // Ajustar la velocidad orbital para la visualización
                angle: meanAnomalyAtEpoch * (Math.PI / 180) // Convertir el ángulo a radianes
            }
        };
    
        // Crear el planeta
        createPlanet(system[name.toLowerCase()]);
        system[name.toLowerCase()].mesh.material = createMaterial(name, `${name.toLowerCase()}.jpg`, false);
    
        // Crear la órbita visual
        createOrbit(system[name.toLowerCase()].name, orbitRadius, orbitalInclination);
        system[name.toLowerCase()].mesh.rotation.z = orbitalInclination * (Math.PI / 180);
    
        // // Si el planeta tiene un satélite, añadirlo como nodo hijo
        // if (child) {
        //     addChildNode(child, system[name.toLowerCase()], child.semiMajorAxis * SCALE_FACTOR, 0.7, 0.7, 0.7);
        // }
    };
    

    /**
     * Obtiene y procesa los datos de los planetas
     */
    const fetchAndProcessPlanets = async function () {
        try {
            const response = await fetch('http://127.0.0.1:5000/trajectories');
            if (!response.ok) {
                throw new Error(`Error al obtener los datos: ${response.status}`);
            }
            const data = await response.json();
            const elements = data.bodies.planets; // Planetas, pha y dwarf_planets

            // Itera sobre los datos y añade cada planeta
            //elements.forEach(element => addPlanetAndOrbit(element));

            elements.forEach(element => {
                addPlanetAndOrbit(element);
    
                // Verificar si tiene satélite (o satélites)
                if (element.child) {
                    // Procesar el satélite como un nodo hijo
                    console.log(element.child.name)

                    addChildNode(element.child, system[element.name.toLowerCase()], 2 , 0.7, 0.7, 0.7);
                }
            });
        } catch (error) {
            showError(error);
        }
    };

    /**
     * Actualiza las posiciones de todos los cuerpos celestes en el sistema
     */
    const updateCelestialPositions = function () {
        for (let key in system) {
            const planet = system[key];
            
            // Actualizar posición de la órbita
            if (planet.orbit.angle !== 0) {
                planet.mesh.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
                planet.mesh.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);
                planet.orbit.angle += planet.orbit.speed;
            }

            // Rotación del planeta
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
