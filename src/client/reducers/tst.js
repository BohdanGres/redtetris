const reducer = (state = {}, action) => {

  switch (action.type) {
    case 'server/ping':
      return {...state};
    default :
      return {...state};
  }
}
export default reducer;
