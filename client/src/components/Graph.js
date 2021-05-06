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
			// Param for contractSpendingAcrossYearsSumGroupBy
			contractSum: [],
			contractYear: [],
			// Param for assistanceSpendingAcrossYearsSumGroupBy
			assistSum: [],
			assistYear: [],
			// Param for contractPaSpendingByYear
			paSum: [],
			paYear: [],
			// Param for contractAgencySpending
			agencySpending: [],
			agencyName: [],
			// Param for contractRecipientType
			recipientType: [],
			recipientSum: [],
			// Param for controlling radio button selection
			selectedOption: 'option1'
		};

		this.handleOptionChange = this.handleOptionChange.bind(this);
	};

	// Default: option1, fetch contractSpendingAcrossYearsSumGroupBy, but everything else is also fetched
	componentDidMount() {
		// fetch("http://localhost:8000/assistTest2/").then(res => res.text()).then(text => console.log(text));

		// Fetch fed obligation
		fetch("http://localhost:8000/contractSpendingAcrossYearsSumGroupBy/",
		{  
		  method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		}).then(result => {
		  if (!result) return;
		  console.log(result);
	
		const year = result.map((Obj, i) =>
			Obj.year
		);

		const total = result.map((Obj, i) =>
			Obj.sum
		);

		  this.setState({
			contractSum: total,
			contractYear: year
		  });
		}, err => {
		  console.log(err);
		});	

		// Fetch assistanceSpendingAcrossYearsSumGroupBy
		fetch("http://localhost:8000/assistanceSpendingAcrossYearsSumGroupBy/",
		{  
		  method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		}).then(result => {
		  if (!result) return;
		  console.log(result);
	
		const year = result.map((Obj, i) =>
			Obj.year
		);

		const total = result.map((Obj, i) =>
			Obj.sum
		);

		  this.setState({
			assistSum: total,
			assistYear: year
		  });
		}, err => {
		  console.log(err);
		});	

		// Fetch contractPaSpendingByYear
		fetch("http://localhost:8000/contractPaSpendingByYear/",
		{  
		  method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		}).then(result => {
		  if (!result) return;
		  console.log(result);
	
		const year = result.map((Obj, i) =>
			Obj.year
		);

		const total = result.map((Obj, i) =>
			Obj.sum
		);

		  this.setState({
			paSum: total,
			paYear: year
		  });
		}, err => {
		  console.log(err);
		});	

		// Fetch contractAgencySpending
		fetch("http://localhost:8000/contractAgencySpending/",
		{  
		  method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		}).then(result => {
		  if (!result) return;
		  console.log(result);
	
		const name = result.map((Obj, i) =>
			Obj.name
		);

		const total = result.map((Obj, i) =>
			Obj.sum
		);

		  this.setState({
			agencySpending: total,
			agencyName: name
		  });
		}, err => {
		  console.log(err);
		});	

		// Fetch contractRecipientType
		fetch("http://localhost:8000/contractRecipientType/",
		{  
		  method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		}).then(result => {
		  if (!result) return;
		  console.log(result);
	
		const type = result.map((Obj, i) =>
			Obj.type
		);

		const total = result.map((Obj, i) =>
			Obj.sum
		);

		  this.setState({
			recipientSum: total,
			recipientType: type
		  });
		}, err => {
		  console.log(err);
		});	
	};

	handleOptionChange(e) {
		this.setState({
		  selectedOption: e.target.value
		});
	};


	// Plot for contractSpendingAcrossYearsSumGroupBy
	contractSpendingAcrossYearsSumGroupBy() {
		return <Plot
				data={[
				{
					x: this.state.contractYear,
					y: this.state.contractSum,
					type: 'scatter',
					mode: 'lines+markers',
					marker: {color: 'red'},
				},
				]}
				layout={ {width: 500, height: 500, title: 'Total Contract Spending By Year'} }
			/>
	}

	// Plot for assistanceSpendingAcrossYearsSumGroupBy
	assistanceSpendingAcrossYearsSumGroupBy() {
		return <Plot
			data={[
			{
				x: this.state.assistYear,
				y: this.state.assistSum,
				type: 'scatter',
				mode: 'lines+markers',
				marker: {color: 'red'},
			},
			]}
			layout={ {width: 500, height: 500, title: 'Total Assistance Spending By Year'} }
		/>
	}

	// Plot for contractPaSpendingByYear
	contractPaSpendingByYear() {
		return <Plot
		data={[
		{
			x: this.state.paYear,
			y: this.state.paSum,
			type: 'scatter',
			mode: 'lines+markers',
			marker: {color: 'red'},
		},
		]}
		layout={ {width: 500, height: 500, title: 'Total PA Contract Spending By Year'} }
	/>
	}

	// Plot for contractAgencySpending
	contractAgencySpending() {
		return <Plot
		data={[
		{type: 'bar', x: this.state.agencyName, y: this.state.agencySpending}
		]}
		layout={ {width: 600, height: 600, title: 'Total Contract Agency Spending By Year'} }
	/>
	}

	// Plot for contractRecipientType
	contractRecipientType() {
		return <Plot
		data={[
		{type: 'pie', values: this.state.recipientSum, labels: this.state.recipientType}
		]}
		layout={ {width: 500, height: 500, title: 'Total Contract Recipient Spending By Year'} }
	/>
	}


	Graph() {
		if (this.state.selectedOption == 'option1') {
			return this.contractSpendingAcrossYearsSumGroupBy();
		} else if (this.state.selectedOption == 'option2') {
			return this.assistanceSpendingAcrossYearsSumGroupBy();
		} else if (this.state.selectedOption == 'option3') {
			return this.contractPaSpendingByYear();
		} else if (this.state.selectedOption == 'option4') {
			return this.contractAgencySpending();
		} else if (this.state.selectedOption == 'option5') {
			return this.contractRecipientType();
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
							View Total Contract Spending Across Year
						</label>
						</div>
						<div className="radio">
						<label>
							<input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} 
								onChange={this.handleOptionChange} />
							View Total Assistance Spending Across Year
						</label>
						</div>
						<div className="radio">
						<label>
							<input type="radio" value="option3" checked={this.state.selectedOption === 'option3'}
								onChange={this.handleOptionChange} />
							View PA Contract Spending Across Year
						</label>
						</div>
						<div className="radio">
						<label>
							<input type="radio" value="option4" checked={this.state.selectedOption === 'option4'}
								onChange={this.handleOptionChange} />
							View Spending by Agency in Contract
						</label>
						</div>
						<div className="radio">
						<label>
							<input type="radio" value="option5" checked={this.state.selectedOption === 'option5'}
								onChange={this.handleOptionChange} />
							View Spending by Recipient in Contract
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

