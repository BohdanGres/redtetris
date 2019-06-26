
const handleClose = (e) => {
  setOpen(false);
};

const handleInputChange = (e, setInputValue) => {
  setInputValue(e.target.value);
  console.log(e.target.value);
  console.log(inputValue);
};

export default {
  handleClose,
  handleInputChange,
};
