import '../style/Survey.css';
import React from 'react';
import Navbar from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Survey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: '',
			// First question params
			Equally: "0",
			Proportionate_to_population: "0",
			Proportionate_to_spending: "0",
			USDA: 0,
			DOC: 0,
			DOD: 0,
			ED: 0,
			DOE: 0,
			HHS: 0,
			DHS: 0,
			DOJ: 0,
			TREAS: 0,
			VA: 0,
			percentAreGiven: 0,
			percentShouldBeGiven: 0,
			percentToCovidRelief: 0
		  };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleUSDA = this.handleUSDA.bind(this);
		this.handleDOC = this.handleDOC.bind(this);
		this.handleDOD = this.handleDOD.bind(this);
		this.handleED = this.handleED.bind(this);
		this.handleDOE = this.handleDOE.bind(this);
		this.handleHHS = this.handleHHS.bind(this);
		this.handleDHS = this.handleDHS.bind(this);
		this.handleDOJ = this.handleDOJ.bind(this);
		this.handleTREAS = this.handleTREAS.bind(this);
		this.handleVA = this.handleVA.bind(this);
		this.handlePercentGivenChange = this.handlePercentGivenChange.bind(this);
		this.handleShouldBeGivenChange = this.handleShouldBeGivenChange.bind(this);
		this.handleCovidReliefChange = this.handleCovidReliefChange.bind(this);
	};

	handleSubmit() {
		fetch('http://localhost:8000/insertIntoSurvey/', {
			method: 'POST',
			body: JSON.stringify({ 
				Equally: this.state.Equally,
				Proportionate_to_population: this.state.Proportionate_to_population,
				Proportionate_to_spending: this.state.Proportionate_to_spending,
				USDA: this.state.USDA,
				DOC: this.state.DOC,
				DOD: this.state.DOD,
				ED: this.state.ED,
				DOE: this.state.DOE,
				HHS: this.state.HHS,
				DHS: this.state.DHS,
				DOJ: this.state.DOJ,
				TREAS: this.state.TREAS,
				VA: this.state.VA,
				percentAreGiven: this.state.percentAreGiven,
				percentShouldBeGiven: this.state.percentShouldBeGiven,
				percentToCovidRelief: this.state.percentToCovidRelief
			}),
			headers: { 'Content-Type': 'application/json' },
		  });
	}

	handleOptionChange(e) {
		this.setState({
			selectedOption: e.target.value
		});
		if (e.target.value == 'Equally') {
			this.setState({
				Equally: "1",
				Proportionate_to_population: "0",
				Proportionate_to_spending: "0"
			});
		} else if (e.target.value == 'Proportionate_to_population') {
			this.setState({
				Equally: "0",
				Proportionate_to_population: "1",
				Proportionate_to_spending: "0"
			});
		} else if (e.target.value == 'Proportionate_to_spending') {
			this.setState({
				Equally: "0",
				Proportionate_to_population: "0",
				Proportionate_to_spending: "1"
			});
		}
	}

	handleUSDA(e) {
		this.setState({
			USDA: e.target.value
		});
	}

	handleDOC(e) {
		this.setState({
			DOC: e.target.value
		});
	}

	handleDOD(e) {
		this.setState({
			DOD: e.target.value
		});
	}

	handleED(e) {
		this.setState({
			ED: e.target.value
		});
	}

	handleDOE(e) {
		this.setState({
			DOE: e.target.value
		});
	}

	handleHHS(e) {
		this.setState({
			HHS: e.target.value
		});
	}

	handleDHS(e) {
		this.setState({
			DHS: e.target.value
		});
	}

	handleDOJ(e) {
		this.setState({
			DOJ: e.target.value
		});
	}

	handleTREAS(e) {
		this.setState({
			TREAS: e.target.value
		});
	}

	handleVA(e) {
		this.setState({
			VA: e.target.value
		});
	}

	handlePercentGivenChange(e) {
		this.setState({
			percentAreGiven: e.target.value
		});
	}

	handleShouldBeGivenChange(e) {
		this.setState({
			percentShouldBeGiven: e.target.value
		});
	}

	handleCovidReliefChange(e) {
		this.setState({
			percentToCovidRelief: e.target.value
		});
	}
	
	render() {
		return (
            <>
                <Navbar />
				<div className="survey-container">
                <form onSubmit={this.handleSubmit}>
					{/* First question answer */}
				<label>
					During times in which no particular state has a major crisis, how do you believe federal spending should be distributed among U.S. states?
				</label>
				<label>
           		 <input type="radio" value="Equally" checked={this.state.selectedOption === 'Equally'} 
					onChange={this.handleOptionChange}/>
            		(a) Equally
          		</label>
				  <label>
           		 <input type="radio" value="Proportionate_to_population" checked={this.state.selectedOption === 'Proportionate_to_population'} 
					onChange={this.handleOptionChange}/>
            		(b) Proportionate to each state’s population
          		</label>
				  <label>
           		 <input type="radio" value="Proportionate_to_spending" checked={this.state.selectedOption === 'Proportionate_to_spending'} 
					onChange={this.handleOptionChange}/>
            		(c) Proportionate to each state’s total spending
          		</label>

				{/* Rank answer */}
				<label>Rank the following departments in order of how much federal funding you believe 
					  they should receive (Enter a number from 1 to 10, with 1 receiving the highest award, 
					  10 receiving the least):
				</label>
				<label>
					Department of Agriculture (USDA):
					<input type="text" name="USDA" onChange={this.handleUSDA} />
				</label>
				<label>
					Department of Commerce (DOC)
					<input type="text" name="DOC" onChange={this.handleDOC}/>
				</label>
				<label>
					Department of Defense (DOD)
					<input type="text" name="DOD" onChange={this.handleDOD}/>
				</label>
				<label>
					Department of Education (ED)
					<input type="text" name="ED" onChange={this.handleED}/>
				</label>
				<label>
					Department of Energy (DOE)
					<input type="text" name="DOE" onChange={this.handleDOE}/>
				</label>
				<label>
					Department of Health and Human Services (HHS)
					<input type="text" name="HHS" onChange={this.handleHHS}/>
				</label>
				<label>
					Department of Homeland Security (DHS)
					<input type="text" name="DHS" onChange={this.handleDHS}/>
				</label>
				<label>
					Department of Justice (DOJ)
					<input type="text" name="DOJ" onChange={this.handleDOJ}/>
				</label>
				<label>
					Department of the Treasury (TREAS)
					<input type="text" name="TREAS" onChange={this.handleTREAS}/>
				</label>
				<label>
					Department of Veterans Affairs (VA)
					<input type="text" name="VA" onChange={this.handleVA}/>
				</label>

				<label>
				What percentage of all federal awards do you think ARE given to corporations? (Input a number from 0 to 100)
					<input type="text" name="percentAreGiven" onChange={this.handlePercentGivenChange} />
				</label>

				<label>
				What percentage of all federal awards do you think SHOULD be given to corporations? (Input a number from 0 to 100)
					<input type="text" name="percentShouldBeGiven" onChange={this.handleShouldBeGivenChange}/>
				</label>

				<label>
				Federal spending has increased significantly since the start of the COVID-19 pandemic in March 2020. Of this increase, what percentage do you think goes directly to 
				COVID-19 relief? (Input a number from 0 to 100)
				<input type="text" name="percentToCovidRelief" onChange={this.handleCovidReliefChange}/>
				</label>

				<input type="submit" value="Submit" />
				</form>
				</div>
            </>
		);
	};
};
