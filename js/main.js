// Import the BabylonJS project module
import { world } from './babylon-custom.js';

// When the HTML document is fully loaded and parsed, execute the function
window.addEventListener('DOMContentLoaded', function() {
    // Initialize the BabylonJS scene
    world.run();

    // Add a listener to adjust the canvas size when the window is resized
    window.addEventListener('resize', function() {
        // Resize the BabylonJS engine to fit the new window dimensions
        world.getEngine().resize();
    });
});
