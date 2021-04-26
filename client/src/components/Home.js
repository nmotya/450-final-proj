import '../style/Home.css';
import React from 'react';
import Navbar from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends React.Component {
	render() {
		document.body.classList.add('backgroundImg');
		return (
            <>
                <Navbar />
				<div id="homeWrapper">
					<div id="homeTextWrapper">
						<h2 style={{fontWeight:"bold"}}>You deserve to know how your tax dollars are spent.</h2>
						<div id="homeParaDiv">
							<p>
								Dear American citizen, 
							</p>
							<p>
								This webapp was built with the purpose of allowing you to understand how the government allocates your hard-earned money.
								We sampled government spending on contracts and financial assistance via the data available on https://www.usaspending.gov/.
								On this application, you can query various statistics on government spending with different filters such as who awarded the funds and who received said funds among<span style={{fontSize: "1px"}}>us</span> other things.
								We also have a map page which displays a map that shows government spending by state. Lastly, we have a survey page that will ask you about your views on government spending and then we will compare your results to that of other American citizens.
							</p>
							<p>Sincerely,</p>
							<p>Albert, Kevin, Yi, and Nassim</p>
						</div>
					</div>

				</div>
            </>
		);
	};
};
