import './TestComponent.css';
import React from 'react';
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
//import 'bootstrap/dist/css/bootstrap.min.css';


class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
        allItems: [],
      showInactives: true,
        noResults: false,
        update: false,
        optionElements: ['Mathe1 Klausur', 'Gdp Klausur'],
        selectedEvent: '',
        searchInput: '',
        startDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    fetch('/tests')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.tests,
              allItems: result.tests
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

     handleTimeChange(date) {
    this.setState({
      startDate: date, update: true
    })

  }


    handleChange(event) {
    // this.setState({value: event.target.value});
       const target = event.target;
       const name = target.name;
       const value = name === 'showInactives' ? target.checked : target.value;

     this.setState({
      [name]: value, update: true
    });

  }

  componentDidUpdate(){

      console.log(this.state.startDate)


         let filteredItems = this.state.allItems.filter(everyTest => {
   console.log(everyTest[2])
            let inactiveFilter = ((everyTest[6] === 'inactive') == this.state.showInactives || everyTest[6] !== 'inactive');
            let eventFilter = (everyTest[3] === this.state.selectedEvent) || this.state.selectedEvent === '';
            let textFilter = (everyTest[1].toUpperCase().includes(this.state.searchInput.toUpperCase()) || this.state.searchInput === '')
            let dueDateFilter = (everyTest[2].slice(0,16) === this.state.startDate || this.state.startDate === '')
                return inactiveFilter && eventFilter && textFilter && dueDateFilter;
      })

        if (this.state.update){
            this.setState({items: filteredItems, update: false})
}
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        let optionElements = []
        this.state.allItems.forEach(item => {
            if (!optionElements.includes(item[3])) {
                optionElements.push(item[3])
            }
        })
      return (
        <div>
           {/*<div>Inactive tests should be {this.props.showInactives ? 'shown' : 'not shown'}</div>*/}
           <div className='filter'>
           <input name='showInactives' checked={this.state.showInactives} type="checkbox" onChange={this.handleChange}/>
           <label style={{fontSize: "1.6rem"}}>Show inactive tests:</label>
            <select name='selectedEvent' value={this.state.selectedEvent} onChange={this.handleChange}>
                 <option value=''></option>
                {optionElements.map((option,index) =>(
                    <option value={option} key={index}>{option}</option>
                ))}
            </select>
            <label style={{fontSize: "1.6rem"}}>Tagged event</label>
            <input className='textField' type='text' name="searchInput" type='text' value={this.state.searchInput} onChange={this.handleChange}/>
            <label style={{fontSize: "1.6rem"}}>Name Search</label>
            {/*   <input className='textField' type='text' name="selectedDue" type='text' value={this.state.selectedDue} onChange={this.handleChange}/>*/}
            {/*<label style={{fontSize: "1.6rem"}}>Due Date</label>*/}
                        <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleTimeChange }
              name="startDate"
              placeholderText="Click to select a date"
              dateFormat="MM/dd/yyyy"
          />

               </div>
          {items.map((item,index) => (
              <div className={`testContainer${item[6] === 'inactive' ? ' greyd' : ' active'}`} key={index} >
                <ul >
                  <li className='testTitle'>{item[1]}</li>
                  <li>Due Date: {item[2].slice(0,16)}</li>
                  <li>Tagged Event: {item[3]}</li>
                  <li>Tagged Event Date: {item[4]}</li>
                  <li>Last taken: {item[5]}</li>
                </ul>
                <button>Reschedule</button>
                <button>Done</button>
                <button>Edit</button>
              </div>
          ))}
        </div>
      );
    }
  }
}

export default TestComponent;