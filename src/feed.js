import React, { Component } from 'react'
import Web3 from 'web3'
import Timestamp from 'react-timestamp'
import { SYNAPSE_ABI, SYNAPSE_ADDRESS } from './config'
import { PROFILE_ABI, PROFILE_ADDRESS } from './config'


class Thoughts extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.getThoughts()
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



  async checkVar () {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    const synapse = new web3.eth.Contract(SYNAPSE_ABI, SYNAPSE_ADDRESS)
    const profile = new web3.eth.Contract(PROFILE_ABI, PROFILE_ADDRESS)

    this.setState({ profile })
    this.setState({ thoughtCount })

    var thoughtCount = await profile.methods.thoughtCount().call()

    //this.getThoughts()

  }

  async getThoughts() {

    this.setState({ thoughts: [] })

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    //const synapse = new web3.eth.Contract(SYNAPSE_ABI, SYNAPSE_ADDRESS)
    const profile = new web3.eth.Contract(PROFILE_ABI, PROFILE_ADDRESS)
    const accounts = await web3.eth.getAccounts()

    this.setState({ profile })
    this.setState({ thoughtCount })

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

  constructor(props) {
    super(props)
    this.state = {
      thoughts: [],
      latest: ''
    }
  }

  componentDidMount() {

    this.interval = setInterval(() => this.checkVar(), 2000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }



  render() {
    return (



      <div>
      <p class="latestText"> My Thoughts </p>


        <ul>
            { this.state.thoughts.map((thought, key) => {
              return(
                <div key={key}>


                  <div class="thought-wrap">
                    <div class="thought-head">
                      <div class="thought-info">
                        <span>@{thought.sender}</span>
                        <p>{thought.thought}</p>
                        <p>-{thought.handle}</p>
                      </div>
                    </div>



                    <div class="thought-counts">

                      <div class="likes">
                        <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <div class="like-num">0</div>
                      </div>

                      <div class="shares">
                        <svg class="feather feather-repeat sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                        <div class="share-num">0</div>
                      </div>

                      <div class="likes">
                        <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <div class="like-num">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </ul>


      </div>
    );
  }
}

export default Thoughts;
