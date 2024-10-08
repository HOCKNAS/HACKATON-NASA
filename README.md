# **AstroDynamics**

[Visit AstroDynamics](https://www.astrodynamics.digital/)

Part of the NASA Space Apps Challenge 2024  
[Project Page: Exploradores del Cosmos UNAD](https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/exploradores-del-cosmos_unad/?tab=project)

---

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)

---

## **Project Overview**

AstroDynamics is an interactive web application designed to visualize and explore the wonders of our solar system. It leverages 3D rendering technologies to provide an educational and engaging experience for users of all ages, allowing them to learn more about planets, dwarf planets, and Potentially Hazardous Asteroids (PHA).

This project is part of the NASA Space Apps Challenge 2024 and aims to inspire curiosity and interest in astronomy through an accessible and interactive platform.

## **Features**

- **Interactive 3D Orrery**: Explore the solar system with a dynamic 3D model that visualizes the orbits and positions of celestial bodies.
- **Educational Trivia Game**: Test your knowledge about space and celestial objects through a fun and engaging trivia game.
- **Informative Labels & Cards**: Click on any planet, asteroid, or celestial object to learn more about it with an interactive card system.
- **Responsive Design**: Optimized for both desktop and mobile devices, ensuring an engaging experience on any screen size.
- **Toggle Labels and Info**: Show or hide labels for celestial objects for a customized viewing experience.

## **Tech Stack**

To develop AstroDynamics, the backend is powered by Python, which serves an API providing data in JSON format. This data is meticulously compiled from NASA's public websites, detailing various planets and celestial bodies.
The frontend is responsible for presenting the 3D visualizations and interactive elements.

- **Frontend**: HTML, CSS, JavaScript
- **3D Rendering**: [Babylon.js](https://www.babylonjs.com/) for creating interactive 3D scenes
- **Backend**: Python(Flask)
- **JSON Endpoint**: An [API endpoint](https://hocknas.pythonanywhere.com/trajectories) to serve the compiled JSON data of planets and celestial bodies.