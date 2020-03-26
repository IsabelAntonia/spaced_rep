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
        update: false
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
       const value = target.checked;
       const name = target.name;
     this.setState({
      [name]: value, update: true
    });

  }

  componentDidUpdate(){
         let filteredItems = this.state.allItems.filter(everyTest => {
            let inactiveFilter = ((everyTest[6] === 'inactive') == this.state.showInactives || everyTest[6] !== 'inactive');
                return inactiveFilter;
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
      return (
        <div>
           {/*<div>Inactive tests should be {this.props.showInactives ? 'shown' : 'not shown'}</div>*/}
           <input name='showInactives' checked={this.state.showInactives} type="checkbox" onChange={this.handleChange}/>
           <label style={{fontSize: "1.6rem"}}>Show inactive tests:</label>
            <div>show{this.state.showInactives ? ' inactive tests' : ' only active tests'}</div>
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