/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
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

const PrepareExam = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [contest, setContest] = useState();
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionSelected, setQuestionSelected] = useState({});
  const [timeDoExam, setTimeDoExam] = useState(0);

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

  const fetchContest = async () => {
    try {
      const data = await apis.contest.getQuestions(id);
      if (data.status) {
        const { contest: contestData } = data.result;

        setContest(contestData);
        setQuestionSelected({
          position: 0,
          data: contestData.questions[0],
        });
        setIsLoading(false);
      } else {
        enqueueSnackbar(data.message || 'Fetch data failed', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchContest();
  }, []);

  const handleClickQuestion = (pos) => (e) => {
    e.preventDefault();
    setQuestionSelected({
      position: pos,
      data: contest.questions[pos],
    });
  };

  const handleFinishExam = async (e) => {
    e.preventDefault();
    console.log(answers);

    try {
      const data = await apis.contest.mark({
        doTime: timeDoExam,
        contestId: contest.id,
        groupQuestionId: contest.groupQuestion,
        answers,
      });
      if (data.status) {
        const { result } = data.result;
        // eslint-disable-next-line no-alert
        alert(`mark done ${result.amountCorrectQuestion}`);
      } else {
        enqueueSnackbar(data.message || 'Fetch data failed', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Fetch data failed', {
        variant: 'error',
      });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className={isFullscreen && classes.fullscreen}>
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
            {contest && contest.examTime}
          </Typography>
        </Box>
        <Box display="flex">
          <Box mr={1}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SendIcon />}
              onClick={handleFinishExam}
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
    </div>
  );
};

export default PrepareExam;
