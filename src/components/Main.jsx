import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import Form from './Form';

// hardcoded the formProps for the exercise but should be coming from a db
const formProps = [
  {
    name: 'name',
    type: 'input',
    validation: []
  },
  {
    name: 'age',
    type: 'input',
    validation: ['integer']
  },
  {
    name: 'siblings',
    type: 'select',
    options: ['yes', 'no'],
    validation: []
  },
  {
    name: 'environmentalExposures',
    type: 'input',
    validation: []
  },
  {
    name: 'geneticMutations',
    type: 'input',
    validation: []
  }
]

// this main component wraps the form so that the form is a dumb component
// also most likely, there would be other components rendered on the page alongside the form
class Main extends React.Component {
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Main);

