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
import FollowerFeed from '../follow.js'



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
    {/* await this.addFollow("0x9F943eD85fb1B63b2a68aF79290e5023D32F5E96") */}
    await this.getFollowing()
    await this.populateThoughts()
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

    var thoughtCount = await profile.methods.thoughtCount().call()

    this.setState({ loading: true })

    const add = accounts[0]

    for (var i = thoughtCount - 1; i >= 0; i--) {

      const singleThought = await profile.methods.thoughts(i).call()

      if (singleThought.sender == add) {
        this.setState({
          thoughts: [...this.state.thoughts, singleThought]
        })
      }

    }


  }



  async addFollow(followee) {

    this.state.follow.methods.addFollower(followee).send({ from: this.state.account })

  }

  async getFollowing() {

    var i = 0

    var fcCount = await this.state.follow.methods.getFollowCount().call({ from: this.state.account })

    console.log("COUNT: " + fcCount)

    var singleFollow = "follow"

    var sfCheck = true
    var fc = 0

    for (fc = fcCount; fc > 0; fc--) {

    singleFollow = await this.state.follow.methods.following(this.state.account, i).call()


    console.log(singleFollow)

    if (singleFollow) {
      this.setState({
        following: [...this.state.following, singleFollow]
      })
    }

    i++

    }


  }

  async populateThoughts () {

    this.setState({ loading: true })

    var followLength = this.state.following.length

    var thoughtLength = this.state.thoughts.length

  var n
  var checker = true
  var holder = 0
  var looper = true

  while (checker)
    for (n = thoughtLength-1; n > -1; n--) {

      console.log("Tl: " + thoughtLength)

      looper = true
      var sndr = await this.state.thoughts[n].sender

      console.log("Loop " + n + ": " + this.state.thoughts[n].thought)

      for (var x = followLength - 1; x > 0; x--) {

        if (this.state.following[x] == sndr) {

          var newAdd = await this.state.thoughts[n]

          this.setState({ fThoughts: [...this.state.fThoughts, newAdd] }, () => {
            console.log("New State " + this.state.fThoughts[0].sender);
          });
          looper = false
          break
          holder++

        }
        if (looper == false) {
          break
        }

      }

      if (holder == 10) {
        checker = false
      }

      console.log("done")
    checker = false

      this.setState(
      { loading: false})


    }


  }


  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: '',
      myString: 'HI',
      thoughts: [],
      following: [],
      fThoughts: [],
      handle: 0,
      loading: true,
      currentBio: "Loading..."
    }

    this.addFollow = this.addFollow.bind(this)
    this.getFollowing = this.getFollowing.bind(this)
    this.populateThoughts = this.populateThoughts.bind(this)

  }

  async refresh() {
    this.forceUpdate()
  }



  render() {
    return (
      <div>
{/*
          <form onSubmit={(event) => {
        event.preventDefault()
        this.addFollow(this.user.value)
          }}>
        <input ref={(input) => this.user = input} type="text" className="" placeholder="Follow Address" maxlength="200" required />
        &nbsp;
        <input type="submit" hidden={false} />
        </form>
*/}
      <br />

      <form onSubmit={(event) => {
    event.preventDefault()
    this.populateThoughts()
      }}>
    &nbsp;
    <input type="submit" hidden={false} />
    </form>


    { this.state.loading
      ? <div id="loader" className=""><p className="">Getting feed...</p></div>
      : <FollowerFeed fThoughts = {this.state.fThoughts} />

    }


    </div>

    );
  }
}

export default Follow;
