/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  TextField,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  RootRef,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core';
import { Remove as RemoveIcon, Add as AddIcon } from '@material-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LevelsQuestion from '../../../data/levelsQuestion';
import useStyles from './index.style';

const QuestionModal = ({ handleCloseModal, open }) => {
  const classes = useStyles();
  const [question, setQuestion] = useState();
  useEffect(() => {}, [open]);

  const handleAddAnswer = (e) => {
    e.preventDefault();
    const answerData = {
      position: (question && question.answers && question.answers.length) || 0,
      content: '',
      isCorrect: false,
    };
    setQuestion({
      ...question,
      answers:
        question && question.answers
          ? [...question.answers, answerData]
          : [answerData],
    });
  };

  const handleChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteAnswer = (pos) => () => {
    const newAnswers = question && question.answers;
    newAnswers.splice(pos, 1);
    setQuestion({
      ...question,
      answers: [...newAnswers],
    });
  };

  const handleEditAnswer = (pos) => (e) => {
    const newAnswers = question && question.answers;
    newAnswers[pos] = {
      ...newAnswers[pos],
      content: e.target.value,
    };
    setQuestion({
      ...question,
      answers: [...newAnswers],
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(question);
  };

  const handleChooseCorrectAnswer = (pos) => () => {
    let newAnswers = question && question.answers;
    newAnswers = newAnswers.map((el, index) => ({
      ...el,
      isCorrect: index === pos,
    }));
    setQuestion({
      ...question,
      answers: [...newAnswers],
    });
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: 'rgb(235,235,235)',
    }),
  });

  const handleDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const newAnswers = question && question.answers;

    newAnswers[startIndex].position = endIndex;
    newAnswers[endIndex].position = startIndex;

    const [removed] = newAnswers.splice(startIndex, 1);
    newAnswers.splice(endIndex, 0, removed);

    setQuestion({
      ...question,
      answers: newAnswers,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Add Question
          </Typography>
        </Box>
        <Box mb={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Level Question</InputLabel>
            <Select
              name="level"
              label="Level Question"
              value={(question && question.level) || 'EASY'}
              onChange={handleChange}
            >
              {LevelsQuestion.map((el) => (
                <MenuItem value={el} key={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            name="title"
            value={(question && question.title) || ''}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={10}
            name="description"
            value={(question && question.description) || ''}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2} className={classes.listAnswer}>
          <Box display="flex" alignItems="center">
            {/* <QuestionAnswerIcon /> */}

            <Typography variant="h6" className={classes.textCreateAnswer}>
              List Answer
            </Typography>
          </Box>
          <Box>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <RootRef rootRef={provided.innerRef}>
                    <List>
                      {question &&
                        question.answers &&
                        question.answers.map((item, index) => (
                          <Draggable
                            key={`item-${index}`}
                            draggableId={`item-${index}`}
                            index={index}
                          >
                            {(providedItem, snapshotItem) => (
                              <ListItem
                                ContainerComponent="li"
                                ContainerProps={{ ref: providedItem.innerRef }}
                                {...providedItem.draggableProps}
                                {...providedItem.dragHandleProps}
                                style={getItemStyle(
                                  snapshotItem.isDragging,
                                  providedItem.draggableProps.style,
                                )}
                              >
                                <ListItemIcon>
                                  <div onClick={handleDeleteAnswer(index)}>
                                    <IconButton>
                                      <RemoveIcon />
                                    </IconButton>
                                  </div>
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Box>
                                      <Checkbox
                                        checked={item.isCorrect}
                                        onChange={handleChooseCorrectAnswer(
                                          index,
                                        )}
                                        inputProps={{
                                          'aria-label': 'primary checkbox',
                                        }}
                                      />
                                      <TextField
                                        value={item.content}
                                        onChange={handleEditAnswer(index)}
                                      />
                                    </Box>
                                  }
                                />
                                <ListItemSecondaryAction />
                              </ListItem>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </List>
                  </RootRef>
                )}
              </Droppable>
            </DragDropContext>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleAddAnswer}
            >
              Add
            </Button>
          </Box>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Explain"
            variant="outlined"
            multiline
            rows={5}
            name="explain"
            value={(question && question.explain) || ''}
            onChange={handleChange}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Box mr={1}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
          <Box>
            <Button variant="contained" size="large" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default QuestionModal;
