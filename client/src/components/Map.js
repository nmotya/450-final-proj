import React, { memo, useState, useEffect } from "react";
import { getAssistanceAreaofworkStateHighest } from '../fetch_functions/Map';
import { scaleQuantile } from "d3-scale";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

//getAssistanceAreaofworkStateHighest





const Map = ({ setTooltipContent }) => {
  const [stateArray, setStateArray] = useState();
  //const [colorScale, setColorScale] = useState();
  

  useEffect(() => {
    getAssistanceAreaofworkStateHighest(2019).then((response) => {
      setStateArray(response);
    });
  }, []);


  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 800 }} projection="geoAlbersUsa">
          {stateArray ?
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const colorScale = scaleQuantile()
                  .domain(stateArray.map(s => s.sum))
                  .range([
                    "#ffedea",
                    "#ffcec5",
                    "#ffad9f",
                    "#ff8a75",
                    "#ff5533",
                    "#e2492d",
                    "#be3d26",
                    "#9a311f",
                    "#782618"
                ]);
                const cur = stateArray.find(s => s.recipient_state_name === geo.properties.name.toUpperCase());
                return(
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={cur ? colorScale(cur.sum) : "#EEE"}
                    onMouseEnter={() => {
                      if (stateArray) {
                        const name = geo.properties.name;
                        setTooltipContent(`
                          <div style="text-align: center">${name}</div>
                          <div style="text-align: center">${cur.cfda_title}</div> 
                          <div style="text-align: center">$${cur.sum}</div>
                        `);
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: {
                        fill: "#3238a8",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#3238a8",
                        outline: "none"
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
          : null
          }
      </ComposableMap>
    </>
  );
};

export default memo(Map);
