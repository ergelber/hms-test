import React, { Component } from 'react';
import _ from 'lodash';
import { ControlLabel, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';

import { setInitialState, isANumber } from '../utils/util';

// the form is reusable in that it gets passes all the actions and data it needs and renders it agnostically
// with more time it could be made more flexible by removing the hardcoded values and passing them as props
class Form extends Component {
  constructor(props) {
    super(props);
    // store temporary changes to the form in local state
    this.state = Object.assign({}, setInitialState(this.props.formProps), { formMessage: '' });

    // bind class functions in constructor so only created once
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  getValidationState(formElem, checkForEmpty, checkNum) {
    const formState = this.state[formElem];
    if(checkForEmpty && !formState) return 'empty';
    else if(formElem === 'age') {
      return (isANumber(formState) && formState >= 0 ) ? 'success' : 'error';
    }
    return true;
    
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
    let message = '';
    let isValid = true;
    // final validation to check if any fields are null or invalid
    _.each(this.props.formProps, (propObj) => {
      if(isValid) {
        const containsError = this.getValidationState(propObj.name, true, true);
        if(containsError === 'empty') {
          message = 'All fields must be filled in';
          isValid = false;
        }
        else if(containsError === 'error') {
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
                validationState={( elem.validation.length > 0 && this.state[elem.name] ) ? this.getValidationState(elem.name, null, true) : null} >
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
