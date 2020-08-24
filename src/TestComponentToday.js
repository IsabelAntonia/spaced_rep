import "./TestComponent.css";
import React from "react";

class TestComponentToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      noTodayQuizes: false,
    };

    this.transformDate = this.transformDate.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidUpdate() {
    if (this.state.items.length === 0 && !this.state.noTodayQuizes) {
      this.setState({
        noTodayQuizes: true,
      });
    }

    if (this.props.refetchCondition) {
      fetch("/testsToday")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.tests,
              noTodayQuizes: false,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  }

  showModal(event) {
    let classNamesArr = event.target.className.split("|");
    let quizName = classNamesArr[0]
    let quizTaggedDate = classNamesArr[1]
    this.props.deliverRelevantQuiz(quizName, quizTaggedDate);
    if (event.target.innerHTML === "Completed") {
      this.props.controlCompletedModal(true);
    } else {
      this.props.controlEditModal(true);
    }
  }

  componentDidMount() {
    fetch("/testsToday")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.tests,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  // for render transforms dueDate to nice Format like '22.04.2020'
  transformDate(str) {
    let parts = str.split("-");
    return parts[2] + "." + parts[1] + "." + parts[0];
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          {this.state.noTodayQuizes && (
            <div
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
              }}
            >
              You are done for today!
            </div>
          )}
          {!this.state.noTodayQuizes && (
            <div>
              {items.map((item, index) => (
                <div className="testContainer active" key={index}>
                  <ul>
                    <li className="testTitle">{item[1]}</li>
                    {item[2] === "" &&(
                        <li>Edit this quiz to reactivate it.</li>
                    )}
                    {item[2] !== "" &&(
                        <li>Due Date: {this.transformDate(item[2])}</li>
                    )}
                    <li>Tagged Event: {item[3]}</li>
                    <li>Tagged Event Date: {item[4]}</li>
                    {item[5] === "never taken" && <li>Last taken: never</li>}
                    {item[5] !== "never taken" && (
                      <li>Last taken: {this.transformDate(item[5])}</li>
                    )}
                  </ul>
                  <button className={`${item[1]}|${item[4]}`} onClick={this.showModal}>
                    Completed
                  </button>
                  <button className={`${item[1]}|${item[4]}`} onClick={this.showModal}>
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      );
    }
  }
}

export default TestComponentToday;
