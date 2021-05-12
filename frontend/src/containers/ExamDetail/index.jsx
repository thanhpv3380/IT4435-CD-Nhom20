import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import useStyles from './index.style';
import ExamInformation from './ExamInformation';
import ExamRank from './ExamRank';
import ExamHistory from './ExamHistory';

const ExamDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  return (
    <>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Thông tin bài thi
        </Typography>
        <ExamInformation examId={id} />
      </Box>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Lịch sử làm bài
        </Typography>
        <ExamHistory examId={id} />
      </Box>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Bảng xếp hạng
        </Typography>
        <ExamRank examId={id} />
      </Box>
    </>
  );
};
export default ExamDetail;
