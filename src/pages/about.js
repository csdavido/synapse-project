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
								<div className = "aboutText">
		      				<h1>What is Synapse?</h1>
		      				<br></br>
		      				<p>Synapse connects its users, allowing them to send thoughts on the blockchain.</p>

									<br />
									<h2>Welcome to Synapse!</h2>
									<p>
									Synapse is a social media tool, similar to Twitter in both form and function.
									Just as Twitter is composed of user-generated content in the form of “tweets”, Synapse is composed of user-generated content (which are likewise short messages) in the form of “thoughts”.
									What makes Synapse special, however, is that it’s built on top of blockchain technology.
									This means that instead of using a traditional, centralized database as a backend, we store everything (we don’t use a database at all!) on the decentralized Ethereum blockchain.
									This makes anything that’s posted on Synapse immutable and censorship-proof.
									In a lot of ways, this is an experiment in decentralized technology—more of a proof of concept than anything, because blockchain still has a long way to go before it’s been abstracted enough to truly be considered user-friendly.
									That being said, we’re excited to present our decentralized Application.
									</p>
									<p>
									Below, you will find the Synapse documentation.
									This documentation should cover enough ground to allow a novice to get set up with the proper interfaces, obtain some Ether, the native currency of the Ethereum blockchain, and get started sending and receiving thoughts on the Synapse dApp.
									Please, enjoy Synapse!
									</p>


									<h1>Launching Synapse</h1>

									<h3>Quickstart Guide </h3>
									<p>This section is a short list of what a user should do in order to use Synapse.
									Please reference this <u><a href="https://docs.google.com/document/d/1RdnHQa2ej2OpYW4YO_goGbFX21T7DvEgH7pWQ90mkYY/edit?usp=sharing">detailed instruction </a></u>
									set for more information, including screenshots of what to expect and how to use the application.

									<br />
									<br />

									<ol className = "right-align">
										<li>Install MetaMask for your browser of choice at https://metamask.io/.</li>
										<li>Set up the MetaMask wallet and connect to the Ropsten Test Network.</li>
										<li>Fund your Ropsten Test Network address with an <u><a href="https://faucet.ropsten.be">Ethereum faucet</a></u>.</li>
										<li>Send thoughts to the blockchain, much as one would send tweets via Twitter.</li>
									</ol>

									</p>

									<br />
									<h3>Account Creation</h3>
									<p>
									Because Synapse is deployed on Ethereum, there is a built-in level of security.
									The public/private key system offers a unique method of user authentication—since an Ethereum address is required for using Synapse, and because each address has a unique public key and associated private key that grants access, this serves to replace a traditional username and password.
									In Web2.0 language, a user’s Web3 provider can be seen as a password manager for all Ethereum dApps.
									By importing a wallet, the user is proving that they have access to that particular private key, and so ought to be considered the singular owner of that account.
									In this case, account ownership is the only login credential we require, and anyone who is logged into a particular wallet is considered to be logged in to a given account.
									<br />
									<br />
									Beyond this, we have given the ability for a user to choose their individual username/handle.
									Each account can have a handle, and each handle must be unique (although, at the moment, we don’t count upper- and lower-case handles as equivalent, so “dog” and “Dog” are different).
									The one exception to this rule is the handle “Anonymous”.
									This handle is considered to be open, and any user can switch back to it at any time, as it’s also the default handle.

									</p>

									<br />
									<p> And other than what's above, you're good to go... Enjoy! </p>

									<br />
									<br />
								</div>
	      			</div>
	      		</body>
	      	</div>
		);
	}

}

export default About
