import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState } from "react";
import worldMapData from "./world-110m.json"; // Ensure this file exists
import { scaleLinear } from "d3-scale";

// Updated Buyer Data (Ensuring Country Names Match)
const buyersData = {
  "United States of America": 5000,
  India: 7000,
  Germany: 4000,
  Brazil: 3500,
  Australia: 2000,
  "United Kingdom": 4500,
  Canada: 3800,
  France: 4200,
  China: 6000,
  Japan: 4800,
  "South Africa": 2500, // Fixing the name to match the dataset
  Russia: 3800,
  Mexico: 3600,
  Argentina: 2900,
  Italy: 4100,
  Spain: 4000,
};

// Color scale based on sales volume
const colorScale = scaleLinear()
  .domain([2000, 7000]) // Adjusted for min/max sales range
  .range(["#93c5fd", "#1e40af"]); // Light blue → Dark blue

export default function BuyersDensityMap() {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="relative">
      <h2 className="text-lg font-semibold mb-4">Buyers' Density Map</h2>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140 }}
        className="w-full h-[400px]"
      >
        <Geographies geography={worldMapData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const sales = buyersData[countryName] || 0;
              const fillColor = sales ? colorScale(sales) : "#D1D5DB"; // Default gray if no sales

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() =>
                    setTooltipContent(
                      sales
                        ? `${countryName}: ${sales} Buyers`
                        : `${countryName}: No Data`
                    )
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
