import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../App.css'
import '../css/home.css'
import Web3 from 'web3'
import { SYNAPSE_ABI, SYNAPSE_ADDRESS } from '../config'
import { PROFILE_ABI, PROFILE_ADDRESS } from '../config'
import { BIO_ABI, BIO_ADDRESS } from '../config'
import { USER_ABI, USER_ADDRESS } from '../config'
import Thought from '../createThought.js'
import Feed from '../feed.js'


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

class Home extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.getBioText()
    await this.getOwnHandle()
    this.forceUpdate()
  }

  componentDidMount(){
    document.title = "My Synapse Feed"


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

    isInstalled();
    isLocked(web3);

    const synapse = new web3.eth.Contract(SYNAPSE_ABI, SYNAPSE_ADDRESS)
    const profile = new web3.eth.Contract(PROFILE_ABI, PROFILE_ADDRESS)
    const bio = new web3.eth.Contract(BIO_ABI, BIO_ADDRESS)

    this.setState({ profile })
    this.setState({ bio })

    const accounts = await web3.eth.getAccounts()
    const balanceWei = await web3.eth.getBalance(accounts[0])

    var balance = balanceWei/1000000000000000000

    this.setState({ account: accounts[0], balance: balance })
    this.setState({ loading: false })

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
      currentBio: "Loading..."
    }

    this.createThought = this.createThought.bind(this)
    this.getBioText = this.getBioText.bind(this)
    this.getOwnHandle = this.getOwnHandle.bind(this)
  }

  async refresh() {
    this.forceUpdate()
  }

  createThought(string) {

      //const profile = new web3.eth.Contract(PROFILE_ABI, PROFILE_ADDRESS)

      this.setState({ loading: true })
      this.state.profile.methods.createThought(string).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  async getBioText() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const bio = new web3.eth.Contract(BIO_ABI, BIO_ADDRESS)
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0]})

      bio.methods.getBio(accounts[0]).call({ from: accounts[0]}).then(val => this.setState({ currentBio: val }));

  }

  async getOwnHandle() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const profile = new web3.eth.Contract(PROFILE_ABI, PROFILE_ADDRESS)
      const accounts = await web3.eth.getAccounts()

      let curHandle = "";

      profile.methods.getOwnHandle().call({ from: accounts[0]}).then(val => {
          if (val === undefined || val === null || val === "")
          {
            this.setState({ currentHandle: "Anonymous" });
          }
          else
          {
              this.setState({ currentHandle: val });
          }
      }, reason => {});
  }


  render() {
    return (
      <div className="App">

          <section>
            <div class="flex">
              <div class="info">
                <h5> Account: {this.state.account} </h5>
                <h5> Handle: @{this.state.currentHandle} </h5>
                <h5>My Balance: <p> {this.state.balance}</p></h5>
                <h5>My Bio: <p> {this.state.currentBio} </p> </h5>
              </div>
            </div>

            <div>
              <div className = "formDiv">
                <br />
                <p> Send a thought to the blockchain!</p>

                { this.state.loading
                  ? <div id="loader" className=""><p className="">Communicating with blockchain...</p></div>
                  : <Thought
                    thoughts={this.state.thoughts}
                    createThought={this.createThought}
                    hand = {this.state.currentHandle}
                    acct = {this.state.account}
                   />

                }

              </div>

              <span></span>

              <Feed thoughts={this.state.thoughts} />


            </div>
          </section>
      </div>
    );
  }
}

export default Home;
