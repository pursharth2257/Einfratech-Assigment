import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import API from "../../api/axios"; // Import Axios instance
import worldMapData from "../../assets/world-110m.json";
import React from "react";

const colorScale = scaleLinear().domain([2000, 7000]).range(["#93c5fd", "#1e40af"]);

export default function BuyersDensityMap() {
  const [buyersData, setBuyersData] = useState({});
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    const fetchBuyersData = async () => {
      try {
        const response = await API.get("/buyer-density/summary"); // Fetch from API
        console.log("API Response:", response.data);

        // Convert API response to object format { countryName: totalBuyers }
        const formattedData = response.data.reduce((acc, item) => {
          acc[item._id] = item.totalBuyers;
          return acc;
        }, {});

        setBuyersData(formattedData);
      } catch (error) {
        console.error("Error fetching buyer density data:", error);
      }
    };

    fetchBuyersData();
  }, []);

  return (
    <div className="relative">
      <h2 className="text-lg font-semibold mb-4">Buyers' Density Map</h2>

      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }} className="w-full h-[600px]">
        <Geographies geography={worldMapData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const sales = buyersData[countryName] || 0;
              const fillColor = sales ? colorScale(sales) : "#D1D5DB";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() =>
                    setTooltipContent(sales ? `${countryName}: ${sales} Buyers` : `${countryName}: No Data`)
                  }
                  onMouseLeave={() => setTooltipContent("")}
                  style={{
                    default: { fill: fillColor, stroke: "#374151", strokeWidth: 0.5 },
                    hover: { fill: "#facc15", stroke: "#1E3A8A", strokeWidth: 1 },
                    pressed: { fill: "#1E40AF" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltipContent && (
        <div className="absolute top-2 right-4 bg-gray-800 text-white px-3 py-1 rounded-md text-sm shadow-md">
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
