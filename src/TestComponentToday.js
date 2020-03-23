import './TestComponent.css';
import React, { Component } from 'react';


class TestComponentToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('/testsToday')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.tests
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items.map((item,index) => (
              <div className='testContainer'key={index} >
            <ul >
              <li className='testTitle'>{item[1]}</li>
              <li>Due Date: {item[2]}</li>
              <li>Tagged Event: {item[3]}</li>
              <li>Tagged Event Date: {item[4]}</li>
              <li>Last taken: {item[5]}</li>
            </ul>
               <button>Reschedule</button>
               <button>Done</button>
                </div>
          ))}
        </div>
      );
    }
  }
}

export default TestComponentToday;

