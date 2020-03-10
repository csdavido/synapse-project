import React, { Component } from 'react'
import '../css/about.css'
import logo from '../public/home/Synapse-logo-black.png';
//import text from '../public/home/text.png';

class About extends Component {

	render() {
		return (
    		<div className="About">
        		<header className="About-header">
     				<img src={logo} className="App-logo" alt="logo" />
     			</header>
      		
	      		<body>
	      			<div className="Description">
	      				<h1>What is Synapse?</h1>
	      				<br></br>
	      				<p>Synapse connects its users, allowing them to send thoughts on the blockchain.</p>
	      			</div>
	      		</body>
	      	</div>
		);
	}

}

export default About
