import React from "react";
import DatePicker from "react-datepicker/es";
import './Modal.css'


class CompletedModal extends React.Component{

      constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);

  }

  closeModal(event){
  this.props.controlModal(false);
  }

render() {
    return (
                  <div className="completedModal">
            <i onClick={this.closeModal} className="material-icons cross">close</i>
                      <label style={{ fontSize: "1.6rem" }}>Schedule new due Date:</label>
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

export default CompletedModal;