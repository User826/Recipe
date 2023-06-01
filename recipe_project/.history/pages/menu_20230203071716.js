import React from 'react';

class Form extends React.Component {
    state = {
      formData: {}
    };
  
    componentDidMount() {
      // Retrieve the form data from local storage when the component is first mounted
      const storedFormData = localStorage.getItem('formData');
      if (storedFormData) {
        this.setState({ formData: JSON.parse(storedFormData) });
      }
    }
  
    handleRadioChange = (event) => {
      this.setState({
        formData: {
          ...this.state.formData,
          [event.target.name]: event.target.value
        }
      });
    };
  
    handleFormSubmit = (event) => {
      event.preventDefault();
      localStorage.setItem('formData', JSON.stringify(this.state.formData));
    };
  
    render() {
      return (
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="radio"
            name="option1"
            value="value1"
            checked={this.state.formData.option1 === 'value1'}
            onChange={this.handleRadioChange}
          />
          Option 1
          <input
            type="radio"
            name="option1"
            value="value2"
            checked={this.state.formData.option1 === 'value2'}
            onChange={this.handleRadioChange}
          />
          Option 2
          <br />
          <input
            type="radio"
            name="option2"
            value="value3"
            checked={this.state.formData.option2 === 'value3'}
            onChange={this.handleRadioChange}
          />
          Option 3
          <input
            type="radio"
            name="option2"
            value="value4"
            checked={this.state.formData.option2 === 'value4'}
            onChange={this.handleRadioChange}
          />
          Option 4
          <br />
          <button type="submit">Submit</button>
        </form>
      );
    }
  }