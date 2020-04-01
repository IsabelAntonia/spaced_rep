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
        triggerRefetch: false,
        completed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendInput= this.sendInput.bind(this);
    this.setTaggedEventDate= this.setTaggedEventDate.bind(this);
    this.transformCalendarDate= this.transformCalendarDate.bind(this);
    this.transformCalendarDateToDate= this.transformCalendarDateToDate.bind(this);
    this.setDueDate= this.setDueDate.bind(this);
    this.showModal= this.showModal.bind(this);
    this.closeModal= this.closeModal.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

       setTaggedEventDate(date) {
    this.setState({
      taggedEventDate: date
    })

  }

  showModal(boolean){
      this.setState({
          completed: boolean
      })
  }

  closeModal(event){

      this.setState({
          completed: false
      })
  }

       setDueDate(date) {
    this.setState({
      dueDate: date
    })

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.state.triggerRefetch)
      this.setState({triggerRefetch: false})
  }

    handleChange(event) {

       const target = event.target;
       const name = target.name || target.getAttribute('name')
       const value = name === 'creating'? !this.state.creating : target.value;

     this.setState({
      [name]: value
    });
  }

  // tranforms dueDate selected in calendar to Date Format for db like '2020-03-24' work then this.sendInout
    transformCalendarDateToDate(str){
     let months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  };

   let parts = str.split(' ')
   return parts[3] + '-' + months[parts[1]] + '-' + parts[2]
}

// transforms taggedEventDate selected in calendar to String like '24.03.2020'
  transformCalendarDate(str){
     let months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  };

   let parts = str.split(' ')
   return parts[2] + '.' + months[parts[1]] + '.' + parts[3]
}

  sendInput(e) {

      const dueDate = this.transformCalendarDateToDate(String(this.state.dueDate))
      const taggedEventDate = this.transformCalendarDate(String(this.state.taggedEventDate))

        fetch("/sendTest", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
    },
            body: JSON.stringify({
                'name': this.state.nameOfTest,
                'dueDate': dueDate,
                'taggedEvent': this.state.taggedEvent,
                'taggedEventDate': taggedEventDate,
                'lastTaken': this.state.lastTaken,
                'status': this.state.statusOfTest})
        })
      this.setState({creating: !this.state.creating,
      nameOfTest: '',
      taggedEvent: '',
      taggedEventDate: '',
          dueDate: '',
      triggerRefetch: true})

  }
  render() {

      const creating = this.state.creating;
    return (
        <>
                 {this.state.completed &&
            <div className='completedModal'>Set to inactive or schedule new due date
                 <i onClick={this.closeModal} className="material-icons">close</i>
            </div>}
            <div className={this.state.completed? 'blurred': null} id='background'>
            <div className='header'>
            <p id="bigHeading">Dashboard</p>
                <p>Create quizes and schedule them with the help of our algorithm. Introduce time intervalls between your study sessions to <span style={{color: '#f44292'}}> remember more and study less.</span></p>
             {creating == false &&
             <button name='creating' onClick={this.handleChange} style={{transform: 'scale(1.2)', marginTop: '4rem'}}>Create new quiz</button>
             }
             </div>
            {creating &&
                <div className='form'>
                    <i name='creating' onClick={this.handleChange} className="material-icons cross">close</i>

                    <label style={{fontSize: "1.6rem"}}>Name:</label>
                    <input autoComplete="off" className='inputTestField' name="nameOfTest" type='text' value={this.state.nameOfTest} onChange={this.handleChange}/>
                    <label style={{fontSize: "1.6rem"}}>Initially due:</label>
                    <DatePicker
                           selected={ this.state.dueDate }
                           onChange={ this.setDueDate }
                           name="dueDate"
                           placeholderText="Click to select a date"
                           dateFormat="dd.MM.yyyy"
                           autoComplete="off"/>
                    <label style={{fontSize: "1.6rem"}}>Relevant event:</label>
                    <input autoComplete="off" className='inputTestField' name="taggedEvent" type='text' value={this.state.taggedEvent} onChange={this.handleChange}/>
                    <label style={{fontSize: "1.6rem"}}>Date of relevant event:</label>
                    <DatePicker
                           selected={ this.state.taggedEventDate }
                           onChange={ this.setTaggedEventDate }
                           name="taggedEventDate"
                           placeholderText="Click to select a date"
                           dateFormat="dd.MM.yyyy"
                           autoComplete="off"/>
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
                    <TestComponent controlModal={this.showModal} ></TestComponent>
                </div>
            </div>
                </div>
          </>
    );
  }
}

export default App;