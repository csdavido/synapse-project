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
