import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Typography, Paper, Grid } from '@material-ui/core';
import useStyles from './index.style';
import ExamInformation from './ExamInformation';
import ExamRank from './ExamRank';
import ExamHistory from './ExamHistory';
import apis from '../../apis';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ExamDetail = () => {
  const classes = useStyles();
  const userInfo = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const query = useQuery();

  const { enqueueSnackbar } = useSnackbar();
  const [role, setRole] = useState();

  const fetchAccRoleInContest = async () => {
    const data = await apis.contest.checkAccountRole({
      contestId: id,
      userId: userInfo.id,
    });
    if (data && data.status) {
      setRole(data.result.role);
    } else if (data && data.code !== 404) {
      enqueueSnackbar(data.status || 'Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchAccRoleInContest();
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        {!role && (
          <>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Thông tin bài thi
                  </Typography>
                  <ExamInformation examId={id} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Lịch sử làm bài
                  </Typography>
                  <ExamHistory examId={id} />
                </Box>
              </Paper>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Bảng xếp hạng
              </Typography>
              <ExamRank
                examId={id}
                role={role}
                resultId={query.get('resultId')}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default ExamDetail;
