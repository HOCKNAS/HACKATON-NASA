// Importar los módulos del proyecto BabylonJS
import { world } from './babylon-custom.js';

window.addEventListener('DOMContentLoaded', function() {
    // Inicializar la escena de BabylonJS
    world.run();

    // Ajustar el tamaño del lienzo cuando la ventana cambie de tamaño
    window.addEventListener('resize', function() {
        world.getEngine().resize();
    });
});

