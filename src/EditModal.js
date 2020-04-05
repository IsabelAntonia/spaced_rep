import React from "react";
import DatePicker from "react-datepicker/es";
import './Modal.css'


class EditModal extends React.Component{

      constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);

  }

  closeModal(event){
  this.props.controlEditModal(false);
  }

render() {
    return (
                  <div className="modal">
            <i onClick={this.closeModal} className="material-icons cross">close</i>
                      <label style={{ fontSize: "1.6rem" }}>Deactivate this quiz</label>
                      <label style={{ fontSize: "1.6rem" }}>Quizzes are deactivated if they have no future due date</label>

              {/*            <DatePicker*/}
              {/*  selected={this.state.dueDate}*/}
              {/*  onChange={this.setDueDate}*/}
              {/*  name="dueDate"*/}
              {/*  placeholderText="Click to select a date"*/}
              {/*  dateFormat="dd.MM.yyyy"*/}
              {/*  autoComplete="off"*/}
              {/*/>*/}
          </div>
    )
}
}

export default EditModal;