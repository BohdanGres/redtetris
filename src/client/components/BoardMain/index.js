// import 'index.css';
import React from 'react'

import { Row } from './../Row/index';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import socket from './../../utils/socket';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555300439/shape/mentalfloss/primary-tetris.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const buildRow = ({ table }) => {
  const row = table.map((row, i) => {
    return (<Row key={i}  row={row}/>)
  });

  return row;
}

// buildRow()

const mapTable = ({ table, current }) => {
  if (!current.figure) return table;
  const figure = current.figure.figure;
  const cord = current.cord;
  const newTable = table.map(tr => [...tr]);

  figure.map((tr, i, arr) => {
    tr.map((th, j, ar) => {
      newTable[i + cord.x][j + cord.y] = th ? th : newTable[i + cord.x][j + cord.y];
     });
  });
  return newTable;
};

const mapOtherTabe = (table) => {
  const board = [ ...table ];
  const colored = [];
  board.forEach((tr, i, table) => {
      tr.forEach((cell, j, row) => {
        let k = i;
        if (cell > 0 && !colored.includes(j)) {
          while (k < 20) {
            table[k][j] = 1;
            k++;
          }
          colored.push(j);
        }
      })
    });

  return board;
};

const otherBoard = (tables = []) => {
 return  tables.map(board => {
   return (
     <div>
       <div className={`board ${board.isEnd ? 'looser' : '' }`}>
        {buildRow({ table: mapOtherTabe(board.table) })}
       </div>
     </div>)
 });
};


const BoardMain = ({ width, height, array, gameData, tables, userUuid }) => {
  const classes = useStyles();
  if (!tables || !tables[userUuid]) {
    socket.emit('getGame', { playerId: userUuid })
    return '';
  }
  const newTable = { table: mapTable(tables[userUuid]), isEnd: tables[userUuid].isEnd };
  const otherTable = [];
  Object.keys(tables).forEach(tblId => {
    if (tblId !== userUuid) {
      otherTable.push({ table: tables[tblId].table, isEnd: tables[tblId].isEnd });
    }
  });
  const leftTable = otherTable.splice(0,2);
  return (
    <div>
      <Grid container>
          <Grid item md={3}>
            {(leftTable && leftTable.length) ? otherBoard(leftTable) : ''}
          </Grid>
          <Grid item md={6}>
            <div className={`mainBoard ${newTable.isEnd ? 'looser' : ''}`}>
              {buildRow(newTable)}
            </div>
          </Grid>
          <Grid item md={3}>
            {(otherTable && otherTable.length) ? otherBoard(otherTable): ''}
          </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, null)(BoardMain)
