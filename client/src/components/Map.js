import '../style/Map.css';
import React from 'react';
import Navbar from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Map extends React.Component {
	constructor(props) {
		super(props);
	};
	
	render() {
		return (
            <>
                <Navbar />
                <div>
                    Map
                </div>
            </>
		);
	};
};
