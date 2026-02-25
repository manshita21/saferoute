const axios = require("axios");

const fetchEnvironmentalContext = async (lat, lon) => {
    try {
        const query = `
      [out:json][timeout:10];
      (
        node["amenity"~"hospital|police|bus_station|restaurant|cafe|fast_food"](around:300,${lat},${lon});
        node["shop"](around:300,${lat},${lon});
      );
      out;
    `;

        const url = "https://overpass-api.de/api/interpreter";

        const response = await axios.post(url, query, {
            headers: { "Content-Type": "text/plain" },
            timeout: 8000, // ⬅️ VERY IMPORTANT
        });

        const elements = response.data.elements;

        return {
            poiCount: elements.length,
            hospitalNearby: elements.some(e => e.tags?.amenity === "hospital"),
            policeNearby: elements.some(e => e.tags?.amenity === "police"),
        };

    } catch (error) {
        console.log("Overpass failed, continuing without env data");

        return {
            poiCount: 0,
            hospitalNearby: false,
            policeNearby: false,
        };
    }
};

module.exports = fetchEnvironmentalContext;
