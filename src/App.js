import React, { Component } from 'react';
import TestComponentToday from "./TestComponentToday";
import TestComponent from "./TestComponent";
import './App.css';

class App extends Component {
  render() {
    return (
        <>
        <p id="bigHeading">Dashboard</p>
          <button style={{backgroundColor: "#1c92d2", fontWeight: "bold", margin:"0 auto"}}>Create new test</button>
            <div className="testSection">
          <div className="wrapTestsToday">
            <p className='heading'>What's on for today:</p>
        <TestComponentToday></TestComponentToday>
          </div>
               <div className="wrapTests">
            <p className='heading'>All other tests:</p>
                   <input type="radio"/>
                       <label style={{fontSize: "1.6rem"}}>Show inactive tests:</label>
        <TestComponent></TestComponent>
          </div>
                </div>
          </>
    );
  }
}

export default App;