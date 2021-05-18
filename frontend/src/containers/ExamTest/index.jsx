/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import {
  Fullscreen as FullscreenIcon,
  Send as SendIcon,
  AccessTime as AccessTimeIcon,
  FullscreenExit as FullscreenExitIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../apis';
import LoadingPage from '../../components/LoadingPage';
import { renderClockTime } from '../../utils/date';
import useUnsavedChangesWarning from './useUnsavedChangesWarning';

let interval = null;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PrepareExam = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const query = useQuery();
  const { enqueueSnackbar } = useSnackbar();
  const [Prompt, setDirty, setPristine] = useUnsavedChangesWarning(
    'Hiện tại bài thi chưa được lưu, nếu bạn thoát mọi câu trả lời trong lần thi này sẽ bị hủy bỏ',
  );
  const [contest, setContest] = useState();
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionSelected, setQuestionSelected] = useState({});
  const [timeDoExam, setTimeDoExam] = useState(0);
  const [isMarking, setIsMarking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleChangeAnswer = (e) => {
    const { value } = e.target;
    setAnswers({
      ...answers,
      [questionSelected.data.id]: value,
    });
  };

  const handleFullscreen = (e) => {
    e.preventDefault();
    setIsFullscreen((prev) => !prev);
  };

  const handleFinishExam = async () => {
    const examData = {
      doTime: timeDoExam,
      contestId: contest.id,
      groupQuestionId: contest.groupQuestion,
      answers,
    };
    const data = await apis.contest.mark({
      ...examData,
    });
    if (data && data.status) {
      const { result } = data.result;
      // eslint-disable-next-line no-alert
      console.log(`mark done ${result.amountCorrectQuestion}`);
      history.push(`/contest/${contest.id}/exam/detail?resultId=${result.id}`);
    } else {
      enqueueSnackbar((data && data.message) || 'Mark failed', {
        variant: 'error',
      });
    }
  };

  const handleStartExam = (examTime) => {
    const startTime = new Date();
    interval = setInterval(() => {
      const now = new Date();
      const timeDo = Math.floor((now - startTime) / 1000);
      if (timeDo < examTime) {
        setTimeDoExam(examTime - timeDo);
      } else {
        setTimeDoExam(0);
        setIsMarking(true);
        clearInterval(interval);
      }
    }, 1000);
  };

  const fetchContest = async () => {
    const token = query.get('token');
    const data = await apis.contest.getQuestions({ id, token });
    if (data && data.status) {
      const { contest: contestData } = data.result;
      setContest(contestData);
      setQuestionSelected({
        position: 0,
        data: contestData.questions[0],
      });
      setTimeDoExam(contestData.examTime * 60);
      handleStartExam(contestData.examTime * 60);
      setIsLoading(false);
    } else {
      history.push(`/contest/${id}/exam/detail`);
    }
  };

  useEffect(() => {
    setDirty();
    fetchContest();
    return () => {
      console.log('clear interval');
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log('load marking');
    if (isMarking) {
      setPristine();
      handleFinishExam();
    }
  }, [isMarking]);

  const handleClickQuestion = (pos) => (e) => {
    e.preventDefault();
    setQuestionSelected({
      position: pos,
      data: contest.questions[pos],
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isMarking) {
    return (
      <Box>
        <Typography variant="h6" style={{ color: '#ccc' }}>
          The system is processing, wait a few second...
        </Typography>
      </Box>
    );
  }
  return (
    <div className={isFullscreen && classes.fullscreen}>
      {/* <Prompt
        when={!isMarking}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}`
        }
      /> */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex">
          <Box mr={1}>
            <AccessTimeIcon />
          </Box>
          <Typography variant="button" display="block" gutterBottom>
            {renderClockTime(timeDoExam)}
          </Typography>
        </Box>
        <Box display="flex">
          <Box mr={1}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SendIcon />}
              onClick={() => {
                setIsMarking(true);
              }}
            >
              Finish
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              startIcon={
                isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />
              }
              onClick={handleFullscreen}
            >
              {isFullscreen ? 'Exit Full Screen' : 'Full Screen '}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Câu số {questionSelected && questionSelected.position + 1}:{' '}
                  {questionSelected &&
                    questionSelected.data &&
                    questionSelected.data.description}
                </Typography>
              </Box>
              <Box>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={
                    answers[
                      questionSelected.data && questionSelected.data.id
                    ] || null
                  }
                  onChange={handleChangeAnswer}
                >
                  {questionSelected &&
                    questionSelected.data &&
                    questionSelected.data.answers
                      .sort((a, b) => a.position - b.position)
                      .map((el, index) => (
                        <FormControlLabel
                          key={index}
                          value={el.answerId}
                          control={<Radio />}
                          label={el.content}
                        />
                      ))}
                </RadioGroup>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.questionBox}>
              {contest &&
                contest.questions.map((el, index) => (
                  <Button
                    key={index}
                    className={classes.questionSquare}
                    onClick={handleClickQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {Prompt}
    </div>
  );
};

export default PrepareExam;
