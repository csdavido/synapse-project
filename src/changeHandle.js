import React, { Component } from 'react'
import './App.css'


class ChangeHandle extends Component {

  async refresh() {
    this.forceUpdate()
  }

  async componentDidMount() {
    this.forceUpdate()
  }

  constructor(props) {
    super(props);
    this.state = {isAvail: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isAvail: true
    }));
  }



  render() {
    return (



      <div>

        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.changeHandle(this.user.value)
        }}>
          <input ref={(input) => this.user = input} type="text" className="" placeholder="New handle?" required />
          &nbsp;
          <input type="submit" hidden={false} />
        </form>

        <hr/>

      </div>
    );
  }
}

export default ChangeHandle;
