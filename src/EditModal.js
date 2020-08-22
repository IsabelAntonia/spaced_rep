import React from "react";
import DatePicker from "react-datepicker/es";
import "./Modal.css";

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  confirmDelete(event) {
    this.setState({
      confirmDelete: true,
    });
  }

  goBack() {
    this.setState({
      confirmDelete: false,
    });
  }

  delete(event) {
    let quizName = this.props.relevantQuiz;
    let url = "/deleteQuiz/" + quizName;
    fetch(url, {
      method: "DELETE",
    });
    this.props.triggerRefetch(true);
    this.props.controlEditModal(false);
  }

  closeModal(event) {
    this.props.controlEditModal(false);
  }

  render() {
    return (
      <div className="modal">
        {!this.state.confirmDelete && (
          <>
            <i onClick={this.closeModal} className="material-icons cross">
              close
            </i>
            <label style={{ fontSize: "1.6rem" }}>Deactivate this quiz</label>
            <label style={{ fontSize: "1.6rem" }}>
              Quizzes are deactivated if they have no future due date
            </label>
            <label style={{ fontSize: "1.6rem" }}>
              Delete this quiz. Attention!
            </label>
            <button onClick={this.confirmDelete}>Delete</button>
          </>
        )}
        {this.state.confirmDelete && (
          <>
            <i onClick={this.closeModal} className="material-icons cross">
              close
            </i>
            <label style={{ fontSize: "1.6rem" }}>
              Attention: With this action you will permanently delete a quiz. We
              won't be able to restore this item.
            </label>
            <button onClick={this.delete}>Delete</button>
            <label style={{ fontSize: "1.6rem" }}></label>
            <button onClick={this.goBack}>Cancel</button>
          </>
        )}

        {/*            <DatePicker*/}
        {/*  selected={this.state.dueDate}*/}
        {/*  onChange={this.setDueDate}*/}
        {/*  name="dueDate"*/}
        {/*  placeholderText="Click to select a date"*/}
        {/*  dateFormat="dd.MM.yyyy"*/}
        {/*  autoComplete="off"*/}
        {/*/>*/}
      </div>
    );
  }
}

export default EditModal;
