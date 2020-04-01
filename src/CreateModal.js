import React from "react";
import DatePicker from "react-datepicker/es";
import "./Modal.css";

class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfTest: "",
      taggedEvent: "",
      taggedEventDate: "",
      lastTaken: "",
      dueDate: "",
      statusOfTest: "",
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postQuiz = this.postQuiz.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value
      this.setState({
          [name]: value
      })

  }

    postQuiz(e) {
    // const dueDate = this.transformCalendarDateToDate(
    //   String(this.state.dueDate)
    // );
    // const taggedEventDate = this.transformCalendarDate(
    //   String(this.state.taggedEventDate)
    // );

    fetch("/sendTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.nameOfTest,
        dueDate: '2020-04-15',
        taggedEvent: this.state.taggedEvent,
        taggedEventDate: '03.04.2020',
        lastTaken: this.state.lastTaken,
        status: this.state.statusOfTest,
      }),
    });
    this.setState({
      nameOfTest: "",
      taggedEvent: "",
      taggedEventDate: "",
      dueDate: ""
    });
    this.props.controlModal(false)
        console.log(this.props.controlModal(false))
    console.log(this.props.triggerRefetch(true))
  }

  closeModal(event) {
    this.props.controlModal(false);
  }

  render() {

    return (
      <div className="completedModal">
        <i onClick={this.closeModal} className="material-icons cross">
          close
        </i>
        {/*  <div className="form">*/}

        <label style={{ fontSize: "1.6rem" }}>Name:</label>
        <input
          autoComplete="off"
          className="inputTestField"
          name="nameOfTest"
          type="text"
          value={this.state.nameOfTest}
          onChange={this.handleChange}
        />

        {/*    <label style={{ fontSize: "1.6rem" }}>Initially due:</label>*/}
        {/*    <DatePicker*/}
        {/*      selected={this.state.dueDate}*/}
        {/*      onChange={this.setDueDate}*/}
        {/*      name="dueDate"*/}
        {/*      placeholderText="Click to select a date"*/}
        {/*      dateFormat="dd.MM.yyyy"*/}
        {/*      autoComplete="off"*/}
        {/*    />*/}
        <label style={{ fontSize: "1.6rem" }}>Relevant event:</label>
        <input
          autoComplete="off"
          className="inputTestField"
          name="taggedEvent"
          type="text"
          value={this.state.taggedEvent}
          onChange={this.handleChange}
        />
        {/*    <label style={{ fontSize: "1.6rem" }}>*/}
        {/*      Date of relevant event:*/}
        {/*    </label>*/}
        {/*    <DatePicker*/}
        {/*      selected={this.state.taggedEventDate}*/}
        {/*      onChange={this.setTaggedEventDate}*/}
        {/*      name="taggedEventDate"*/}
        {/*      placeholderText="Click to select a date"*/}
        {/*      dateFormat="dd.MM.yyyy"*/}
        {/*      autoComplete="off"*/}
        {/*    />*/}
        <button
          onClick={() => {
            this.postQuiz();
          }}
          style={{ margin: "4rem auto 0 auto" }}
        >
          Done
        </button>
        {/*  </div>*/}
        {/*)}*/}
      </div>
    );
  }
}

export default CreateModal;
