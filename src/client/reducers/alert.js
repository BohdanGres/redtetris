import { ALERT_POP } from '../actions/alert'



const reducer = (state = {} , action) => {
  console.log('tyt', action);

  switch(action.type){
    case 'INIT_TYPE':
      console.log('tyt');
      return action.body;
    case 'CHANGE_WIDTH':
      return { ...state, width: action.width};
    default: 
      return state
  }
}

export default reducer

