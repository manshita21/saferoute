// This file will handle Overpass API queries for POIs
const axios = require("axios");

const fetchEnvironmentalContext = async (lat, lon) => {
    const query = `
    [out:json];
    (
      node["amenity"~"hospital|police|bus_station|restaurant|cafe|fast_food"](around:500,${lat},${lon});
      node["shop"](around:500,${lat},${lon});
    );
    out;
  `;

    const url = "https://overpass-api.de/api/interpreter";

    const response = await axios.post(url, query, {
        headers: { "Content-Type": "text/plain" },
    });

    const elements = response.data.elements;

    return {
        poiCount: elements.length,
        hospitalNearby: elements.some(e => e.tags?.amenity === "hospital"),
        policeNearby: elements.some(e => e.tags?.amenity === "police"),
    };
};

//module.exports = fetchEnvironmentalContext;
module.exports = { fetchEnvironmentalContext };
