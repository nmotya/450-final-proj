import '../style/Survey.css';
import React from 'react';
import Navbar from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Survey extends React.Component {
	constructor(props) {
		super(props);
	};
	
	render() {
		return (
            <>
                <Navbar />
                <div>
                    Survey
                </div>
            </>
		);
	};
};
