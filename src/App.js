import React, { Component } from 'react';
import TestComponentToday from "./TestComponentToday";
import TestComponent from "./TestComponent";
import './App.css';
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {nameOfTest: '',
        taggedEvent: '',
        taggedEventDate: '',
        lastTaken: '',
        dueDate: '',
        statusOfTest: '',
        creating: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendInput= this.sendInput.bind(this);
    this.handleTimeChange= this.handleTimeChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

       handleTimeChange(date) {
    this.setState({
      taggedEventDate: date
    })

  }

   handleChange(event) {
    // this.setState({value: event.target.value});
       const target = event.target;
       // const value = target.name === 'showInactives' ? target.checked : target.name === 'creating'? !this.state.creating : target.value;
       // const value = target.name === 'showInactives' ? target.checked : target.name === 'creating'? !this.state.creating : target.value;
       const value = target.name === 'creating'? !this.state.creating : target.value;
       const name = target.name;
     this.setState({
      [name]: value
    });
  }

  sendInput(e) {
        fetch("/sendTest", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
    },
            body: JSON.stringify({
                'name': this.state.nameOfTest,
                'dueDate': '2020-03-26',
                'taggedEvent': this.state.taggedEvent,
                'taggedEventDate': this.state.taggedEventDate,
                'lastTaken': this.state.lastTaken,
                'status': this.state.statusOfTest})
        })
      this.setState({creating: !this.state.creating,
      nameOfTest: '',
      taggedEvent: '',
      taggedEventDate: ''})

  }
  render() {

      const creating = this.state.creating;
    return (
        <>
            <p id="bigHeading">Dashboard</p>
             {creating == false &&
             <button name='creating' onClick={this.handleChange} style={{backgroundColor: "#1c92d2", fontWeight: "bold", margin:"0 auto"}}>Create new test</button>
             }
            {creating != false &&
                <div className='form'>
                    <label style={{fontSize: "1.6rem"}}>Name:</label>
                    <input autoComplete="off" className='inputTestField' name="nameOfTest" type='text' value={this.state.nameOfTest} onChange={this.handleChange}/>
                    {/*<input name="dueDate" type='text' value={this.state.dueDate} onChange={this.handleChange}/>*/}
                    <label style={{fontSize: "1.6rem"}}>Relevant event:</label>
                    <input autoComplete="off" className='inputTestField' name="taggedEvent" type='text' value={this.state.taggedEvent} onChange={this.handleChange}/>

                                            <DatePicker
              selected={ this.state.taggedEventDate }
              onChange={ this.handleTimeChange }
              name="taggedEventDate"
              placeholderText="Click to select a date"
              dateFormat="dd.MM.yyyy"
              autoComplete="off"
          />
            {/*<label style={{fontSize: "1.6rem"}}>Date of event:</label>*/}
            {/*        <input className='inputTestField' name="taggedEventDate" type='text' value={this.state.taggedEventDate}*/}
            {/*               onChange={this.handleChange}/>*/}
                    <button name='creating' onClick={() => {
                        this.sendInput();
                        }} style={{backgroundColor: "#1c92d2", fontWeight: "bold", margin: "0 auto"}}>Done
                    </button>

                </div>
            }

            <div className="testSection">
                <div className="wrapTestsToday">
                    <p className='heading'>What's on for today:</p>
                    <TestComponentToday></TestComponentToday>
                </div>
                <div className="wrapTests">
                    <p className='heading'>All other tests:</p>


                    {/*<TestComponent showInactives={this.state.showInactives}></TestComponent>*/}
                    <TestComponent></TestComponent>
                </div>
            </div>
          </>
    );
  }
}

export default App;