import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  Paper,
  TableBody,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { Visibility as VisibilityIcon } from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../../apis';
import LoadingPage from '../../../components/LoadingPage';

const ExamDetail = ({ examId }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResults = async () => {
    const data = await apis.contest.getResultByContest(examId);
    if (data && data.status) {
      const { result } = data;
      setResults(result.data);
      setIsLoading(false);
    } else {
      enqueueSnackbar((data && data.message) || 'Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell>Participant</TableCell>
              <TableCell align="center">Amount Correct </TableCell>
              <TableCell align="center">Time do exam</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row, index) => (
              <TableRow key={row.id} className={classes.row}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt="avatar"
                      src={row.participant.avatar}
                      style={{
                        height: '25px',
                        width: '25px',
                        marginRight: '3px',
                      }}
                    />
                    {row.participant.name}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {row.amountCorrectQuestion}
                </TableCell>
                <TableCell align="center">{row.doTime}</TableCell>
                <TableCell align="center">
                  {moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ExamDetail;
