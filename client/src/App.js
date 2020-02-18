import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    message: ''
  };

  componentDidMount = async () => {
    try {
      const res = await axios.get("/api");
      console.log(res);
      this.setState({ message: res.data.message });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div>
        <h1>Server message: {this.state.message}</h1>
      </div>
    );
  }
}

export default App;