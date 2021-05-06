import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Button,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  AccordionActions,
  TextField,
} from '@material-ui/core';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import SearchBox from '../../components/SearchBox';
import QuestionModal from './QuestionModal';
import useStyles from './index.style';

let timeOutId = null;
const Question = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [keySearch, setKeySearch] = useState('');

  const handleSearch = (e) => {
    const { value } = e.target;
    setKeySearch(value);
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      console.log('search');
    }, 100);
  };

  const handleDeleteQuestion = (e) => {
    e.stopPropagation();
    console.log('fdsfsd');
  };

  const handleOpenModalAdd = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box>
          <SearchBox handleSearch={handleSearch} />
        </Box>
        <Box display="flex">
          <Box mr={1}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              startIcon={<AddIcon />}
            >
              Import Excel
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={handleOpenModalAdd}
            >
              Add Question
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Box display="flex" alignItems="center">
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={handleDeleteQuestion}
                onFocus={(event) => event.stopPropagation()}
                control={<DeleteIcon />}
              />
              <Typography className={classes.heading}>
                Câu hỏi số 1: How many times VietNam champion AFF CUP?
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            <Box display="flex" flexDirection="column">
              <Box>
                <TextField fullWidth label="Title" variant="outlined" />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                />
              </Box>

              <Box>
                <RadioGroup aria-label="gender" name="gender1">
                  <FormControlLabel
                    label="A. female"
                    control={<Radio />}
                    value="Female"
                  />
                  <FormControlLabel
                    label="B. male"
                    control={<Radio />}
                    value="Male"
                  />
                  <FormControlLabel
                    label="C. other"
                    control={<Radio />}
                    value="Other"
                  />
                  <FormControlLabel
                    label="D. other"
                    control={<Radio />}
                    value="Other"
                  />
                </RadioGroup>
              </Box>
              <TextField label="Explain Answer" variant="outlined" multiline />
            </Box>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary">
              Save
            </Button>
          </AccordionActions>
        </Accordion>
      </Box>
      <QuestionModal open={openModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default Question;
