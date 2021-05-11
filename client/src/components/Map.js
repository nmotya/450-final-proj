import React, { memo, useState } from "react";
import { 
  getAssistanceAreaofworkStateHighest, 
  getContractOrganizationStateHighest,
  getAssistanceAreaofworkStateExists,
  getAssistanceTotalAmountSpentState,
  getContractsTotalAmountSpentState,
  getContractStateAgencyMax
} from '../helper_functions/Map';
import { state_dict } from '../helper_functions/state_dict';
import Navbar from './Navbar'
import { scaleQuantile } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import '../style/Map.css';
import { DropdownButton, Tab, Tabs, Dropdown, Row, Col, Button } from 'react-bootstrap';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const Map = ({ setTooltipContent }) => {
  const [isLoading, setIsLoading] = useState(false);  
  const [stateArray, setStateArray] = useState();  
  const [dataset, setDataset] = useState('Contracts');
  // Set default values for form dropdowns
  const [query1year1, setQuery1year1] = useState(2018);
  const [query1year2, setQuery1year2] = useState(2021);
  const [query2year, setQuery2year] = useState(2018);
  const [query3year, setQuery3year] = useState(2018);
  const [query4year1, setQuery4year1] = useState(2018);
  const [query4year2, setQuery4year2] = useState(2021);
  const [query5year, setQuery5year] = useState(2018);
  const [query6year, setQuery6year] = useState(2018);
  const [query6aow, setQuery6aow] = useState("AGRICULTURAL RESEARCH BASIC AND APPLIED RESEARCH");

  // Handles queries for the contract database
  function contractQuery(func) {
    setStateArray(null);
    setIsLoading(true);
    func.then((response) => {
      var output = response;
      for (var i = 0; i < response.length; i++) {
       output[i].state = state_dict[response[i].state.replace(/(\r)/gm, "")] || "";
      }
      setIsLoading(false);
      setStateArray(output);
    });
  }

  // Handles queries for the assistance database
  function assistanceQuery(func) {
    setStateArray(null);
    setIsLoading(true);
    func.then((response) => {
      var output = response;
      setIsLoading(false);
      setStateArray(output);
    });
  }

  return (
    <>
      <Navbar />
      <div id="mapWrapper">
        <>
          <Tabs defaultActiveKey="contracts" 
            style={{marginTop: "1rem", marginLeft: "1rem"}} id="controlled-tab-example" 
            onClick={(k) => setDataset(k.target.innerHTML)}
          >
            <Tab eventKey="contracts"  title="Contracts" /> 
            <Tab eventKey="Financial Assistance" title="Financial Assistance"/>
          </Tabs>
          <div id="mapQueryWrapper" className="d-flex justify-content-center">
            { 
              dataset === 'Contracts' ?
              // render either the contracts menu or the assistance menu
              <>
                <h3>Query Option 1:</h3>
                <div className="line-break" />
                <p className="queryDescription">The amount of total contract spending received per state over a given year range</p>
                <div className="line-break" />
                <Row>
                  <Col>
                    <DropdownButton onSelect={(e) => setQuery1year1(e)} title={query1year1}>
                      <Dropdown.Item eventKey= "2018">2018</Dropdown.Item>
                      <Dropdown.Item eventKey= "2019">2019</Dropdown.Item>
                      <Dropdown.Item eventKey= "2020">2020</Dropdown.Item>
                      <Dropdown.Item eventKey= "2021">2021</Dropdown.Item>
                    </DropdownButton> 
                  </Col>
                  <Col lg={5} style={{marginRight: "-8%"}}>
                    <DropdownButton onSelect={(e) => setQuery1year2(e)} title={query1year2}>
                      <Dropdown.Item eventKey= "2018">2018</Dropdown.Item>
                      <Dropdown.Item eventKey= "2019">2019</Dropdown.Item>
                      <Dropdown.Item eventKey= "2020">2020</Dropdown.Item>
                      <Dropdown.Item eventKey= "2021">2021</Dropdown.Item>
                    </DropdownButton> 
                  </Col>
                </Row>
                <div className="line-break" />
                <Button 
                  variant="primary" 
                  style={{marginTop: "1rem"}} 
                  onClick={() => {
                    const first = Math.min(query1year1, query1year2);
                    const second = Math.max(query1year1, query1year2);
                    contractQuery(getContractsTotalAmountSpentState(first, second));
                  }}
                >
                  Submit
                </Button>
                <div className="line-break" />
                <div className="borderDiv" />

                <h3>Query Option 2:</h3>
                <div className="line-break" />
                <p className="queryDescription">The organization that received the most contract spending in each state for a given year</p>
                <div className="line-break" />
                <DropdownButton onSelect={(e) => setQuery2year(e)} title={query2year}>
                  <Dropdown.Item eventKey= "2018">2018</Dropdown.Item>
                  <Dropdown.Item eventKey= "2019">2019</Dropdown.Item>
                  <Dropdown.Item eventKey= "2020">2020</Dropdown.Item>
                  <Dropdown.Item eventKey= "2021">2021</Dropdown.Item>
                </DropdownButton> 
                <div className="line-break" />
                <Button 
                  variant="primary" 
                  style={{marginTop: "1rem"}} 
                  onClick={() => {
                    contractQuery(getContractOrganizationStateHighest(query2year));
                  }}
                >
                  Submit
                </Button>
                <div className="line-break" />
                <div className="borderDiv" />

                <h3>Query Option 3:</h3>
                <div className="line-break" />
                <p className="queryDescription">The department that awards the most money for each state in a given year</p>
                <div className="line-break" />
                <DropdownButton onSelect={(e) => setQuery3year(e)} title={query3year}>
                  <Dropdown.Item eventKey= "2018">2018</Dropdown.Item>
                  <Dropdown.Item eventKey= "2019">2019</Dropdown.Item>
                  <Dropdown.Item eventKey= "2020">2020</Dropdown.Item>
                  <Dropdown.Item eventKey= "2021">2021</Dropdown.Item>
                </DropdownButton> 
                <div className="line-break" />
                <Button 
                  variant="primary" 
                  style={{marginTop: "1rem"}} 
                  onClick={() => {
                    contractQuery(getContractStateAgencyMax(query3year));
                  }}
                >
                  Submit
                </Button>
              </>
              : 
              <>
                <h3>Query Option 1:</h3>
                <div className="line-break" />
                <p className="queryDescription">The amount of total financial assistance spending received per state over a given year range</p>
                <div className="line-break" />
                <Row>
                  <Col>
                    <DropdownButton onSelect={(e) => setQuery4year1(e)} title={query4year1}>
                      <Dropdown.Item eventKey= "2018">2018</Dropdown.Item>
                      <Dropdown.Item eventKey= "2019">2019</Dropdown.Item>
                      <Dropdown.Item eventKey= "2020">2020</Dropdown.Item>
                      <Dropdown.Item eventKey= "2021">2021</Dropdown.Item>
                    </DropdownButton> 
                  </Col>
                  <Col lg={5} style={{marginRight: "-8%"}}>
                    <DropdownButton onSelect={(e) => setQuery4year2(e)} title={query4year2}>
                      <Dropdown.Item eventKey= "2018">2018</Dropdown.Item>
                      <Dropdown.Item eventKey= "2019">2019</Dropdown.Item>
                      <Dropdown.Item eventKey= "2020">2020</Dropdown.Item>
                      <Dropdown.Item eventKey= "2021">2021</Dropdown.Item>
                    </DropdownButton> 
                  </Col>
                </Row>
                <div className="line-break" />
                <Button 
                  variant="primary" 
                  style={{marginTop: "1rem"}} 
                  onClick={() => {
                    const first = Math.min(query4year1, query4year2);
                    const second = Math.max(query4year1, query4year2);
                    assistanceQuery(getAssistanceTotalAmountSpentState(first, second));
                  }}
                >
                  Submit
                </Button>
                <div className="line-break" />
                <div className="borderDiv" />
              
                <h3>Query Option 2:</h3>
                <div className="line-break" />
                <p className="queryDescription">The area of work that received the most financial assistance spending in each state for a given year</p>
                <div className="line-break" />
                <DropdownButton onSelect={(e) => setQuery5year(e)} title={query5year}>
                  <Dropdown.Item eventKey= "2018">2018</Dropdown.Item>
                  <Dropdown.Item eventKey= "2019">2019</Dropdown.Item>
                  <Dropdown.Item eventKey= "2020">2020</Dropdown.Item>
                  <Dropdown.Item eventKey= "2021">2021</Dropdown.Item>
                </DropdownButton> 
                <div className="line-break" />
                <Button 
                  variant="primary" 
                  style={{marginTop: "1rem"}} 
                  onClick={() => {
                    assistanceQuery(getAssistanceAreaofworkStateHighest(query5year));
                  }}
                >
                  Submit
                </Button>
                <div className="line-break" />
                <div className="borderDiv" />

                <h3>Query Option 3:</h3>
                <div className="line-break" />
                <p className="queryDescription">The states that received finanical assistance spending money for a given area of work for a given year.</p>
                <div className="line-break" />
                <Row>
                  <Col>
                    <DropdownButton onSelect={(e) => setQuery6year(e)} title={query6year}>
                      <Dropdown.Item eventKey= "2018">2018</Dropdown.Item>
                      <Dropdown.Item eventKey= "2019">2019</Dropdown.Item>
                      <Dropdown.Item eventKey= "2020">2020</Dropdown.Item>
                      <Dropdown.Item eventKey= "2021">2021</Dropdown.Item>
                    </DropdownButton> 
                  </Col>
                  <Col lg={5}>
                    <DropdownButton onSelect={(e) => setQuery6aow(e)} title={query6aow} id="buttonText">
                      <Dropdown.Item eventKey= "AGRICULTURAL RESEARCH BASIC AND APPLIED RESEARCH">AGRICULTURAL RESEARCH BASIC AND APPLIED RESEARCH</Dropdown.Item>
                      <Dropdown.Item eventKey= "HIGH INTENSITY DRUG TRAFFICKING AREAS PROGRAM">HIGH INTENSITY DRUG TRAFFICKING AREAS PROGRAM</Dropdown.Item>
                      <Dropdown.Item eventKey= "DISASTER GRANTS - PUBLIC ASSISTANCE (PRESIDENTIALLY DECLARED DISASTERS)">DISASTER GRANTS - PUBLIC ASSISTANCE (PRESIDENTIALLY DECLARED DISASTERS)</Dropdown.Item>
                      <Dropdown.Item eventKey= "STRENGTHENING PUBLIC HEALTH SYSTEMS AND SERVICES THROUGH NATIONAL PARTNERSHIPS TO IMPROVE AND PROTECT THE NATIONS HEALTH">STRENGTHENING PUBLIC HEALTH SYSTEMS AND SERVICES THROUGH NATIONAL PARTNERSHIPS TO IMPROVE AND PROTECT THE NATIONS HEALTH</Dropdown.Item>
                      <Dropdown.Item eventKey= "NATIONAL SCHOOL LUNCH PROGRAM">NATIONAL SCHOOL LUNCH PROGRAM</Dropdown.Item>
                      <Dropdown.Item eventKey= "ECONOMIC SOCIAL AND POLITICAL DEVELOPMENT OF THE TERRITORIES">ECONOMIC SOCIAL AND POLITICAL DEVELOPMENT OF THE TERRITORIES</Dropdown.Item>
                      <Dropdown.Item eventKey= "UNEMPLOYMENT INSURANCE">UNEMPLOYMENT INSURANCE</Dropdown.Item>
                      <Dropdown.Item eventKey= "ALLERGY AND INFECTIOUS DISEASES RESEARCH">ALLERGY AND INFECTIOUS DISEASES RESEARCH</Dropdown.Item>
                    </DropdownButton> 
                  </Col>
                </Row>
                <div className="line-break" />
                <Button 
                  variant="primary" 
                  style={{marginTop: "1rem"}} 
                  onClick={() => {
                    assistanceQuery(getAssistanceAreaofworkStateExists(query6aow, query6year));
                  }}
                >
                  Submit
                </Button>
              </>
            }
          </div>
        </>
        <ComposableMap data-tip="" projectionConfig={dataset === 'Contracts' ? { scale: 800 } : { scale: 800 }} projection="geoAlbersUsa" id="mapDiv" style={{marginTop: "-10%"}}>
          {stateArray ?
            <Geographies geography={geoUrl} style={{position: "absolute", top: 0}}>
              {({ geographies }) =>
                // assign colors to different monetary values
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
                  // find state in query output
                  const cur = stateArray.find(s => s.state.toUpperCase() === geo.properties.name.toUpperCase());
                  return(
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={cur ? colorScale(cur.sum) : "#EEE"}
                      onMouseEnter={() => {
                        if (stateArray) {
                          const name = geo.properties.name;
                          // set value for when you hover over a state with your mouse
                          if (!cur || !cur.sum) {
                            setTooltipContent(`
                              <div style="text-align: center">${name}</div>
                            `);  
                          } else if (cur.recipient) {
                            setTooltipContent(`
                              <div style="text-align: center">${name}</div>
                              <div style="text-align: center">${cur.recipient}</div> 
                              <div style="text-align: center">$${cur.sum.toLocaleString()}</div>
                            `);
                          } else if (cur.awarder) {
                            setTooltipContent(`
                              <div style="text-align: center">${name}</div>
                              <div style="text-align: center">${cur.awarder}</div> 
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
          isLoading ?
          <div id="loading" />
          :null
        }
      </div>
    </>
  );
};

export default memo(Map);
