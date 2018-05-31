export default (form) => {
  const elements = document.querySelectorAll(`${form} [required]`);
  const validityList = [];
  [...elements].forEach((item) => {
    validityList.push(item.checkValidity());
  });
  return validityList.every(item => item === true);
};
