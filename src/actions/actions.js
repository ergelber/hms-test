import request from 'superagent';

export const createParticipant = (payload) => {
  return (dispatch) => {
    request.post('http://localhost:3001/api/participants/')
      .send(payload)
      .end(function(err, res){
        if(err) return err;
        return dispatch({ 
          type: 'CREATE_PARTICIPANT',
          payload: res.body
        });
      });
    }
}

export const changeReviewed = (payload) => {
  return (dispatch) => {
    request.put('http://localhost:3001/api/participants/')
      .send(payload)
      .end(function(err, res){
        if(err) return err;
        return dispatch({
          type: 'CHANGE_REVIEWED',
          payload: res.body
        });
      });
    }
}

export const getParticipants = () => {
  return (dispatch) => {
    request.get('http://localhost:3001/api/participants/')
      .end(function(err, res){
        if(err) return err;
        return dispatch({ 
          type: 'GET_PARTICIPANTS',
          payload: res.body
        });
      });
    }
}