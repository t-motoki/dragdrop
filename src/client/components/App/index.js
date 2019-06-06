import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'drag',
    };
  }

  render() {
    return (
      <div>
        hello<i className="fa fa-thumbs-up"></i>
      </div>
    );
  }
}

export default App;
