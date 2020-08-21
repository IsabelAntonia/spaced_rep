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
  }

  closeModal(event){
  this.props.controlCompletedModal(false);
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
          </div>
    )
}
}

export default CompletedModal;