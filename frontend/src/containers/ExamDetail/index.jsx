import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
  Typography,
  Divider,
} from '@material-ui/core';
import { Visibility as VisibilityIcon } from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../apis';

const ExamDetail = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [results, setResults] = useState([]);

  const { id } = useParams();
  const fetchResults = async () => {
    const data = await apis.contest.getResultByContest(id);
    if (data && data.status) {
      const { result } = data;
      setResults(result.data);
    } else {
      enqueueSnackbar((data && data.message) || 'Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);
  return (
    <>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Thông tin bài thi
        </Typography>
        <Divider />
      </Box>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Lịch sử làm bài
        </Typography>{' '}
        <Divider />
      </Box>
      <Box>
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            Kết quả
          </Typography>{' '}
          <Divider />
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell>Participant</TableCell>
                <TableCell align="center">Amount Correct </TableCell>
                <TableCell align="center">Time do exam</TableCell>
                <TableCell />
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

                  <TableCell className={classes.actionBox}>
                    <Box>
                      <IconButton aria-label="watch">
                        <VisibilityIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default ExamDetail;
