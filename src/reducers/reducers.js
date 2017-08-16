import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import _ from 'lodash';

const participantReducer = (state = [], action) => {
	switch(action.type){
		case 'GET_PARTICIPANTS': 
			return [...action.payload];
		case 'CREATE_PARTICIPANT':
			return [...state, action.payload];
		case 'CHANGE_REVIEWED':
			return _.map(state, (participant, index) => {
				if (action.payload.idx === index) {
					return Object.assign({}, participant, {
						reviewed: action.payload.participant.reviewed
					})
				}
				return participant;
			});
		default:
			return state;
	}
}

export default () => {
	return combineReducers({
		participantState: participantReducer,
		routerState: routerReducer
	});
}