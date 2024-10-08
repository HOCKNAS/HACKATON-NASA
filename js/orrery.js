/**
 * Displays information based on the provided identifier (info).
 * @param {string} info - The identifier for the type of information to display.
 */
function showInfo(info) {
    // Selects the info box element where the message will be displayed.
    const infoBox = document.getElementById('info-box');
    let message = '';

    // Switch statement to determine the message content based on the 'info' parameter.
    switch(info) {
        case 'info1':
            message = 'The solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. There are five officially recognized dwarf planets in our solar system: Ceres, Pluto, Haumea, Makemake, and Eris.';
            break;
        case 'info2':
            message = 'Potentially Hazardous Asteroids (PHAs) are currently defined based on parameters that measure the asteroid’s potential to make threatening close approaches to the Earth. Specifically, all asteroids with a minimum orbit intersection distance (MOID) of 0.05 au or less and an absolute magnitude (H) of 22.0 or less are considered.';
            break;
        case 'info3':
            message = 'Beyond Neptune, a newer class of smaller worlds called dwarf planets reign, including longtime favorite Pluto. The other dwarf planets are Ceres, Makemake, Haumea, and Eris. Ceres is the only dwarf planet in the inner solar system. It is located in the main asteroid belt between Mars and Jupiter.';
            break;
        default:
            message = 'Haz clic en un botón para ver la información.'; // Default message in Spanish: "Click on a button to see the information."
    }

    // Updates the content of the info box with the selected message and placeholders for additional info.
    infoBox.innerHTML = `
        <h3 id="parrafo">${message}</h3>
        <h2 id="cardTitle"></h2>
        <h4 id="cardType"></h4>
        <p id="cardDescription"></p>
        <a id="cardurl"></a>
    `;

    // Disables the button that triggered the event (if applicable).
    event.target.disabled = true;
}

/**
 * Closes the dialog box by setting its display style to 'none'.
 */
function closeDialog() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'none'; // Hides the dialog box
}

// Shows the dialog box when the page is loaded
window.onload = function() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'block'; // Displays the dialog box
};

// Adds an event listener to trigger the change event on 'toggleLabels' when the window is fully loaded.
window.addEventListener('load', () => {
    // Simulates a change event on the 'toggleLabels' checkbox to initialize label visibility.
    document.getElementById('toggleLabels').dispatchEvent(new Event('change'));
});
