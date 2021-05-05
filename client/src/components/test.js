import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TestRow extends React.Component {
	/* ---- Q3b (Best Movies) ---- */
	render() {
		return (
			<div className="testRow">
				<div className="code">{this.props.code}</div>
				<div className="name">{this.props.name}</div>
			</div>
		);
	};
};
