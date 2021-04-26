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
						<h2 style={{fontWeight:"bold"}}>You deserve to know how your tax dollars are spent</h2>
						<div id="homeParaDiv">
							<p>
								Dear American citizen, 
							</p>
							<p>
								This webapp was built with the purpose of allowing you to understand how the government allocates your hard-earned money.
								We 
							</p>
						</div>
					</div>

				</div>
            </>
		);
	};
};
