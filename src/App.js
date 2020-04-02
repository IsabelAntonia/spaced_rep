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
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.controlRefetch = this.controlRefetch.bind(this);

  }

  controlRefetch(boolean){
    this.setState({
      refetch: boolean
    })
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

    if (this.state.refetch) {
      this.setState({ refetch: false });
    }

  }

  handleChange(event) {
    const target = event.target;
    const name = target.name || target.getAttribute("name");
    const value = name === "creating" ? !this.state.creating : target.value;

    this.setState({
      [name]: value,
    });
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
          <CreateModal triggerRefetch={this.controlRefetch} controlModal={this.closeModal}></CreateModal>}
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
              <TestComponent  controlModal={this.showModal}></TestComponent>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;