import React, { memo, useState, useEffect, useDebugValue } from "react";
import { 
  getAssistanceAreaofworkStateHighest, 
  getContractOrganizationStateHighest,
  getAssistanceAreaofworkStateExists,
  getAssistanceTotalAmountSpentState,
  getContractsTotalAmountSpentState
} from '../helper_functions/Map';
import { state_dict } from '../helper_functions/state_dict';
import Navbar from './Navbar'
import { scaleQuantile } from "d3-scale";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import '../style/Map.css';
import Dropdown from 'react-bootstrap/Dropdown';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const Map = ({ setTooltipContent }) => {
  const [stateArray, setStateArray] = useState();  
  const [dataset, setDataset] = useState('Contracts');

  useEffect(() => {
    getContractsTotalAmountSpentState(2019, 2020).then((response) => {
      var output = response;
      for (var i = 0; i < response.length; i++) {
       output[i].state = state_dict[response[i].state.replace(/(\r)/gm, "")] || "";
      }
      console.log(output);
      setStateArray(output);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div id="mapWrapper">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose a dataset
          </Dropdown.Toggle>
          <Dropdown.Menu>
            { 
              dataset === 'Contracts' ?
              <>
                <Dropdown.Item as="Button" active onClick={() => { setDataset('Contracts') }}>Contracts</Dropdown.Item>
                <Dropdown.Item as="Button" onClick={() => { setDataset('Assistance') }}>Financial Assistance</Dropdown.Item>
              </>
              :
              <>
                <Dropdown.Item as="Button" onClick={() => { setDataset('Contracts') }}>Contracts</Dropdown.Item>
                <Dropdown.Item as="Button" onClick={() => { setDataset('Assistance') }} active>Financial Assistance</Dropdown.Item>
              </>
            }
          </Dropdown.Menu>
        </Dropdown>
        { 
          dataset === 'Contracts' ?
          <>
          </>
          :
          <>
          </>
        }
        <ComposableMap data-tip="" projectionConfig={{ scale: 1000 }} projection="geoAlbersUsa" id="mapDiv">
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
                  const cur = stateArray.find(s => s.state.toUpperCase() === geo.properties.name.toUpperCase());
                  return(
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={cur ? colorScale(cur.sum) : "#EEE"}
                      onMouseEnter={() => {
                        if (stateArray) {
                          const name = geo.properties.name;
                          if (cur.cfda_title) {
                            setTooltipContent(`
                              <div style="text-align: center">${name}</div>
                              <div style="text-align: center">${cur.cfda_title}</div> 
                              <div style="text-align: center">$${cur.sum.toLocaleString()}</div>
                            `);
                          } else {
                            setTooltipContent(`
                              <div style="text-align: center">${name}</div>
                              <div style="text-align: center">$${cur.sum.toLocaleString()}</div>
                            `);
                          }
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
        {
          !stateArray ?
          <div id="loading" />
          :null
        }
      </div>
    </>
  );
};

export default memo(Map);
