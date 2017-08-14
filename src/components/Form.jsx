import React from 'react';
import _ from 'lodash';
import { ControlLabel, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';

// set all state props passed in to empty string to make compatible with form
// except formMessage which is not in the form
const setInitialState = (formProps, message) => {
  const initialState = _.reduce(formProps, function(result, elem) {
    result[elem.name] = '';
    return result;
  }, {});
  initialState.formMessage = message;
  return initialState;
}

// the form is reusable in that it gets passes all the actions and data it needs and renders it agnostically
// with more time it could be made more flexible by removing the hardcoded values and passing them as props
class Form extends React.Component {
  constructor(props) {
    super(props);
    // store temporary changes to the form in local state
    this.state = setInitialState(this.props.formProps);

    // bind class functions in constructor so only created once
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  getValidationState(formElem) {
    const formState = this.state[formElem.name];
    // check if form property requires validation
    if(formElem.validation.length === 0 || formState === '') return null;
    // check if form property is an integer
    const validationState = isNaN(parseInt(formState, 10)) || formState < 0 ? 'error' : 'success';
    return validationState;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  submitForm(e) {
    e.preventDefault();
    const self = this;
    let message = '';
    let isValid = true;
    // final validation to check if any fields are null or invalid
    _.each(self.props.formProps, (propObj) => {
      if(isValid !== false) {
        if(self.state[propObj.name] === ''){
          message = 'All fields must be filled in';
          isValid = false;
        } 
        else if(propObj.validation.length !== 0 && self.getValidationState(propObj) === 'error') {
          message = 'Age must be a positive integer';
          isValid = false;
        }
      }
    });
    if(isValid) {
      const newUser = _.omit(this.state, ['formMessage']);
      newUser.reviewed = 'Not Reviewed';
      // action to add new participant 
      this.props.createParticipant(newUser);
      // reset state
      const refreshedState = setInitialState(this.props.formProps, message);
      this.setState(refreshedState);
      // redirect to admin page (table of participants)
      this.props.push('/admin');
    } else {
      this.setState({formMessage: message});
    }
  }

  render() {
    const { formProps } = this.props;
    return (
      <div>
        <div className='form-error'>{ this.state.formMessage }</div> 
        <form>
          { _.map(formProps, (elem) => {
            // add a placeholder/default value for the dropdown/select
            if(elem.type === 'select' && elem.options[0] !== '') elem.options.unshift('');

            return (
              <FormGroup 
                key={elem.name}
                controlId={elem.name}
                validationState={this.getValidationState(elem) } >
                <ControlLabel>{_.startCase(elem.name)}</ControlLabel>
                <FormControl 
                  id={elem.name}
                  name={elem.name}
                  componentClass={elem.type}
                  onChange={this.handleInputChange}
                  value={this.state[elem.name]} >
                    {
                      elem.type === 'select' ? _.map(elem.options, (optText) => {
                        return <option key={optText} onChange={this.handleInputChange}>{optText}</option>
                      }) : null 
                    }
                </FormControl>
                <FormControl.Feedback /> 
                { elem.validation.length > 0 ? <HelpBlock>{`Input must be a positive number`}</HelpBlock> : null }
              </FormGroup>
            );
          })}
          <Button type="submit" onClick={this.submitForm}>Submit</Button>
        </form>
      </div>
    );
  }
}

export default Form;
