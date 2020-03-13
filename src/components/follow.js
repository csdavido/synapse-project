import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../App.css'
import '../css/home.css'
import Web3 from 'web3'
import { SYNAPSE_ABI, SYNAPSE_ADDRESS } from '../config'
import { FOLLOW_ABI, FOLLOW_ADDRESS } from '../config'
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

class Follow extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    {/*await this.addFollow("0x9F943eD85fb1B63b2a68aF79290e5023D32F5E96")*/}
    await this.getFollowing()
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
    const follow = new web3.eth.Contract(FOLLOW_ABI, FOLLOW_ADDRESS)

    this.setState({ profile })
    this.setState({ bio })
    this.setState({ follow })

    const accounts = await web3.eth.getAccounts()
    const balanceWei = await web3.eth.getBalance(accounts[0])

    var balance = balanceWei/1000000000000000000

    this.setState({ account: accounts[0], balance: balance })
    this.setState({ loading: false })

    var testFollow = "0x9F943eD85fb1B63b2a68aF79290e5023D32F5E96"


  }



  async addFollow(followee) {

    this.state.follow.methods.addFollower(followee).send({ from: this.state.account })

  }

  async getFollowing() {

    var singleFollow = await this.state.follow.methods.getFollowers.call()

    console.log(singleFollow[0])

  }


  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: '',
      myString: '',
      thoughts: [],
      following: [],
      handle: 0,
      loading: true,
      currentBio: "Loading..."
    }

    this.addFollow = this.addFollow.bind(this)
    this.getFollowing = this.getFollowing.bind(this)

  }

  async refresh() {
    this.forceUpdate()
  }



  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Follow;
