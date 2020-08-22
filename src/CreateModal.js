import React from "react";
import DatePicker from "react-datepicker/es";
import "./Modal.css";

class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfTest: "",
      taggedEvent: "no tagged event",
      taggedEventDate: "no tagged event date",
      lastTaken: "never taken",
      dueDate: "",
      statusOfTest: "due",
      validInput: true,
      noDueDate: false,
      noName: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postQuiz = this.postQuiz.bind(this);
    this.transformCalendarDate = this.transformCalendarDate.bind(this);
    this.transformCalendarDateToDate = this.transformCalendarDateToDate.bind(
      this
    );
    this.setTaggedEventDate = this.setTaggedEventDate.bind(this);
    this.setDueDate = this.setDueDate.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
  }

  verifyInput() {
    let noName = false;
    let noDueDate = false;

    if (this.state.dueDate === "") {
      noDueDate = true;
      this.setState({
        noDueDate: true,
      });
    }

    if (this.state.nameOfTest === "") {
      noName = true;
      this.setState({
        noName: true,
      });
    }

    if (noName || noDueDate) {
      return false;
    } else {
      return true;
    }
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  // tranforms dueDate selected in calendar to Date Format for db like '2020-03-24' work then this.postQuiz
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

  postQuiz(e) {
    const validInput = this.verifyInput();
    if (validInput) {
      const dueDate = this.transformCalendarDateToDate(
        String(this.state.dueDate)
      );

      let taggedEventDate = this.state.taggedEventDate;
      // only transform taggedEventDate if a date was selected
      if (this.state.taggedEventDate !== "no tagged event date") {
        // a date was selected in calendar
        taggedEventDate = this.transformCalendarDate(
          String(this.state.taggedEventDate)
        );
      }

      fetch("/postQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.nameOfTest,
          dueDate: dueDate,
          taggedEvent: this.state.taggedEvent,
          taggedEventDate: taggedEventDate,
          lastTaken: this.state.lastTaken,
          status: this.state.statusOfTest,
        }),
      });

      this.setState({
        nameOfTest: "",
        taggedEvent: "no tagged event",
        taggedEventDate: "no tagged event date",
        dueDate: "",
      });

      this.props.controlModal(false);
      this.props.triggerRefetch(true);
    } else {
      this.setState({
        validInput: false,
      });
    }
  }

  // if input is valid proceed else return error message

  closeModal(event) {
    this.props.controlModal(false);
  }

  render() {
    return (
      <div className="modal">
        <i onClick={this.closeModal} className="material-icons cross">
          close
        </i>
        <label style={{ fontSize: "1.6rem" }}>Name:</label>
        {this.state.noName && <span style={{ color: "red" }}>Required</span>}
        <input
          autoComplete="off"
          className="inputTestField"
          name="nameOfTest"
          type="text"
          value={this.state.nameOfTest}
          onChange={this.handleChange}
        />
        <label style={{ fontSize: "1.6rem" }}>Initially due:</label>
        {this.state.noDueDate && <span style={{ color: "red" }}>Required</span>}
        <DatePicker
          selected={this.state.dueDate}
          onChange={this.setDueDate}
          name="dueDate"
          placeholderText="Click to select a date"
          dateFormat="dd.MM.yyyy"
          autoComplete="off"
        />
        <div>Optional:</div>
        <label style={{ fontSize: "1.6rem" }}>Relevant event:</label>
        <input
          autoComplete="off"
          className="inputTestField"
          name="taggedEvent"
          type="text"
          value={""}
          onChange={this.handleChange}
        />
        <label style={{ fontSize: "1.6rem" }}>Date of relevant event:</label>
        <DatePicker
          // selected={this.state.taggedEventDate}
          selected={""}
          onChange={this.setTaggedEventDate}
          name="taggedEventDate"
          placeholderText="Click to select a date"
          dateFormat="dd.MM.yyyy"
          autoComplete="off"
        />
        <button onClick={this.postQuiz} style={{ margin: "4rem auto 0 auto" }}>
          Done
        </button>
        {!this.state.validInput && (
          <div style={{ color: "red" }}>
            Please fill out the required fields.
          </div>
        )}
      </div>
    );
  }
}

export default CreateModal;
