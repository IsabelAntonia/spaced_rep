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
        creating: false,
        triggerRefetch: false
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

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.state.triggerRefetch)
      this.setState({triggerRefetch: false})
  }

    handleChange(event) {
    // this.setState({value: event.target.value});
       const target = event.target;
       var name;
       if (target.getAttribute('name') === 'cross'){
           name = 'creating'
       }
       else {
           name = target.name
       }

       // const value = target.name === 'showInactives' ? target.checked : target.name === 'creating'? !this.state.creating : target.value;
       // const value = target.name === 'showInactives' ? target.checked : target.name === 'creating'? !this.state.creating : target.value;
       const value = name === 'creating'? !this.state.creating : target.value;
       console.log(value)

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
      taggedEventDate: '',
      triggerRefetch: true})

  }
  render() {

      const creating = this.state.creating;
    return (
        <>
            <div className='header'>
            <p id="bigHeading">Dashboard</p>
                <p>Create quizes and schedule them with the help of our algorithm. Introduce time intervalls between your study sessions to <span style={{color: '#f44292'}}> remember more and study less.</span></p>
             {creating == false &&
             <button name='creating' onClick={this.handleChange} style={{transform: 'scale(1.2)', marginTop: '4rem'}}>Create new quiz</button>
             }
             </div>
            {creating != false &&
                <div className='form'>
                    <div onClick={this.handleChange}  name='cross'> <i name='cross' onClick={this.handleChange} className="material-icons cross">close</i></div>

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
                        }} style={{margin: "4rem auto 0 auto"}}>Done
                    </button>

                </div>
            }

            <div className="testSection">
                <div className="wrapTestsToday">
                    <p className='heading'>Scheduled for today:</p>
                    <TestComponentToday refetchCondition={this.state.triggerRefetch}></TestComponentToday>
                </div>
                <div className="wrapTests">
                    <p className='heading'>All quizes:</p>


                    {/*<TestComponent showInactives={this.state.showInactives}></TestComponent>*/}
                    <TestComponent></TestComponent>
                </div>
            </div>
          </>
    );
  }
}

export default App;