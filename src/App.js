import React, { Component } from "react";
import TestComponentToday from "./TestComponentToday";
import TestComponent from "./TestComponent";
import CompletedModal from "./CompletedModal";
import EditModal from "./EditModal";
import "./App.css";
import CreateModal from "./CreateModal";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
      refetch: false,
      completed: false,
      edit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.showCompletedModal = this.showCompletedModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.controlRefetch = this.controlRefetch.bind(this);
  }

  controlRefetch(boolean) {
    this.setState({
      refetch: boolean,
    });
  }

  // on TestComponent
  showCompletedModal(boolean) {
    this.setState({
      completed: boolean,
    });
  }

  showEditModal(boolean) {
    this.setState({
      edit: boolean,
    });
  }

  // onClick at cross in modal
  closeModal(boolean) {
    this.setState({
      completed: boolean,
      creating: boolean,
      edit: boolean
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
          <CompletedModal controlCompletedModal={this.closeModal} />
        )}
        {/*editModal*/}
        {this.state.edit && (
          <EditModal controlEditModal={this.closeModal} />
        )}
        {/*create new quiz modal*/}
        {creating && (
          <CreateModal
            triggerRefetch={this.controlRefetch}
            controlModal={this.closeModal}
          ></CreateModal>
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
            {!creating && (
              <button
                name="creating"
                onClick={this.handleChange}
                style={{ transform: "scale(1.2)", marginTop: "4rem" }}
              >
                Create new quiz
              </button>
            )}
          </div>
          {/*TestSection*/}
          <div className="testSection">
            <>
              <div className="wrapTestsToday">
                <p className="heading">Scheduled for today:</p>
                <TestComponentToday
                  refetchCondition={this.state.refetch}
                  controlCompletedModal={this.showCompletedModal}
                  controlEditModal={this.showEditModal}
                ></TestComponentToday>
              </div>
              <div className="wrapTests">
                <span className="heading">Your quiz collection:</span>{" "}
                <span>
                  Shows you all your future and past quizzes except those
                  scheduled for today.
                </span>
                {/*TestComponent constrols show of CompletedModal; CompletedModal controlls close*/}
                <TestComponent
                  refetchCondition={this.state.refetch}
                  controlCompletedModal={this.showCompletedModal}
                  controlEditModal={this.showEditModal}
                ></TestComponent>
              </div>
            </>
          </div>
        </div>
      </>
    );
  }
}

export default App;
