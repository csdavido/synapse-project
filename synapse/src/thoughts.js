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

    const latestCall = await profile.methods.thoughts(thoughtCount-1).call()
    const latestCallCheck = await profile.methods.thoughts(thoughtCount-2).call()
    const latest = latestCall.thought
    const latestCheck = latestCallCheck.thought

    if (this.state.latest == latest) {
      return
    }

    else {
      this.getThoughts()
    }


  }

  async getThoughts() {

    this.setState({ thoughts: [] })

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    const synapse = new web3.eth.Contract(SYNAPSE_ABI, SYNAPSE_ADDRESS)
    const profile = new web3.eth.Contract(PROFILE_ABI, PROFILE_ADDRESS)

    this.setState({ profile })
    this.setState({ thoughtCount })

    var thoughtCount = await profile.methods.thoughtCount().call()

    const latestCall = await profile.methods.thoughts(thoughtCount-1).call()
    const latestCallCheck = await profile.methods.thoughts(thoughtCount-2).call()
    const latest = latestCall.thought
    const latestCheck = latestCallCheck.thought



    if (thoughtCount < 5) {
      for (var i = thoughtCount-1; i >= 0; i--) {
        const singleThought = await profile.methods.thoughts(i).call()
        this.setState({
          thoughts: [...this.state.thoughts, singleThought]
          //thoughts: [...this.setState({thoughts: [...this.state.thoughts, singleThought]})]
        })
      }
    }
    else {
      for (var i = thoughtCount-1; i >= (thoughtCount-5); i--) {
        const singleThought = await profile.methods.thoughts(i).call()
        this.setState({
          thoughts: [...this.state.thoughts, singleThought]
        })
      }
    }

    this.setState({ latest: latest })


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
      <p class="latestText"> Latest Thoughts: </p>


        <ul>
            { this.state.thoughts.map((thought, key) => {
              return(
                <div key={key}>


                  <div class="thought-wrap">
                    <div class="thought-head">
                      <div class="thought-info">
                        <span>@{thought.user}</span>
                        <p>{thought.thought}</p>
                      </div>
                    </div>



                    <div class="thought-counts">

                      <div class="comments">
                        <svg class="feather feather-message-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        <div class="comment-num">0</div>
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
