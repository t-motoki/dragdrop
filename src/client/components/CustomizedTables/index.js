import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Meter from '../Meter';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

export default (Props) => {

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: Props.head.bgcolor,
      color: theme.palette.common.black,
      minHeight:'200px',
      verticalAlign:'top',
    },
    body: {
      fontSize: 18,
      height:'70px',
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell width='10%'>予測日</StyledTableCell>
            <StyledTableCell width='10%'>時間</StyledTableCell>
            <StyledTableCell width='70%'>
              <div>
                <div>アイテム チェーン</div>
                <div><Meter maxJobTime={1235000}/></div>
              </div>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Props.rows.map((row,i) => (
            <StyledTableRow key={'time'+i}>
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell>{row.time}</StyledTableCell>
              <StyledTableCell>
                {row.jobchain}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
