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
// except formMessage which is not in the form
export const setInitialState = (formProps) => {
  return _.reduce(formProps, function(result, elem) {
    result[elem.name] = '';
    return result;
  }, {});
}