import React from "react";
import DatePicker from "react-datepicker/es";
import "./Modal.css";

class CompletedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: "",
      calendarDate: "",
      selectedOption: "",
      statusOfTest: "due",
    };
    this.closeModal = this.closeModal.bind(this);
    this.setDueDateFromCalendar = this.setDueDateFromCalendar.bind(this);
    this.updateQuiz = this.updateQuiz.bind(this);
    this.transformCalendarDateToDate = this.transformCalendarDateToDate.bind(
      this
    );
    this.JSDateToDate = this.JSDateToDate.bind(this);
    this.setDueDateTmr = this.setDueDateTmr.bind(this);
    this.setDueDateTwo = this.setDueDateTwo.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.deactivate = this.deactivate.bind(this);
  }
  setDueDateTmr() {
    const today = new Date();
    let tmr = new Date(today);
    tmr.setDate(today.getDate() + 1);
    this.setState({
      dueDate: this.transformCalendarDateToDate(String(tmr)),
    });
  }

  setDueDateTwo() {
    const today = new Date();
    let inTwoDays = new Date(today);
    inTwoDays.setDate(today.getDate() + 3);
    this.setState({
      dueDate: this.transformCalendarDateToDate(String(inTwoDays)),
    });
  }

  setDueDateFromCalendar(date) {
    this.setState({
      calendarDate: date,
      dueDate: this.transformCalendarDateToDate(String(date)),
    });
  }
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

  deactivate() {
    this.setState({
      dueDate: "",
      statusOfTest: "inactive",
    });
  }

  JSDateToDate() {
    let d = this.transformCalendarDateToDate(String(new Date()));
    return d;
  }

  closeModal(event) {
    this.props.controlCompletedModal(false);
  }

  handleOptionChange(event) {
    let option = event.target.value;
    this.setState({
      selectedOption: option,
    });
    if (option === "tmr") {
      this.setDueDateTmr();
    } else if (option === "two") {
      this.setDueDateTwo();
    } else if (option === "deactivate") {
      this.deactivate();
    }
  }

  updateQuiz(e) {

    if (this.state.selectedOption === "manually" && this.state.dueDate === "") {
      console.log("Please select a date in the calendar.");
    }

    else if (this.state.selectedOption === ""){
      console.log("Please choose an action.")
    }
    else {
      const lastTaken = this.JSDateToDate();
      fetch("/updateQuiz", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.props.relevantQuiz,
          dueDate: this.state.dueDate,
          lastTaken: lastTaken,
          status: this.state.statusOfTest,
        }),
      });

      // this.setState({
      //   dueDate: "",
      // });

      this.props.controlCompletedModal(false);
      this.props.triggerRefetch(true);
    }
  }

  render() {
    return (
      <div className="modal">
        <i onClick={this.closeModal} className="material-icons cross">
          close
        </i>
        <label style={{ fontSize: "1.6rem" }}>
          <input
            checked={this.state.selectedOption === "tmr"}
            value="tmr"
            type="radio"
            onChange={this.handleOptionChange}
          />
          Tomorrow
        </label>
        <label style={{ fontSize: "1.6rem" }}>
          <input
            checked={this.state.selectedOption === "two"}
            value="two"
            type="radio"
            onChange={this.handleOptionChange}
          />
          Two days from now
        </label>
        <label style={{ fontSize: "1.6rem" }}>
          <input
            checked={this.state.selectedOption === "manually"}
            value="manually"
            type="radio"
            onChange={this.handleOptionChange}
          />
          Manually schedule new due Date
        </label>
        {this.state.selectedOption === "manually" && (
          <DatePicker
            selected={this.state.calendarDate}
            onChange={this.setDueDateFromCalendar}
            name="dueDate"
            placeholderText="Click to select a date"
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
          />
        )}
        <label style={{ fontSize: "1.6rem" }}>
          <input
            checked={this.state.selectedOption === "deactivate"}
            value="deactivate"
            type="radio"
            onChange={this.handleOptionChange}
          />
          Deactivate this quiz
        </label>
        <button
          onClick={this.updateQuiz}
          style={{ margin: "4rem auto 0 auto" }}
        >
          Done
        </button>
      </div>
    );
  }
}

export default CompletedModal;
