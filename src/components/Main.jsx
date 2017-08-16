import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { createParticipant } from '../actions/actions';
import Form from './Form';
import { formProps } from '../utils/formProps';

// this main component wraps the form so that the form is a dumb component
// also most likely, there would be other components rendered on the page alongside the form
class Main extends Component {
  render() {
    return (
      <div className='main'>
        <div className='title'>Participant Inclusion Information</div>
        <Button className='admin-button' onClick={() => this.props.push('/admin')}>See participants</Button>
        <Form 
          formProps={formProps}
          participants={this.props.participantState}
          push={this.props.push}
          createParticipant={this.props.createParticipant}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createParticipant: (payload) => dispatch(createParticipant(payload))
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Main);

