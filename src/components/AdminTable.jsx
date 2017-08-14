import React from 'react';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

// Admin table is a reusable and flexible table and a dumb component
// You only need to pass data in the form of an array of objects
// and a conversion (convertToGrid) to tell the table how to transform the data to jsx
class AdminTable extends React.Component {
  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            {_.map(this.props.data[0], (value, key) => {
              return <td key={key}>{_.startCase(key)}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          { _.map(this.props.data, (participant, i) => {
            return this.props.convertToGrid(participant, i);
          })}
        </tbody>
      </Table>
    );
  }
}

export default AdminTable;
