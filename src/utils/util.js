import _ from 'lodash';

// hardcoded the formProps for the exercise but should be coming from a db
export const formProps = [
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

// set all state props passed in to empty string to make compatible with form
export const setInitialState = (formProps) => {
  return _.reduce(formProps, function(result, elem) {
    result[elem.name] = '';
    return result;
  }, {});
}

// check if input is a number
export const isANumber = (input) => {
  return !isNaN(parseInt(input)) && parseInt(input) === +input;
}