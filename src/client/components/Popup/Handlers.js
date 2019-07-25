
const handleClose = (e) => {
  setOpen(false);
};

const handleInputChange = (e, setInputValue) => {
  setInputValue(e.target.value);
};

export default {
  handleClose,
  handleInputChange,
};
