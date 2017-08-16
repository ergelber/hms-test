import React from 'react';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

// Admin table is a reusable and flexible table and a dumb component
// You only need to pass data in the form of an array of objects
// and a conversion (convertToGrid) to tell the table how to transform the data to jsx
const AdminTable = ({ data, convertToGrid }) => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          {_.map(data[0], (value, key) => {
            return <td key={key}>{_.startCase(key)}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        { _.map(data, (participant, i) => {
          return convertToGrid(participant, i);
        })}
      </tbody>
    </Table>
  );
}

export default AdminTable;
