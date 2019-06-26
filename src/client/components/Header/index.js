import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'

import HeaderNavBar from './../HeadreNavBar';

const Header = () => {
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <TypoGraphy /*variant="button"*/ variant="h2"
                      color="inherit"
          >
            RED TETRIS
          </TypoGraphy>
          <HeaderNavBar/>
        </Toolbar>
      </AppBar>

    </div>
  );
};

export default Header;
