import './TestComponent.css';
import React from 'react';

class TestComponentToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

        this.transformDate = this.transformDate.bind(this);
  }

  componentDidUpdate(){

    if (this.props.refetchCondition) {
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

  transformDate(str){
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
   return parts[1] + '.' + months[parts[2]] + '.' + parts[3]
}

  render() {
      // console.log(this.props.refetchCondition)
      // console.log(this.refetchCondition)
    const { error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items.map((item,index) => (
              <div className='testContainer active' key={index} >
                <ul>
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
        </div>
      );
    }
  }
}

export default TestComponentToday;

