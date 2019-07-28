import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from "@material-ui/core/Typography/Typography";

const UserRow = ({ name, score, i}) => {
  return (
    <ListItem key={i}>
      <ListItemText primary={`Name: ${name}`} />
      <TypoGraphy>
        {`Score: ${score}`}
      </TypoGraphy>
    </ListItem>
  );
};

export default UserRow;
