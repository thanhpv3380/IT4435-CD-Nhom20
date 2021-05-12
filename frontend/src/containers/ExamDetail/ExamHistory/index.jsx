import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from '@material-ui/core';
import apis from '../../../apis';
import useStyles from './index.style';

const ExamHistory = ({ examId }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [results, setResults] = useState([]);

  const fetchResultsByUser = async () => {
    const data = await apis.contest.getResultByUserInContest(examId);
    if (data && data.status) {
      setResults(data.result.data);
    } else {
      enqueueSnackbar((data && data.message) || 'Fetch data failed', {
        variant: 'error',
      });
    }
  };
  useEffect(() => {
    fetchResultsByUser();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Amount Correct </TableCell>
              <TableCell align="center">Time do exam</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row, index) => (
              <TableRow key={row.id} className={classes.row}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {row.amountCorrectQuestion}
                </TableCell>
                <TableCell align="center">{row.doTime}</TableCell>
                <TableCell align="center">
                  {moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>

                <TableCell className={classes.actionBox}>
                  <Button variant="contained" color="primary">
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ExamHistory;
