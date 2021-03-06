import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { FormControl, Button } from 'react-bootstrap';

import AdminTable from './AdminTable';
import { getParticipants, changeReviewed } from '../actions/actions';

class Admin extends Component {
  constructor(props) {
    super(props);

    // bind class functions in constructor so only created once
    this.convertToGrid = this.convertToGrid.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.props.getParticipants();
  }

  handleInputChange(e, i) {
    this.props.changeReviewed({reviewed: e.target.value, idx: i});
  }

  // this function is passed to the AdminTable to tell it how to transform the data to jsx
  // by having the conversion passed to the AdminTable, 
  // it makes the AdminTable more flexible and resuable
  convertToGrid(participant, i) {
    const reviewedStatusClass = (reviewed) => {
      if(reviewed === 'Reviewed -- Accepted') return 'accepted';
      else if (reviewed === 'Reviewed -- Not Accepted') return 'not-accepted';
      return null;
    }
    return ( 
      <tr key={i} className={reviewedStatusClass(this.props.participantState[i].reviewed)}>
        { _.map(participant, (value, key) => {
          if(key === 'reviewed') { 
            return (
              <td key={key + i}>
                <FormControl 
                  name={key + i}
                  componentClass='select'
                  onChange={(e) => this.handleInputChange(e, i)}
                  value={this.props.participantState[i].reviewed} 
                  className={reviewedStatusClass(this.props.participantState[i].reviewed)} >
                  <option value='Not Reviewed'>Not Reviewed</option>
                  <option value='Reviewed -- Accepted'>Reviewed -- Accepted</option>
                  <option value='Reviewed -- Not Accepted'>Reviewed -- Not Accepted</option>
                </FormControl>
              </td>
            );
          }
          return <td key={key + i}>{value}</td>
        })}
      </tr>
    );
  }

  render() {
    return (
      <div className='participants'>
        <AdminTable 
          convertToGrid={this.convertToGrid}
          data={this.props.participantState} />
        <br />
        <Button onClick={() => this.props.push('/')}>Create New Participant</Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getParticipants: () => dispatch(getParticipants()),
    changeReviewed: (payload) => dispatch(changeReviewed(payload))
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
