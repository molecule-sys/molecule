export default (text) => {
  let confirmMessage;
  if (confirm(text)) {
    confirmMessage = true;
  } else {
    confirmMessage = false;
  }
  return confirmMessage;
};
