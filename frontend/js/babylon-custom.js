export const world = (function () {
    let engine, canvas, scene, camera, galacticlight, skybox;

    // Sistema de planetas inicial vacío
    const system = {};

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
     * Crea un planeta basado en datos proporcionados
     */
    const createPlanet = function (planetData) {
        planetData.mesh = BABYLON.Mesh.CreateSphere(planetData.name, 16, planetData.diameter, scene);
        planetData.mesh.position.x = planetData.xpos;

        const planetMaterial = new BABYLON.StandardMaterial(planetData.name, scene);
        const materialPath = 'img/textures/' + planetData.map;

        if (planetData.emissive) {
            planetMaterial.emissiveTexture = new BABYLON.Texture(materialPath, scene);
            planetMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        } else {
            planetMaterial.diffuseTexture = new BABYLON.Texture(materialPath, scene);
        }

        // Eliminar brillo especular
        planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        planetData.mesh.material = planetMaterial;
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


    const addPlanetAndOrbit = function (elementData) {
        const { name, semiMajorAxis, orbitalInclination,
            siderealPeriod, meanAnomalyAtEpoch } = elementData;

        // Crear un nuevo objeto en el sistema
        system[name.toLowerCase()] = {
            mesh: null,
            name: name.toLowerCase(),
            emissive: false,
            map: `${name.toLowerCase()}.jpg`, // La imagen debe estar en la carpeta img/textures/
            diameter: 1.0, // Ajustar el diámetro según sea necesario
            xpos: semiMajorAxis * 10, // Escalar la posición para la visualización
            rotation: {
                speed: 0.01, // Ajustar la velocidad de rotación si es necesario
                angle: 0
            },
            orbit: {
                radius: semiMajorAxis * 10, // Escalar la órbita
                speed: (1 / siderealPeriod) * 0.01, // Ajustar la velocidad orbital para la visualización
                angle: meanAnomalyAtEpoch * (Math.PI / 180) // Convertir el ángulo a radianes
            }
        };

        // Crear el planeta
        createPlanet(system[name.toLowerCase()]);

        // Aplicar la inclinación de la órbita
        system[name.toLowerCase()].mesh.rotation.z = orbitalInclination * (Math.PI / 180);
    };

    const elements = [
        {
            name: "Venus",
            semiMajorAxis: 0.72333199,
            orbitalInclination: 3.39471,
            argumentOfPerigee: 54.9,
            orbitalEccentricity: 0.00677323,
            ascendingNode: 76.7,
            meanAnomalyAtEpoch: 181.98,
            siderealPeriod: 0.615
        },
        {
            name: "1994PC1",
            semiMajorAxis: 1.35,
            orbitalInclination: 33.5,
            argumentOfPerigee: 47.6,
            orbitalEccentricity: 0.328,
            ascendingNode: 117.9,
            meanAnomalyAtEpoch: 136.5,
            siderealPeriod: 1.56
        },
        {
            name: "2012SW20",
            semiMajorAxis: 2.46,
            orbitalInclination: 10.2,
            argumentOfPerigee: 62.1,
            orbitalEccentricity: 0.68,
            ascendingNode: 209.8,
            meanAnomalyAtEpoch: 224.3,
            siderealPeriod: 3.86
        }
        // Agrega más elementos según sea necesario
    ];
    
    
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
            engine.scenes[0].beforeRender = function () {
                for (let i in system) {
                    const planet = system[i];
                    if (planet.orbit.angle !== 0) {
                        planet.mesh.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
                        planet.mesh.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);
                        planet.orbit.angle += planet.orbit.speed;
                    }
                    planet.mesh.rotate(new BABYLON.Vector3(0, 1, 0), planet.rotation.speed);
                }
            };

            engine.runRenderLoop(function () {
                if (scene) scene.render();
            });

            elements.forEach(element => addPlanetAndOrbit(element));

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
