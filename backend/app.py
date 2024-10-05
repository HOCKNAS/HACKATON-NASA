from flask import Flask, jsonify

app = Flask(__name__)

# Your JSON data
data = {
  "bodies": [
    {
      "name": "Venus",
      "semiMajorAxis": 0.72333199,
      "orbitalInclination": 3.39471,
      "argumentOfPerigee": 54.9,
      "orbitalEccentricity": 0.00677323,
      "ascendingNode": 76.7,
      "meanAnomalyAtEpoch": 181.98,
      "siderealPeriod": 0.615
    },
    {
      "name": "Earth",
      "semiMajorAxis": 1,
      "orbitalInclination": 0.00005,
      "argumentOfPerigee": 102.94719,
      "orbitalEccentricity": 0.01671022,
      "ascendingNode": 0,
      "meanAnomalyAtEpoch": 100.47,
      "siderealPeriod": 1
    },
    {
      "name": "Mars",
      "semiMajorAxis": 1.52366231,
      "orbitalInclination": 1.85061,
      "argumentOfPerigee": 286.5,
      "orbitalEccentricity": 0.09339,
      "ascendingNode": 49.57854,
      "meanAnomalyAtEpoch": 355.43,
      "siderealPeriod": 1.881
    },
    {
      "name": "2004TN1",
      "semiMajorAxis": 2.74,
      "orbitalInclination": 8.4,
      "argumentOfPerigee": 233.5,
      "orbitalEccentricity": 0.698,
      "ascendingNode": 214.0,
      "meanAnomalyAtEpoch": 66.6,
      "siderealPeriod": 4.55
    },
    {
      "name": "2011SM68",
      "semiMajorAxis": 1.40,
      "orbitalInclination": 19.2,
      "argumentOfPerigee": 109.1,
      "orbitalEccentricity": 0.664,
      "ascendingNode": 24.2,
      "meanAnomalyAtEpoch": 292.6,
      "siderealPeriod": 1.65
    },
    {
      "name": "2014EG45",
      "semiMajorAxis": 1.61,
      "orbitalInclination": 25.5,
      "argumentOfPerigee": 296.2,
      "orbitalEccentricity": 0.498,
      "ascendingNode": 164.3,
      "meanAnomalyAtEpoch": 156.4,
      "siderealPeriod": 2.04
    },
    {
      "name": "2003EE16",
      "semiMajorAxis": 1.42,
      "orbitalInclination": 0.6,
      "argumentOfPerigee": 259.7,
      "orbitalEccentricity": 0.614,
      "ascendingNode": 127.0,
      "meanAnomalyAtEpoch": 62.7,
      "siderealPeriod": 1.69
    },
    {
      "name": "2012TY52",
      "semiMajorAxis": 1.66,
      "orbitalInclination": 9.6,
      "argumentOfPerigee": 252.6,
      "orbitalEccentricity": 0.553,
      "ascendingNode": 221.8,
      "meanAnomalyAtEpoch": 323.4,
      "siderealPeriod": 2.15
    },
    {
      "name": "2009WM1",
      "semiMajorAxis": 1.18,
      "orbitalInclination": 25.8,
      "argumentOfPerigee": 162.6,
      "orbitalEccentricity": 0.169,
      "ascendingNode": 240.3,
      "meanAnomalyAtEpoch": 355.3,
      "siderealPeriod": 1.28
    },
    {
      "name": "2006SU49",
      "semiMajorAxis": 1.41,
      "orbitalInclination": 2.5,
      "argumentOfPerigee": 199.0,
      "orbitalEccentricity": 0.312,
      "ascendingNode": 303.2,
      "meanAnomalyAtEpoch": 200.2,
      "siderealPeriod": 1.85
    },
    {
      "name": "1998SC15",
      "semiMajorAxis": 1.27,
      "orbitalInclination": 16.1,
      "argumentOfPerigee": 277.4,
      "orbitalEccentricity": 0.415,
      "ascendingNode": 198.8,
      "meanAnomalyAtEpoch": 27.0,
      "siderealPeriod": 1.80
    },
    {
      "name": "2010MU112",
      "semiMajorAxis": 1.76,
      "orbitalInclination": 48.0,
      "argumentOfPerigee": 119.2,
      "orbitalEccentricity": 0.540,
      "ascendingNode": 261.2,
      "meanAnomalyAtEpoch": 300.5,
      "siderealPeriod": 2.71
    },
    {
      "name": "2011AG5",
      "semiMajorAxis": 1.43,
      "orbitalInclination": 3.7,
      "argumentOfPerigee": 53.5,
      "orbitalEccentricity": 0.390,
      "ascendingNode": 135.7,
      "meanAnomalyAtEpoch": 60.8,
      "siderealPeriod": 1.99
    },
    {
      "name": "1994PC1",
      "semiMajorAxis": 1.35,
      "orbitalInclination": 33.5,
      "argumentOfPerigee": 47.6,
      "orbitalEccentricity": 0.328,
      "ascendingNode": 117.9,
      "meanAnomalyAtEpoch": 136.5,
      "siderealPeriod": 1.56
    },
    {
      "name": "2012SW20",
      "semiMajorAxis": 2.46,
      "orbitalInclination": 10.2,
      "argumentOfPerigee": 62.1,
      "orbitalEccentricity": 0.680,
      "ascendingNode": 209.8,
      "meanAnomalyAtEpoch": 224.3,
      "siderealPeriod": 3.86
    },
    {
      "name": "2007PV27",
      "semiMajorAxis": 1.27,
      "orbitalInclination": 24.6,
      "argumentOfPerigee": 107.6,
      "orbitalEccentricity": 0.371,
      "ascendingNode": 324.5,
      "meanAnomalyAtEpoch": 324.1,
      "siderealPeriod": 1.44
    },
    {
      "name": "2007TU24",
      "semiMajorAxis": 2.04,
      "orbitalInclination": 5.6,
      "argumentOfPerigee": 334.2,
      "orbitalEccentricity": 0.534,
      "ascendingNode": 127,
      "meanAnomalyAtEpoch": 132.9,
      "siderealPeriod": 2.92
    },
    {
      "name": "2004XP14",
      "semiMajorAxis": 1.05,
      "orbitalInclination": 33,
      "argumentOfPerigee": 273.7,
      "orbitalEccentricity": 0.158,
      "ascendingNode": 281,
      "meanAnomalyAtEpoch": 4.5,
      "siderealPeriod": 1.08
    },
    {
      "name": "2009KK",
      "semiMajorAxis": 1.5,
      "orbitalInclination": 18.2,
      "argumentOfPerigee": 247.3,
      "orbitalEccentricity": 0.455,
      "ascendingNode": 68.2,
      "meanAnomalyAtEpoch": 328.3,
      "siderealPeriod": 1.84
    },
    {
      "name": "2007JY2",
      "semiMajorAxis": 2.2,
      "orbitalInclination": 1.6,
      "argumentOfPerigee": 105.3,
      "orbitalEccentricity": 0.687,
      "ascendingNode": 225.6,
      "meanAnomalyAtEpoch": 95.3,
      "siderealPeriod": 3.26
    },
    {
      "name": "2002CU11",
      "semiMajorAxis": 1.22,
      "orbitalInclination": 48.8,
      "argumentOfPerigee": 110.5,
      "orbitalEccentricity": 0.295,
      "ascendingNode": 157.8,
      "meanAnomalyAtEpoch": 114.9,
      "siderealPeriod": 1.35
    },
    {
      "name": "2000EK26",
      "semiMajorAxis": 2.41,
      "orbitalInclination": 15.6,
      "argumentOfPerigee": 305.5,
      "orbitalEccentricity": 0.659,
      "ascendingNode": 126.5,
      "meanAnomalyAtEpoch": 10.8,
      "siderealPeriod": 3.73
    },
    {
      "name": "2001VK5",
      "semiMajorAxis": 1.27,
      "orbitalInclination": 19.4,
      "argumentOfPerigee": 263.9,
      "orbitalEccentricity": 0.514,
      "ascendingNode": 54.3,
      "meanAnomalyAtEpoch": 102.9,
      "siderealPeriod": 1.43
    },
    {
      "name": "2005YU55",
      "semiMajorAxis": 1.16,
      "orbitalInclination": 0.3,
      "argumentOfPerigee": 273.6,
      "orbitalEccentricity": 0.431,
      "ascendingNode": 35.9,
      "meanAnomalyAtEpoch": 218.6,
      "siderealPeriod": 1.25
    },
    {
      "name": "2008DJ",
      "semiMajorAxis": 1.98,
      "orbitalInclination": 5.1,
      "argumentOfPerigee": 117.8,
      "orbitalEccentricity": 0.603,
      "ascendingNode": 319.2,
      "meanAnomalyAtEpoch": 173.9,
      "siderealPeriod": 2.79
    },
    {
      "name": "2000QK130",
      "semiMajorAxis": 1.18,
      "orbitalInclination": 4.7,
      "argumentOfPerigee": 66.3,
      "orbitalEccentricity": 0.262,
      "ascendingNode": 173.9,
      "meanAnomalyAtEpoch": 112,
      "siderealPeriod": 1.28
    },
    {
      "name": "1999JU3",
      "semiMajorAxis": 1.19,
      "orbitalInclination": 5.9,
      "argumentOfPerigee": 211.4,
      "orbitalEccentricity": 0.19,
      "ascendingNode": 251.6,
      "meanAnomalyAtEpoch": 114.3,
      "siderealPeriod": 1.3
    },
    {
      "name": "2011SR5",
      "semiMajorAxis": 1.18,
      "orbitalInclination": 29.1,
      "argumentOfPerigee": 305.5,
      "orbitalEccentricity": 0.706,
      "ascendingNode": 180.2,
      "meanAnomalyAtEpoch": 142.5,
      "siderealPeriod": 1.28
    },
    {
      "name": "1997XF11",
      "semiMajorAxis": 1.44,
      "orbitalInclination": 4.1,
      "argumentOfPerigee": 102.8,
      "orbitalEccentricity": 0.484,
      "ascendingNode": 213.8,
      "meanAnomalyAtEpoch": 24.3,
      "siderealPeriod": 1.73
    },
    {
      "name": "2007RU9",
      "semiMajorAxis": 1.92,
      "orbitalInclination": 5.7,
      "argumentOfPerigee": 285.9,
      "orbitalEccentricity": 0.63,
      "ascendingNode": 164.4,
      "meanAnomalyAtEpoch": 230.7,
      "siderealPeriod": 2.66
    },
    {
      "name": "Apophis",
      "semiMajorAxis": 0.92,
      "orbitalInclination": 3.3,
      "argumentOfPerigee": 126.4,
      "orbitalEccentricity": 0.191,
      "ascendingNode": 204.5,
      "meanAnomalyAtEpoch": 215.5,
      "siderealPeriod": 0.89
    },
    {
      "name": "2002NT7",
      "semiMajorAxis": 1.74,
      "orbitalInclination": 42.3,
      "argumentOfPerigee": 300.7,
      "orbitalEccentricity": 0.529,
      "ascendingNode": 132.1,
      "meanAnomalyAtEpoch": 94.5,
      "siderealPeriod": 2.29
    },
    {
      "name": "2013ED28",
      "semiMajorAxis": 1.55,
      "orbitalInclination": 4.9,
      "argumentOfPerigee": 258.4,
      "orbitalEccentricity": 0.666,
      "ascendingNode": 153.1,
      "meanAnomalyAtEpoch": 354.5,
      "siderealPeriod": 1.93
    },
    {
      "name": "1993VB",
      "semiMajorAxis": 1.91,
      "orbitalInclination": 5.1,
      "argumentOfPerigee": 323.1,
      "orbitalEccentricity": 0.519,
      "ascendingNode": 145.7,
      "meanAnomalyAtEpoch": 332.8,
      "siderealPeriod": 2.64
    },
    {
      "name": "2002NY40",
      "semiMajorAxis": 2.05,
      "orbitalInclination": 5.9,
      "argumentOfPerigee": 269,
      "orbitalEccentricity": 0.709,
      "ascendingNode": 146.1,
      "meanAnomalyAtEpoch": 54.5,
      "siderealPeriod": 2.93
    },
    {
      "name": "2003CR20",
      "semiMajorAxis": 2.13,
      "orbitalInclination": 5,
      "argumentOfPerigee": 88.7,
      "orbitalEccentricity": 0.73,
      "ascendingNode": 177.2,
      "meanAnomalyAtEpoch": 264.4,
      "siderealPeriod": 3.1
    },
    {
      "name": "2014PW59",
      "semiMajorAxis": 2.42,
      "orbitalInclination": 2.3,
      "argumentOfPerigee": 289.4,
      "orbitalEccentricity": 0.693,
      "ascendingNode": 301.2,
      "meanAnomalyAtEpoch": 46.6,
      "siderealPeriod": 3.77
    },
    {
      "name": "2012TO139",
      "semiMajorAxis": 2.44,
      "orbitalInclination": 5.4,
      "argumentOfPerigee": 56.2,
      "orbitalEccentricity": 0.889,
      "ascendingNode": 179.3,
      "meanAnomalyAtEpoch": 224.3,
      "siderealPeriod": 3.81
    },
    {
      "name": "1999JT6",
      "semiMajorAxis": 2.14,
      "orbitalInclination": 9.5,
      "argumentOfPerigee": 39.1,
      "orbitalEccentricity": 0.578,
      "ascendingNode": 78.9,
      "meanAnomalyAtEpoch": 41.2,
      "siderealPeriod": 3.12
    },
    {
      "name": "2005LW3",
      "semiMajorAxis": 1.43,
      "orbitalInclination": 6.1,
      "argumentOfPerigee": 288.1,
      "orbitalEccentricity": 0.462,
      "ascendingNode": 59.7,
      "meanAnomalyAtEpoch": 154.4,
      "siderealPeriod": 1.71
    },
    {
      "name": "1997XR2",
      "semiMajorAxis": 1.08,
      "orbitalInclination": 7.2,
      "argumentOfPerigee": 84.6,
      "orbitalEccentricity": 0.201,
      "ascendingNode": 250.8,
      "meanAnomalyAtEpoch": 153.8,
      "siderealPeriod": 1.12
    },
    {
      "name": "2011BT15",
      "semiMajorAxis": 1.29,
      "orbitalInclination": 1.7,
      "argumentOfPerigee": 308.3,
      "orbitalEccentricity": 0.303,
      "ascendingNode": 105.8,
      "meanAnomalyAtEpoch": 254.8,
      "siderealPeriod": 1.47
    },
    {
      "name": "2004VC17",
      "semiMajorAxis": 1.9,
      "orbitalInclination": 20.4,
      "argumentOfPerigee": 65.1,
      "orbitalEccentricity": 0.811,
      "ascendingNode": 229.3,
      "meanAnomalyAtEpoch": 327.8,
      "siderealPeriod": 2.61
    },
    {
      "name": "2002EZ11",
      "semiMajorAxis": 1.11,
      "orbitalInclination": 2.4,
      "argumentOfPerigee": 317.7,
      "orbitalEccentricity": 0.802,
      "ascendingNode": 52,
      "meanAnomalyAtEpoch": 57.7,
      "siderealPeriod": 1.18
    },
    {
      "name": "1993KH",
      "semiMajorAxis": 1.23,
      "orbitalInclination": 12.8,
      "argumentOfPerigee": 293.8,
      "orbitalEccentricity": 0.311,
      "ascendingNode": 54.4,
      "meanAnomalyAtEpoch": 183.8,
      "siderealPeriod": 1.37
    },
    {
      "name": "2000EH26",
      "semiMajorAxis": 1.85,
      "orbitalInclination": 0.4,
      "argumentOfPerigee": 19,
      "orbitalEccentricity": 0.478,
      "ascendingNode": 215.3,
      "meanAnomalyAtEpoch": 278.6,
      "siderealPeriod": 2.52
    },
    {
      "name": "2000TU28",
      "semiMajorAxis": 1.07,
      "orbitalInclination": 15.6,
      "argumentOfPerigee": 280.8,
      "orbitalEccentricity": 0.183,
      "ascendingNode": 203,
      "meanAnomalyAtEpoch": 185.7,
      "siderealPeriod": 1.11
    },
    {
      "name": "2010SC41",
      "semiMajorAxis": 1.86,
      "orbitalInclination": 0.2,
      "argumentOfPerigee": 266.3,
      "orbitalEccentricity": 0.608,
      "ascendingNode": 236.8,
      "meanAnomalyAtEpoch": 189.2,
      "siderealPeriod": 2.55
    },
    {
      "name": "1998OX4",
      "semiMajorAxis": 1.58,
      "orbitalInclination": 4.5,
      "argumentOfPerigee": 117.1,
      "orbitalEccentricity": 0.486,
      "ascendingNode": 299.7,
      "meanAnomalyAtEpoch": 29.3,
      "siderealPeriod": 1.99
    },
    {
      "name": "2011DV",
      "semiMajorAxis": 0.96,
      "orbitalInclination": 10.6,
      "argumentOfPerigee": 350.7,
      "orbitalEccentricity": 0.05,
      "ascendingNode": 35.2,
      "meanAnomalyAtEpoch": 150.1,
      "siderealPeriod": 0.94
    },
    {
      "name": "2010XC25",
      "semiMajorAxis": 1.74,
      "orbitalInclination": 3,
      "argumentOfPerigee": 237.1,
      "orbitalEccentricity": 0.528,
      "ascendingNode": 304.1,
      "meanAnomalyAtEpoch": 233,
      "siderealPeriod": 2.3
    },
    {
      "name": "2004TL10",
      "semiMajorAxis": 2.67,
      "orbitalInclination": 9.2,
      "argumentOfPerigee": 323.4,
      "orbitalEccentricity": 0.654,
      "ascendingNode": 11.5,
      "meanAnomalyAtEpoch": 129.7,
      "siderealPeriod": 4.35
    },
    {
      "name": "2011UW158",
      "semiMajorAxis": 1.62,
      "orbitalInclination": 4.6,
      "argumentOfPerigee": 8.6,
      "orbitalEccentricity": 0.375,
      "ascendingNode": 286.3,
      "meanAnomalyAtEpoch": 253.7,
      "siderealPeriod": 2.06
    }
  ]
}

# Route to serve JSON data
@app.route('/trajectories', methods=['GET'])
def get_trajectories():
    return jsonify(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
