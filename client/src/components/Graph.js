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
			obligated: [],
			obligatedYear: [],
			nonFedObligated: [],
			nonFedYear: [],
			selectedOption: 'option1',
			graph_to_display: ''
		};

		this.handleOptionChange = this.handleOptionChange.bind(this);
	};

	// Here's my fetch function
	componentDidMount() {
		// fetch("http://localhost:8000/assistTest2/").then(res => res.text()).then(text => console.log(text));

		// Fetch fed obligation
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
	
		const year = testList.map((obligatedObj, i) =>
			obligatedObj.year
		);

		const total = testList.map((obligatedObj, i) =>
			obligatedObj.total
		);

		  this.setState({
			obligated: total,
			obligatedYear: year
		  });

		  console.log(this.state.obligated);
		  console.log(this.state.obligatedYear);
		}, err => {
		  console.log(err);
		});	

		// Fetch nonFed obligation
		fetch("http://localhost:8000/nonFedByYear/",
		{  
		  method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		}).then(testList => {
		  if (!testList) return;
		  console.log(testList);
	
		const year = testList.map((obligatedObj, i) =>
			obligatedObj.year
		);

		const total = testList.map((obligatedObj, i) =>
			obligatedObj.total
		);

		  this.setState({
			nonFedObligated: total,
			nonFedYear: year
		  });

		  console.log(this.state.obligated);
		  console.log(this.state.obligatedYear);
		}, err => {
		  console.log(err);
		});	
	};

	handleOptionChange(e) {
		this.setState({
		  selectedOption: e.target.value
		});
	};


	option_1_plot() {
		return <Plot
				data={[
				{
					x: this.state.obligatedYear,
					y: this.state.obligated,
					type: 'scatter',
					mode: 'lines+markers',
					marker: {color: 'red'},
				},
				{type: 'bar', x: this.state.obligatedYear, y: this.state.obligated},
				]}
				layout={ {width: 500, height: 500, title: 'Federal Total Obligated Spending By Year'} }
			/>
	}

	option_2_plot() {
		return <Plot
			data={[
			{
				x: this.state.nonFedYear,
				y: this.state.nonFedObligated,
				type: 'scatter',
				mode: 'lines+markers',
				marker: {color: 'red'},
			},
			{type: 'bar', x: this.state.nonFedYear, y: this.state.nonFedObligated},
			]}
			layout={ {width: 500, height: 500, title: 'Non-Federal Total Obligated Spending By Year'} }
		/>
	}

	Graph() {
		if (this.state.selectedOption == 'option1') {
			return this.option_1_plot();
		} else if (this.state.selectedOption == 'option2') {
			return this.option_2_plot();
		}
	}
	
	render() {
		return (
            <>
                <Navbar />

				<div className="container">
				<div className="row">
					<div className="col-sm-12">

					<form>
						<div className="radio">
						<label>
							<input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} 
								onChange={this.handleOptionChange} />
							Option 1
						</label>
						</div>
						<div className="radio">
						<label>
							<input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} 
								onChange={this.handleOptionChange} />
							Option 2
						</label>
						</div>
						<div className="radio">
						<label>
							<input type="radio" value="option3" checked={this.state.selectedOption === 'option3'}
								onChange={this.handleOptionChange} />
							Option 3
						</label>
						</div>
					</form>

					</div>
				</div>
				</div>

				<div>{this.Graph()}</div>
				

            </>
		);
	};
};

