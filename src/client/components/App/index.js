import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'sample' + JSON.stringify(this),
      count:0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    let i = this.state.count;
    i++;
    this.setState({
      message: "sample"+i,
      count:i,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>おしてね<span className="fa fa-thumbs-up"/></button>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default App;
