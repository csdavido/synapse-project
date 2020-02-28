import React, { Component } from 'react'
import '../App.css'
import Web3 from 'web3'
import { SYNAPSE_ABI, SYNAPSE_ADDRESS } from '../config'
import { PROFILE_ABI, PROFILE_ADDRESS } from '../config'
import { BIO_ABI, BIO_ADDRESS } from '../config'

var bioText = 'Loading...'

function isInstalled() {
   if (typeof Web3 !== 'undefined'){
      console.log('MetaMask is installed')
   }
   else{
      console.log('MetaMask is not installed')
   }
}

function isLocked(web3) {
   web3.eth.getAccounts(function(err, accounts){
      if (err != null) {
         console.log(err)
      }
      else if (accounts.length === 0) {
         console.log('MetaMask is locked')
      }
      else {
         console.log('MetaMask is unlocked')
      }
   });
}

class Profile extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    this.forceUpdate()
  }

  componentDidMount(){
    document.title = "Synapse App"
    
  }
  
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  
  async loadBlockchainData() {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    //const web3 = new Web3(window.web3.currentProvider);

    isInstalled();
    isLocked(web3);

    //await ethereum.enable();

    const synapse = new web3.eth.Contract(SYNAPSE_ABI, SYNAPSE_ADDRESS)
    const profile = new web3.eth.Contract(PROFILE_ABI, PROFILE_ADDRESS)
    const bio = new web3.eth.Contract(BIO_ABI, BIO_ADDRESS)    
        
    this.setState({ bio })
    
    
    const accounts = await web3.eth.getAccounts()
    const balanceWei = await web3.eth.getBalance(accounts[0])
    
    
    var balance = balanceWei/1000000000000000000
    
    this.setState({ account: accounts[0]})
    
    bio.methods.getBio(accounts[0]).call({ from: accounts[0]}).then(function(result){
        bioText = result  
        console.log(bioText)  
        
    });
    this.setState({ currentBio: bioText })
  }
    
  async refresh() {
    this.forceUpdate()
  }

  async componentDidMount() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const bio = new web3.eth.Contract(BIO_ABI, BIO_ADDRESS)    
    this.setState({ bio })
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    
    bio.methods.getBio(accounts[0]).call({ from: accounts[0]}).then(function(result){
        bioText = result  
        console.log(bioText)
    });
    
    this.forceUpdate()
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: '',
      myString: '',
      thoughts: [],
      handle: 0,
      loading: true,
      currentBio: bioText     
    }
    this.updateBioText = this.updateBioText.bind(this)
    this.getBioText = this.getBioText.bind(this)
    
  }
  
  updateBioText(string) {

    this.setState({ loading: true })
    this.state.bio.methods.updateBio(string).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
  getBioText() {
      this.setState({ loading: true })
      return this.state.bio.methods.getBio(this.state.account).call({ from: this.state.account })
      .once('receipt', (receipt) => {
      this.setState({ loading: false })
    });
      
  }
      
  
  render() {
    return (
    <div className="App">
        <header className="App-header">
          <main role="main" className="">

        <div>
        Current bio:
        <div dangerouslySetInnerHTML= {{ __html: this.state.currentBio }} />
        </div>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.updateBioText(this.user.value)
        }}>
          <input ref={(input) => this.user = input} type="text" className="" placeholder="Update bio" required />
          &nbsp;
          <input type="submit" hidden={false} />
        </form>

          </main>
        </header>
      </div>

      
    );
  }
}

export default Profile;
