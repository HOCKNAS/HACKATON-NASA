
function showInfo(info) {
    const infoBox = document.getElementById('info-box');
    let message = '';

    switch(info) {
        case 'info1':
            message = 'The solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. There are five officially recognized dwarf planets in our solar system: Ceres, Pluto, Haumea, Makemake, and Eris.';
            break;
        case 'info2':
            message = 'Potentially Hazardous Asteroids (PHAs) are currently defined based on parameters that measure the asteroid’s potential to make threatening close approaches to the Earth. Specifically, all asteroids with a minimum orbit intersection distance (MOID) of 0.05 au or less and an absolute magnitude (H) of 22.0 or less are considered';
            break;
        case 'info3':
            message = 'Beyond Neptune, a newer class of smaller worlds called dwarf planets reign, including longtime favorite Pluto. The other dwarf planets are Ceres, Makemake, Haumea, and Eris. Ceres is the only dwarf planet in the inner solar system. It s located in the main asteroid belt between Mars and Jupiter.';
            break;
        default:
            message = 'Haz clic en un botón para ver la información.';
    }

    infoBox.innerHTML = `
        <h3 id="parrafo">${message}</h3>
        <h2 id="cardTitle"></h2>
        <h4 id="cardType"></h4>
        <p id="cardDescription"></p>
    `;
}

function closeDialog() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'none'; // Cierra el cuadro de diálogo
}

// Mostrar el cuadro de diálogo al cargar la página
window.onload = function() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'block'; // Muestra el cuadro de diálogo
};