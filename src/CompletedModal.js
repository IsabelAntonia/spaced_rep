import React from "react";
import DatePicker from "react-datepicker/es";
import './Modal.css'


class CompletedModal extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        dueDate : '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.setDueDate = this.setDueDate.bind(this);
    this.updateQuiz = this.updateQuiz.bind(this);
    this.transformCalendarDateToDate = this.transformCalendarDateToDate.bind(this);
  }
  setDueDate(date) {
    this.setState({
      dueDate: date,
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

  closeModal(event){
    this.props.controlCompletedModal(false);
  }

    updateQuiz(e) {
      const dueDate = this.transformCalendarDateToDate(String(this.state.dueDate));
      fetch("/updateQuiz", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: this.props.relevantQuiz,
            dueDate: dueDate,
          //lastTaken: this.state.lastTaken,
          //status: this.state.statusOfTest,
        }),
      });

      this.setState({
        dueDate: "",
      });

      this.props.controlCompletedModal(false);
      this.props.triggerRefetch(true);
    }

render() {
    return (
            <div className="modal">
            <i onClick={this.closeModal} className="material-icons cross">close</i>
                <label style={{ fontSize: "1.6rem" }}>Manually schedule new due Date:</label>
            <DatePicker
            selected={this.state.dueDate}
            onChange={this.setDueDate}
            name="dueDate"
            placeholderText="Click to select a date"
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
            />

            <label style={{ fontSize: "1.6rem" }}>Quizzes are deactivated if they have no future due date.</label>
                <button
          onClick={this.updateQuiz}
          style={{ margin: "4rem auto 0 auto" }}
        >
          Done
        </button>
          </div>
    )
}
}

export default CompletedModal;