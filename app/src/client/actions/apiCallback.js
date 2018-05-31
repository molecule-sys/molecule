export default key => (dispatch) => {
  dispatch({
    type: 'CLEAR_CALLBACK_RESPONSE',
    key,
  });
};
