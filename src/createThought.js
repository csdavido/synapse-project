import React, { Component } from 'react'
import './App.css'


class Thought extends Component {

  async refresh() {
    this.forceUpdate()
  }

  async componentDidMount() {
    this.forceUpdate()
  }

  render() {
    return (

      <div className = "formDiv">

        <form className = "thoughtForm" onSubmit={(event) => {
          event.preventDefault()
          this.props.createThought(this.thought.value)
        }}>
        <div class = "infoFlex">
        <span> &nbsp; </span>
          <span className="acctBalance">Account: {this.props.acct}</span>
          <span className="handBalance">Handle: @{this.props.hand}</span>
          <span> &nbsp; </span>
        </div>
          <textarea ref={(input) => this.thought = input} type="text" className="thoughtBox" placeholder="What are you thinking?" required />
          <br />
            <input type="submit" hidden={false} />
        </form>

        <hr/>

      </div>
    );
  }
}

export default Thought;
