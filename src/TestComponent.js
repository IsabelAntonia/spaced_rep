import './TestComponent.css';
import React from 'react';
import DatePicker from "react-datepicker/es";
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
        optionElements: [],
        selectedEvent: '',
        searchInput: '',
        startDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.transformDate = this.transformDate.bind(this);
    this.transformCalendarDate = this.transformCalendarDate.bind(this);
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


  transformDate(str){
      let parts = str.split('-')
      return parts[2] + '.'+ parts[1] + '.'+ parts[0]
}

  transformCalendarDate(str){
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
    Dec: "12"
  };

   let parts = str.split(' ')
   return parts[2] + '.' + months[parts[1]] + '.' + parts[3]
}

  componentDidUpdate(){


         let filteredItems = this.state.allItems.filter(everyTest => {
             let parts = everyTest[2].split(" ");
            let inactiveFilter = ((everyTest[6] === 'inactive') == this.state.showInactives || everyTest[6] !== 'inactive');
            let eventFilter = (everyTest[3] === this.state.selectedEvent) || this.state.selectedEvent === '';
            let textFilter = (everyTest[1].toUpperCase().includes(this.state.searchInput.toUpperCase()) || this.state.searchInput === '')
            let dueDateFilter = (this.transformDate(everyTest[2]) === this.transformCalendarDate(String(this.state.startDate)) || this.state.startDate === '')
                return inactiveFilter && eventFilter && textFilter && dueDateFilter;
      })

      if (filteredItems.length === 0 && this.state.update){
          this.setState({noResults: true})
      }

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
            <input className='textField' type='text' placeholder='Search for title' name="searchInput" type='text' value={this.state.searchInput} onChange={this.handleChange}/>
            {/*   <input className='textField' type='text' name="selectedDue" type='text' value={this.state.selectedDue} onChange={this.handleChange}/>*/}
            {/*<label style={{fontSize: "1.6rem"}}>Due Date</label>*/}
                        <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleTimeChange }
              name="startDate"
              placeholderText="Click to select a date"
              dateFormat="dd.MM.yyyy"
          />

               </div>
          {items.map((item,index) => (
              <div className={`testContainer${item[6] === 'inactive' ? ' greyd' : ' active'}`} key={index} >
                <ul >
                  <li className='testTitle'>{item[1]}</li>
                  <li>Due Date: {this.transformDate(item[2])}</li>
                  <li>Tagged Event: {item[3]}</li>
                  <li>Tagged Event Date: {item[4]}</li>
                  <li>Last taken: {item[5]}</li>
                </ul>
                <button>Done</button>
                <button>Edit</button>
              </div>
          ))}

          <div>{this.state.noResults ? 'No results' : ''}</div>
        </div>
      );
    }
  }
}

export default TestComponent;