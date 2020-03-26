import './TestComponent.css';
import React, { Component } from 'react';


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
        searchInput: ''
    };
    this.handleChange = this.handleChange.bind(this);
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


    handleChange(event) {
    // this.setState({value: event.target.value});
       const target = event.target;
       const name = target.name;
       const value = name === 'showInactives'? target.checked : target.value;

     this.setState({
      [name]: value, update: true
    });

  }

  componentDidUpdate(){

         let filteredItems = this.state.allItems.filter(everyTest => {
            let inactiveFilter = ((everyTest[6] === 'inactive') == this.state.showInactives || everyTest[6] !== 'inactive');
            let eventFilter = (everyTest[3] === this.state.selectedEvent) || this.state.selectedEvent === '';
            let textFilter = (everyTest[1].toUpperCase().includes(this.state.searchInput.toUpperCase()) || this.state.searchInput === '')
                return inactiveFilter && eventFilter && textFilter;
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