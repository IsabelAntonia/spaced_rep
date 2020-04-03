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
                    <li>Due Date: {this.transformDate(item[2])}</li>
                    <li>Tagged Event: {item[3]}</li>
                    <li>Tagged Event Date: {item[4]}</li>
                    <li>Last taken: {item[5]}</li>
                  </ul>
                  <button>Completed</button>
                  <button>Edit</button>
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
