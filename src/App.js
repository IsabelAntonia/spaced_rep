import React, { Component } from 'react';
import TestComponentToday from "./TestComponentToday";
import TestComponent from "./TestComponent";

class App extends Component {
  render() {
    return (
        <div>
        <h2>Dashboard</h2>
          <button>Create new test</button>
          <div>
            <h3>What's on for today:</h3>
        <TestComponentToday></TestComponentToday>
          </div>
               <div>
            <h3>All tests:</h3>
        <TestComponent></TestComponent>
          </div>
          </div>
    );
  }
}

export default App;