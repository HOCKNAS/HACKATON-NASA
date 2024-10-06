from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}) 

data = {
  "bodies": {
    "planets": [
      {
        "name": "Sun",
        "semiMajorAxis": 0,
        "orbitalInclination": 0,
        "argumentOfPerigee": 0,
        "orbitalEccentricity": 0,
        "ascendingNode": 0,
        "meanAnomalyAtEpoch": 0,
        "siderealPeriod": 0,
        "card": {
          "title": "Sun",
          "type": "Star",
          "description": "The central star of the Solar System, providing light and heat to planets.",
          "url": "https://www.google.com"
        }
      },
      {
        "name": "Mercury",
        "semiMajorAxis": 0.387098,
        "orbitalInclination": 7.00487,
        "argumentOfPerigee": 29.12,
        "orbitalEccentricity": 0.20563,
        "ascendingNode": 48.331,
        "meanAnomalyAtEpoch": 174.796,
        "siderealPeriod": 0.2408467,
        "card": {
          "title": "Mercury",
          "type": "Planet",
          "description": "The smallest and closest planet to the Sun in the Solar System."
        }
      },
      {
        "name": "Venus",
        "semiMajorAxis": 0.72333199,
        "orbitalInclination": 3.39471,
        "argumentOfPerigee": 54.884,
        "orbitalEccentricity": 0.00677323,
        "ascendingNode": 76.68,
        "meanAnomalyAtEpoch": 50.115,
        "siderealPeriod": 0.61519726,
        "card": {
          "title": "Venus",
          "type": "Planet",
          "description": "The second planet from the Sun, with a thick, toxic atmosphere and extreme temperatures."
        }
      },
      {
        "name": "Earth",
        "semiMajorAxis": 1.00000011,
        "orbitalInclination": 0.00005,
        "argumentOfPerigee": 114.20783,
        "orbitalEccentricity": 0.01671022,
        "ascendingNode": -11.26064,
        "meanAnomalyAtEpoch": 357.51716,
        "siderealPeriod": 1.0000174,
        "card": {
          "title": "Earth",
          "type": "Planet",
          "description": "The third planet from the Sun and the only known celestial body to support life."
        },
        "child" : {
          "name": "moon"
          } 
      },
      {
        "name": "Mars",
        "semiMajorAxis": 1.52366231,
        "orbitalInclination": 1.85061,
        "argumentOfPerigee": 286.502,
        "orbitalEccentricity": 0.09341233,
        "ascendingNode": 49.57854,
        "meanAnomalyAtEpoch": 19.412,
        "siderealPeriod": 1.8808476,
        "card": {
          "title": "Mars",
          "type": "Planet",
          "description": "The fourth planet from the Sun, known as the Red Planet due to its iron oxide surface."
        }
      },
      {
        "name": "Jupiter",
        "semiMajorAxis": 5.20336301,
        "orbitalInclination": 1.3053,
        "argumentOfPerigee": 275.066,
        "orbitalEccentricity": 0.04839266,
        "ascendingNode": 100.55615,
        "meanAnomalyAtEpoch": 20.02,
        "siderealPeriod": 11.862615,
        "card": {
          "title": "Jupiter",
          "type": "Planet",
          "description": "The largest planet in the Solar System, known for its Great Red Spot and many moons."
        }
      },
      {
        "name": "Saturn",
        "semiMajorAxis": 9.53707032,
        "orbitalInclination": 2.48446,
        "argumentOfPerigee": 336.013,
        "orbitalEccentricity": 0.0541506,
        "ascendingNode": 113.71504,
        "meanAnomalyAtEpoch": 317.02,
        "siderealPeriod": 29.447498,
        "card": {
          "title": "Saturn",
          "type": "Planet",
          "description": "The second-largest planet, distinguished by its extensive ring system."
        }
      },
      {
        "name": "Uranus",
        "semiMajorAxis": 19.19126393,
        "orbitalInclination": 0.76986,
        "argumentOfPerigee": 96.998857,
        "orbitalEccentricity": 0.04716771,
        "ascendingNode": 74.22988,
        "meanAnomalyAtEpoch": 142.2386,
        "siderealPeriod": 84.016846,
        "card": {
          "title": "Uranus",
          "type": "Planet",
          "description": "An ice giant with a tilted axis, causing extreme seasonal variations."
        }
      },
      {
        "name": "Neptune",
        "semiMajorAxis": 30.06896348,
        "orbitalInclination": 1.76917,
        "argumentOfPerigee": 273.187,
        "orbitalEccentricity": 0.00858587,
        "ascendingNode": 131.72169,
        "meanAnomalyAtEpoch": 256.228,
        "siderealPeriod": 164.79132,
        "card": {
          "title": "Neptune",
          "type": "Planet",
          "description": "The furthest ice giant from the Sun, with strong winds and storms."
        }
      }
    ],
    "pha": [
      {
        "name": "2004TN1",
        "semiMajorAxis": 2.74,
        "orbitalInclination": 8.4,
        "argumentOfPerigee": 233.5,
        "orbitalEccentricity": 0.698,
        "ascendingNode": 214.0,
        "meanAnomalyAtEpoch": 66.6,
        "siderealPeriod": 4.55,
        "card": {
          "title": "2004 TN1",
          "type": "Asteroid",
          "description": "A near-Earth object classified as an asteroid."
        }
      },
      {
        "name": "2011SM68",
        "semiMajorAxis": 1.40,
        "orbitalInclination": 19.2,
        "argumentOfPerigee": 109.1,
        "orbitalEccentricity": 0.664,
        "ascendingNode": 24.2,
        "meanAnomalyAtEpoch": 292.6,
        "siderealPeriod": 1.65,
        "card": {
          "title": "2011 SM68",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with an orbit crossing Earth's path."
        }
      },
      {
        "name": "2014EG45",
        "semiMajorAxis": 1.61,
        "orbitalInclination": 25.5,
        "argumentOfPerigee": 296.2,
        "orbitalEccentricity": 0.498,
        "ascendingNode": 164.3,
        "meanAnomalyAtEpoch": 156.4,
        "siderealPeriod": 2.04,
        "card": {
          "title": "2014 EG45",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with an elongated orbit."
        }
      },
      {
        "name": "2003EE16",
        "semiMajorAxis": 1.42,
        "orbitalInclination": 0.6,
        "argumentOfPerigee": 259.7,
        "orbitalEccentricity": 0.614,
        "ascendingNode": 127.0,
        "meanAnomalyAtEpoch": 62.7,
        "siderealPeriod": 1.69,
        "card": {
          "title": "2003 EE16",
          "type": "Asteroid",
          "description": "An asteroid classified as a potentially hazardous object."
        }
      },
      {
        "name": "2012TY52",
        "semiMajorAxis": 1.66,
        "orbitalInclination": 9.6,
        "argumentOfPerigee": 252.6,
        "orbitalEccentricity": 0.553,
        "ascendingNode": 221.8,
        "meanAnomalyAtEpoch": 323.4,
        "siderealPeriod": 2.15,
        "card": {
          "title": "2012 TY52",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with a highly elliptical orbit."
        }
      },
      {
        "name": "2009WM1",
        "semiMajorAxis": 1.18,
        "orbitalInclination": 25.8,
        "argumentOfPerigee": 162.6,
        "orbitalEccentricity": 0.169,
        "ascendingNode": 240.3,
        "meanAnomalyAtEpoch": 355.3,
        "siderealPeriod": 1.28,
        "card": {
          "title": "2009 WM1",
          "type": "Asteroid",
          "description": "A small near-Earth asteroid."
        }
      },
      {
        "name": "2006SU49",
        "semiMajorAxis": 1.41,
        "orbitalInclination": 2.5,
        "argumentOfPerigee": 199.0,
        "orbitalEccentricity": 0.312,
        "ascendingNode": 303.2,
        "meanAnomalyAtEpoch": 200.2,
        "siderealPeriod": 1.85,
        "card": {
          "title": "2006 SU49",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with a potentially hazardous orbit."
        }
      },
      {
        "name": "1998SC15",
        "semiMajorAxis": 1.27,
        "orbitalInclination": 16.1,
        "argumentOfPerigee": 277.4,
        "orbitalEccentricity": 0.415,
        "ascendingNode": 198.8,
        "meanAnomalyAtEpoch": 27.0,
        "siderealPeriod": 1.80,
        "card": {
          "title": "1998 SC15",
          "type": "Asteroid",
          "description": "A near-Earth object observed in 1998."
        }
      },
      {
        "name": "2010MU112",
        "semiMajorAxis": 1.76,
        "orbitalInclination": 48.0,
        "argumentOfPerigee": 119.2,
        "orbitalEccentricity": 0.540,
        "ascendingNode": 261.2,
        "meanAnomalyAtEpoch": 300.5,
        "siderealPeriod": 2.71,
        "card": {
          "title": "2010 MU112",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with an irregular orbit."
        }
      },
      {
        "name": "2011AG5",
        "semiMajorAxis": 1.43,
        "orbitalInclination": 3.7,
        "argumentOfPerigee": 53.5,
        "orbitalEccentricity": 0.390,
        "ascendingNode": 135.7,
        "meanAnomalyAtEpoch": 60.8,
        "siderealPeriod": 1.99,
        "card": {
          "title": "2011 AG5",
          "type": "Asteroid",
          "description": "A near-Earth object once considered a potential impact threat."
        }
      },
      {
        "name": "1994PC1",
        "semiMajorAxis": 1.35,
        "orbitalInclination": 33.5,
        "argumentOfPerigee": 47.6,
        "orbitalEccentricity": 0.328,
        "ascendingNode": 117.9,
        "meanAnomalyAtEpoch": 136.5,
        "siderealPeriod": 1.56,
        "card": {
          "title": "1994 PC1",
          "type": "Asteroid",
          "description": "A large near-Earth asteroid with a potential for close approaches to Earth."
        }
      },
      {
        "name": "2012SW20",
        "semiMajorAxis": 2.46,
        "orbitalInclination": 10.2,
        "argumentOfPerigee": 62.1,
        "orbitalEccentricity": 0.680,
        "ascendingNode": 209.8,
        "meanAnomalyAtEpoch": 224.3,
        "siderealPeriod": 3.86,
        "card": {
          "title": "2012 SW20",
          "type": "Asteroid",
          "description": "A near-Earth asteroid identified in 2012."
        }
      },
      {
        "name": "2007PV27",
        "semiMajorAxis": 1.27,
        "orbitalInclination": 24.6,
        "argumentOfPerigee": 107.6,
        "orbitalEccentricity": 0.371,
        "ascendingNode": 324.5,
        "meanAnomalyAtEpoch": 324.1,
        "siderealPeriod": 1.44,
        "card": {
          "title": "2007 PV27",
          "type": "Asteroid",
          "description": "An asteroid with a highly elliptical orbit."
        }
      },
      {
        "name": "2007TU24",
        "semiMajorAxis": 2.04,
        "orbitalInclination": 5.6,
        "argumentOfPerigee": 334.2,
        "orbitalEccentricity": 0.534,
        "ascendingNode": 127,
        "meanAnomalyAtEpoch": 132.9,
        "siderealPeriod": 2.92,
        "card": {
          "title": "2007 TU24",
          "type": "Asteroid",
          "description": "A near-Earth object known for its close approach to Earth."
        }
      },
      {
        "name": "2004XP14",
        "semiMajorAxis": 1.05,
        "orbitalInclination": 33,
        "argumentOfPerigee": 273.7,
        "orbitalEccentricity": 0.158,
        "ascendingNode": 281,
        "meanAnomalyAtEpoch": 4.5,
        "siderealPeriod": 1.08,
        "card": {
          "title": "2004 XP14",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with a potential for close approaches."
        }
      },
      {
        "name": "2009KK",
        "semiMajorAxis": 1.5,
        "orbitalInclination": 18.2,
        "argumentOfPerigee": 247.3,
        "orbitalEccentricity": 0.455,
        "ascendingNode": 68.2,
        "meanAnomalyAtEpoch": 328.3,
        "siderealPeriod": 1.84,
        "card": {
          "title": "2009 KK",
          "type": "Asteroid",
          "description": "A near-Earth asteroid discovered in 2009."
        }
      },
      {
        "name": "2007JY2",
        "semiMajorAxis": 2.2,
        "orbitalInclination": 1.6,
        "argumentOfPerigee": 105.3,
        "orbitalEccentricity": 0.687,
        "ascendingNode": 225.6,
        "meanAnomalyAtEpoch": 95.3,
        "siderealPeriod": 3.26,
        "card": {
          "title": "2007 JY2",
          "type": "Asteroid",
          "description": "An asteroid with an orbit that occasionally intersects with Earth."
        }
      },
      {
        "name": "2002CU11",
        "semiMajorAxis": 1.22,
        "orbitalInclination": 48.8,
        "argumentOfPerigee": 110.5,
        "orbitalEccentricity": 0.295,
        "ascendingNode": 157.8,
        "meanAnomalyAtEpoch": 114.9,
        "siderealPeriod": 1.35,
        "card": {
          "title": "2002 CU11",
          "type": "Asteroid",
          "description": "A near-Earth object that has been monitored for its orbit."
        }
      },
      {
        "name": "2000EK26",
        "semiMajorAxis": 2.41,
        "orbitalInclination": 15.6,
        "argumentOfPerigee": 305.5,
        "orbitalEccentricity": 0.659,
        "ascendingNode": 126.5,
        "meanAnomalyAtEpoch": 10.8,
        "siderealPeriod": 3.73,
        "card": {
          "title": "2000 EK26",
          "type": "Asteroid",
          "description": "An asteroid classified as a near-Earth object."
        }
      },
      {
        "name": "2001VK5",
        "semiMajorAxis": 1.27,
        "orbitalInclination": 19.4,
        "argumentOfPerigee": 263.9,
        "orbitalEccentricity": 0.514,
        "ascendingNode": 54.3,
        "meanAnomalyAtEpoch": 102.9,
        "siderealPeriod": 1.43,
        "card": {
          "title": "2001 VK5",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with an orbit that crosses Earth's path."
        }
      },
      {
        "name": "2005YU55",
        "semiMajorAxis": 1.16,
        "orbitalInclination": 0.3,
        "argumentOfPerigee": 273.6,
        "orbitalEccentricity": 0.431,
        "ascendingNode": 35.9,
        "meanAnomalyAtEpoch": 218.6,
        "siderealPeriod": 1.25,
        "card": {
          "title": "2005 YU55",
          "type": "Asteroid",
          "description": "A large, round near-Earth asteroid with a close approach history."
        }
      },
      {
        "name": "2008DJ",
        "semiMajorAxis": 1.98,
        "orbitalInclination": 5.1,
        "argumentOfPerigee": 117.8,
        "orbitalEccentricity": 0.603,
        "ascendingNode": 319.2,
        "meanAnomalyAtEpoch": 173.9,
        "siderealPeriod": 2.79,
        "card": {
          "title": "2008 DJ",
          "type": "Asteroid",
          "description": "A near-Earth asteroid discovered in 2008."
        }
      },
      {
        "name": "2000QK130",
        "semiMajorAxis": 1.18,
        "orbitalInclination": 4.7,
        "argumentOfPerigee": 66.3,
        "orbitalEccentricity": 0.262,
        "ascendingNode": 173.9,
        "meanAnomalyAtEpoch": 112,
        "siderealPeriod": 1.28,
        "card": {
          "title": "2000 QK130",
          "type": "Asteroid",
          "description": "An asteroid with a close approach to Earth in its orbit."
        }
      },
      {
        "name": "1999JU3",
        "semiMajorAxis": 1.19,
        "orbitalInclination": 5.9,
        "argumentOfPerigee": 211.4,
        "orbitalEccentricity": 0.19,
        "ascendingNode": 251.6,
        "meanAnomalyAtEpoch": 114.3,
        "siderealPeriod": 1.3,
        "card": {
          "title": "1999 JU3",
          "type": "Asteroid",
          "description": "Also known as Ryugu, a near-Earth asteroid visited by Japan's Hayabusa2 mission."
        }
      },
      {
        "name": "2011SR5",
        "semiMajorAxis": 1.18,
        "orbitalInclination": 29.1,
        "argumentOfPerigee": 305.5,
        "orbitalEccentricity": 0.706,
        "ascendingNode": 180.2,
        "meanAnomalyAtEpoch": 142.5,
        "siderealPeriod": 1.28,
        "card": {
          "title": "2011 SR5",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with a short observation arc."
        }
      },
      {
        "name": "1997XF11",
        "semiMajorAxis": 1.44,
        "orbitalInclination": 4.1,
        "argumentOfPerigee": 102.8,
        "orbitalEccentricity": 0.484,
        "ascendingNode": 213.8,
        "meanAnomalyAtEpoch": 24.3,
        "siderealPeriod": 1.73,
        "card": {
          "title": "1997 XF11",
          "type": "Asteroid",
          "description": "A large near-Earth asteroid known for its close approach predictions."
        }
      },
      {
        "name": "2007RU9",
        "semiMajorAxis": 1.92,
        "orbitalInclination": 5.7,
        "argumentOfPerigee": 285.9,
        "orbitalEccentricity": 0.63,
        "ascendingNode": 164.4,
        "meanAnomalyAtEpoch": 230.7,
        "siderealPeriod": 2.66,
        "card": {
          "title": "2007 RU9",
          "type": "Asteroid",
          "description": "A near-Earth object discovered in 2007."
        }
      },
      {
        "name": "Apophis",
        "semiMajorAxis": 0.92,
        "orbitalInclination": 3.3,
        "argumentOfPerigee": 126.4,
        "orbitalEccentricity": 0.191,
        "ascendingNode": 204.5,
        "meanAnomalyAtEpoch": 215.5,
        "siderealPeriod": 0.89,
        "card": {
          "title": "Apophis",
          "type": "Asteroid",
          "description": "A near-Earth asteroid that caused a stir due to its potential close approach to Earth in 2029."
        }
      },
      {
        "name": "2002NT7",
        "semiMajorAxis": 1.74,
        "orbitalInclination": 42.3,
        "argumentOfPerigee": 300.7,
        "orbitalEccentricity": 0.529,
        "ascendingNode": 132.1,
        "meanAnomalyAtEpoch": 94.5,
        "siderealPeriod": 2.29,
        "card": {
          "title": "2002 NT7",
          "type": "Asteroid",
          "description": "An asteroid that was briefly considered a potential impact risk."
        }
      },
      {
        "name": "2013ED28",
        "semiMajorAxis": 1.55,
        "orbitalInclination": 4.9,
        "argumentOfPerigee": 258.4,
        "orbitalEccentricity": 0.666,
        "ascendingNode": 153.1,
        "meanAnomalyAtEpoch": 354.5,
        "siderealPeriod": 1.93,
        "card": {
          "title": "2013 ED28",
          "type": "Asteroid",
          "description": "A near-Earth asteroid discovered in 2013."
        }
      },
      {
        "name": "1993VB",
        "semiMajorAxis": 1.91,
        "orbitalInclination": 5.1,
        "argumentOfPerigee": 323.1,
        "orbitalEccentricity": 0.519,
        "ascendingNode": 145.7,
        "meanAnomalyAtEpoch": 332.8,
        "siderealPeriod": 2.64,
        "card": {
          "title": "1993 VB",
          "type": "Asteroid",
          "description": "An asteroid with an orbit that intersects with Earth's path."
        }
      },
      {
        "name": "2002NY40",
        "semiMajorAxis": 2.05,
        "orbitalInclination": 5.9,
        "argumentOfPerigee": 269,
        "orbitalEccentricity": 0.709,
        "ascendingNode": 146.1,
        "meanAnomalyAtEpoch": 54.5,
        "siderealPeriod": 2.93,
        "card": {
          "title": "2002 NY40",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with a close approach in 2002."
        }
      },
      {
        "name": "2003CR20",
        "semiMajorAxis": 2.13,
        "orbitalInclination": 5,
        "argumentOfPerigee": 88.7,
        "orbitalEccentricity": 0.73,
        "ascendingNode": 177.2,
        "meanAnomalyAtEpoch": 264.4,
        "siderealPeriod": 3.1,
        "card": {
          "title": "2003 CR20",
          "type": "Asteroid",
          "description": "An asteroid classified as a near-Earth object."
        }
      },
      {
        "name": "2014PW59",
        "semiMajorAxis": 2.42,
        "orbitalInclination": 2.3,
        "argumentOfPerigee": 289.4,
        "orbitalEccentricity": 0.693,
        "ascendingNode": 301.2,
        "meanAnomalyAtEpoch": 46.6,
        "siderealPeriod": 3.77,
        "card": {
          "title": "2014 PW59",
          "type": "Asteroid",
          "description": "A near-Earth object discovered in 2014."
        }
      },
      {
        "name": "2012TO139",
        "semiMajorAxis": 2.44,
        "orbitalInclination": 5.4,
        "argumentOfPerigee": 56.2,
        "orbitalEccentricity": 0.889,
        "ascendingNode": 179.3,
        "meanAnomalyAtEpoch": 224.3,
        "siderealPeriod": 3.81,
        "card": {
          "title": "2012 TO139",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with an eccentric orbit."
        }
      },
      {
        "name": "1999JT6",
        "semiMajorAxis": 2.14,
        "orbitalInclination": 9.5,
        "argumentOfPerigee": 39.1,
        "orbitalEccentricity": 0.578,
        "ascendingNode": 78.9,
        "meanAnomalyAtEpoch": 41.2,
        "siderealPeriod": 3.12,
        "card": {
          "title": "1999 JT6",
          "type": "Asteroid",
          "description": "An asteroid with a known orbit that occasionally intersects Earth's path."
        }
      },
      {
        "name": "2005LW3",
        "semiMajorAxis": 1.43,
        "orbitalInclination": 6.1,
        "argumentOfPerigee": 288.1,
        "orbitalEccentricity": 0.462,
        "ascendingNode": 59.7,
        "meanAnomalyAtEpoch": 154.4,
        "siderealPeriod": 1.71,
        "card": {
          "title": "2005 LW3",
          "type": "Asteroid",
          "description": "A near-Earth asteroid discovered in 2005."
        }
      },
      {
        "name": "1997XR2",
        "semiMajorAxis": 1.08,
        "orbitalInclination": 7.2,
        "argumentOfPerigee": 84.6,
        "orbitalEccentricity": 0.201,
        "ascendingNode": 250.8,
        "meanAnomalyAtEpoch": 153.8,
        "siderealPeriod": 1.12,
        "card": {
          "title": "1997 XR2",
          "type": "Asteroid",
          "description": "An asteroid with a known orbit near Earth's path."
        }
      },
      {
        "name": "2011BT15",
        "semiMajorAxis": 1.29,
        "orbitalInclination": 1.7,
        "argumentOfPerigee": 308.3,
        "orbitalEccentricity": 0.303,
        "ascendingNode": 105.8,
        "meanAnomalyAtEpoch": 254.8,
        "siderealPeriod": 1.47,
        "card": {
          "title": "2011 BT15",
          "type": "Asteroid",
          "description": "A near-Earth asteroid identified in 2011."
        }
      },
      {
        "name": "2004VC17",
        "semiMajorAxis": 1.9,
        "orbitalInclination": 20.4,
        "argumentOfPerigee": 65.1,
        "orbitalEccentricity": 0.811,
        "ascendingNode": 229.3,
        "meanAnomalyAtEpoch": 327.8,
        "siderealPeriod": 2.61,
        "card": {
          "title": "2004 VC17",
          "type": "Asteroid",
          "description": "A near-Earth object with a close approach history."
        }
      },
      {
        "name": "2002EZ11",
        "semiMajorAxis": 1.11,
        "orbitalInclination": 2.4,
        "argumentOfPerigee": 317.7,
        "orbitalEccentricity": 0.802,
        "ascendingNode": 52,
        "meanAnomalyAtEpoch": 57.7,
        "siderealPeriod": 1.18,
        "card": {
          "title": "2002 EZ11",
          "type": "Asteroid",
          "description": "A near-Earth asteroid discovered in 2002."
        }
      },
      {
        "name": "1993KH",
        "semiMajorAxis": 1.23,
        "orbitalInclination": 12.8,
        "argumentOfPerigee": 293.8,
        "orbitalEccentricity": 0.311,
        "ascendingNode": 54.4,
        "meanAnomalyAtEpoch": 183.8,
        "siderealPeriod": 1.37,
        "card": {
          "title": "1993 KH",
          "type": "Asteroid",
          "description": "An asteroid known for its orbit around the Sun."
        }
      },
      {
        "name": "2000EH26",
        "semiMajorAxis": 1.85,
        "orbitalInclination": 0.4,
        "argumentOfPerigee": 19,
        "orbitalEccentricity": 0.478,
        "ascendingNode": 215.3,
        "meanAnomalyAtEpoch": 278.6,
        "siderealPeriod": 2.52,
        "card": {
          "title": "2000 EH26",
          "type": "Asteroid",
          "description": "A near-Earth object identified in 2000."
        }
      },
      {
        "name": "2000TU28",
        "semiMajorAxis": 1.07,
        "orbitalInclination": 15.6,
        "argumentOfPerigee": 280.8,
        "orbitalEccentricity": 0.183,
        "ascendingNode": 203,
        "meanAnomalyAtEpoch": 185.7,
        "siderealPeriod": 1.11,
        "card": {
          "title": "2000 TU28",
          "type": "Asteroid",
          "description": "An asteroid classified as a near-Earth object."
        }
      },
      {
        "name": "2010SC41",
        "semiMajorAxis": 1.86,
        "orbitalInclination": 0.2,
        "argumentOfPerigee": 266.3,
        "orbitalEccentricity": 0.608,
        "ascendingNode": 236.8,
        "meanAnomalyAtEpoch": 189.2,
        "siderealPeriod": 2.55,
        "card": {
          "title": "2010 SC41",
          "type": "Asteroid",
          "description": "A near-Earth asteroid discovered in 2010."
        }
      },
      {
        "name": "1998OX4",
        "semiMajorAxis": 1.58,
        "orbitalInclination": 4.5,
        "argumentOfPerigee": 117.1,
        "orbitalEccentricity": 0.486,
        "ascendingNode": 299.7,
        "meanAnomalyAtEpoch": 29.3,
        "siderealPeriod": 1.99,
        "card": {
          "title": "1998 OX4",
          "type": "Asteroid",
          "description": "An asteroid with an orbit near Earth's path."
        }
      },
      {
        "name": "2011DV",
        "semiMajorAxis": 0.96,
        "orbitalInclination": 10.6,
        "argumentOfPerigee": 350.7,
        "orbitalEccentricity": 0.05,
        "ascendingNode": 35.2,
        "meanAnomalyAtEpoch": 150.1,
        "siderealPeriod": 0.94,
        "card": {
          "title": "2011 DV",
          "type": "Asteroid",
          "description": "A near-Earth asteroid identified in 2011."
        }
      },
      {
        "name": "2010XC25",
        "semiMajorAxis": 1.74,
        "orbitalInclination": 3,
        "argumentOfPerigee": 237.1,
        "orbitalEccentricity": 0.528,
        "ascendingNode": 304.1,
        "meanAnomalyAtEpoch": 233,
        "siderealPeriod": 2.3,
        "card": {
          "title": "2010 XC25",
          "type": "Asteroid",
          "description": "A near-Earth object discovered in 2010."
        }
      },
      {
        "name": "2004TL10",
        "semiMajorAxis": 2.67,
        "orbitalInclination": 9.2,
        "argumentOfPerigee": 323.4,
        "orbitalEccentricity": 0.654,
        "ascendingNode": 11.5,
        "meanAnomalyAtEpoch": 129.7,
        "siderealPeriod": 4.35,
        "card": {
          "title": "2004 TL10",
          "type": "Asteroid",
          "description": "A near-Earth asteroid with an irregular orbit."
        }
      },
      {
        "name": "2011UW158",
        "semiMajorAxis": 1.62,
        "orbitalInclination": 4.6,
        "argumentOfPerigee": 8.6,
        "orbitalEccentricity": 0.375,
        "ascendingNode": 286.3,
        "meanAnomalyAtEpoch": 253.7,
        "siderealPeriod": 2.06,
        "card": {
          "title": "2011 UW158",
          "type": "Asteroid",
          "description": "A near-Earth asteroid known for its close approach to Earth."
        }
      }
    ],
    "dwarf_planets": [
      {
        "name": "Ceres",
        "semiMajorAxis": 2.7675,
        "orbitalInclination": 10.593,
        "argumentOfPerigee": 73.597,
        "orbitalEccentricity": 0.0758,
        "ascendingNode": 80.329,
        "meanAnomalyAtEpoch": 95.989,
        "siderealPeriod": 4.60,
        "card": {
          "title": "Ceres",
          "type": "Dwarf Planet",
          "description": "The largest object in the asteroid belt between Mars and Jupiter, classified as a dwarf planet."
        }
      },
      {
        "name": "Pluto",
        "semiMajorAxis": 39.482,
        "orbitalInclination": 17.16,
        "argumentOfPerigee": 113.834,
        "orbitalEccentricity": 0.2488,
        "ascendingNode": 110.299,
        "meanAnomalyAtEpoch": 14.53,
        "siderealPeriod": 248.00,
        "card": {
          "title": "Pluto",
          "type": "Dwarf Planet",
          "description": "Once considered the ninth planet, Pluto is a dwarf planet in the Kuiper Belt."
        }
      },
      {
        "name": "Eris",
        "semiMajorAxis": 67.781,
        "orbitalInclination": 44.04,
        "argumentOfPerigee": 151.39,
        "orbitalEccentricity": 0.44177,
        "ascendingNode": 35.95,
        "meanAnomalyAtEpoch": 204.17,
        "siderealPeriod": 557.00,
        "card": {
          "title": "Eris",
          "type": "Dwarf Planet",
          "description": "A large dwarf planet located in the scattered disc region beyond Neptune."
        }
      },
      {
        "name": "Makemake",
        "semiMajorAxis": 45.792,
        "orbitalInclination": 28.96,
        "argumentOfPerigee": 294.91,
        "orbitalEccentricity": 0.161,
        "ascendingNode": 79.71,
        "meanAnomalyAtEpoch": 165.5,
        "siderealPeriod": 305.34,
        "card": {
          "title": "Makemake",
          "type": "Dwarf Planet",
          "description": "A dwarf planet and one of the largest known objects in the Kuiper Belt."
        }
      },
      {
        "name": "Haumea",
        "semiMajorAxis": 43.218,
        "orbitalInclination": 28.22,
        "argumentOfPerigee": 240.21,
        "orbitalEccentricity": 0.19126,
        "ascendingNode": 121.91,
        "meanAnomalyAtEpoch": 205.26,
        "siderealPeriod": 283.28,
        "card": {
          "title": "Haumea",
          "type": "Dwarf Planet",
          "description": "A fast-rotating, ellipsoid-shaped dwarf planet in the Kuiper Belt."
        }
      }
    ]
  }
}


# Route to serve JSON data
@app.route('/trajectories', methods=['GET'])
def get_trajectories():
    return jsonify(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
