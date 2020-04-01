import React, { Component } from 'react';
import TestComponentToday from "./TestComponentToday";
import TestComponent from "./TestComponent";
import CompletedModal from "./CompletedModal"
import './App.css';
import CreateModal from './CreateModal'
import "react-datepicker/dist/react-datepicker.css";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
      refetch: false,
      completed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setTaggedEventDate = this.setTaggedEventDate.bind(this);
    this.transformCalendarDate = this.transformCalendarDate.bind(this);
    this.transformCalendarDateToDate = this.transformCalendarDateToDate.bind(
      this
    );
    this.setDueDate = this.setDueDate.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.controlRefetch = this.controlRefetch.bind(this);

  }

  controlRefetch(boolean){
    this.setState({
      refetch: boolean
    })
  }

  // in all modals user picks a due date from calendar
  setDueDate(date) {
    this.setState({
      dueDate: date,
    });
  }

  // in edit and create new quiz modals user picks a taggedEventDate from calendar
  setTaggedEventDate(date) {
    this.setState({
      taggedEventDate: date,
    });
  }

  // on TestComponent
  showModal(boolean) {
    this.setState({
      completed: boolean,
    });
  }

  // onClick at cross in modal
  closeModal(boolean) {
    this.setState({
      completed: boolean, creating: boolean
    });
  }

  // after i fetched again component did update and i want to set triggerRefetch back to false
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.triggerRefetch) this.setState({ triggerRefetch: false });
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name || target.getAttribute("name");
    const value = name === "creating" ? !this.state.creating : target.value;

    this.setState({
      [name]: value,
    });
  }

  // tranforms dueDate selected in calendar to Date Format for db like '2020-03-24' work then this.sendInout
  transformCalendarDateToDate(str) {
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
      Dec: "12",
    };

    let parts = str.split(" ");
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
  }

  // transforms taggedEventDate selected in calendar to String like '24.03.2020'
  transformCalendarDate(str) {
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
      Dec: "12",
    };

    let parts = str.split(" ");
    return parts[2] + "." + months[parts[1]] + "." + parts[3];
  }


  render() {

    const creating = this.state.creating;
    return (
      <>
          {/*completedModal*/}
        {this.state.completed && (
            <CompletedModal controlModal={this.closeModal}/>
        )}
        {/*background of modal*/}
        <div
          className={this.state.completed ? "blurred" : null}
          id="background"
        >
          <div className="header">
            <p id="bigHeading">Dashboard</p>
            <p>
              Create quizes and schedule them with the help of our algorithm.
              Introduce time intervalls between your study sessions to{" "}
              <span style={{ color: "#f44292" }}>
                {" "}
                remember more and study less.
              </span>
            </p>
            {creating == false && (
              <button
                name="creating"
                onClick={this.handleChange}
                style={{ transform: "scale(1.2)", marginTop: "4rem" }}
              >
                Create new quiz
              </button>
            )}
          </div>
            {/*create new quiz modal*/}
          {creating &&
          <CreateModal controlModal={this.closeModal}></CreateModal>}
          {/*TestSection*/}
          <div className="testSection">
            <div className="wrapTestsToday">
              <p className="heading">Scheduled for today:</p>
              <TestComponentToday
                refetchCondition={this.state.refetch}
              ></TestComponentToday>
            </div>
            <div className="wrapTests">
              <p className="heading">All quizes:</p>
              {/*TestComponent constrolls show of CompletedModal; CompletedModal controlls close*/}
              <TestComponent triggerRefetch={this.controlRefetch} controlModal={this.showModal}></TestComponent>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;