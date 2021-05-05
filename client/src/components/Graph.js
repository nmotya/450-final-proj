import '../style/Graph.css';
import React from 'react';
import Navbar from './Navbar'
import TestRow from './test'
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Graph extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			testRows: []
		};
	};

	// Here's my fetch function
	componentDidMount() {
		// fetch("http://localhost:8000/assistTest2/").then(res => res.text()).then(text => console.log(text));

		fetch("http://localhost:8000/totalObligatedByYear/",
		{  
		  method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		}).then(testList => {
		  if (!testList) return;
		  console.log(testList);
	
		  const testRowValues = testList.map((testObj, i) =>
		  <TestRow className="testRowValue" 
		  	code = {testObj.recipient_state_code}
			name = {testObj.recipient_state_name}
			/>
		);

		  this.setState({
			testRows: testRowValues
		  });
		}, err => {
		  console.log(err);
		});	
	};
	
	render() {
		return (
            <>
                <Navbar />
				<Plot
					data={[
					{
						x: [1, 2, 3],
						y: [2, 6, 3],
						type: 'scatter',
						mode: 'lines+markers',
						marker: {color: 'red'},
					},
					{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
					]}
					layout={ {width: 500, height: 500, title: 'A Fancy Plot'} }
				/>

				{/* <div className="jumbotron">
						<div className="test-container">
							<div className="movie">
			          <div className="header"><strong>Code</strong></div>
			          <div className="header"><strong>State</strong></div>
			        </div>
			        <div className="test-container" id="testResults">
			          {this.state.testRows}
			        </div>
			      </div>
			    </div> */}
            </>
		);
	};
};

