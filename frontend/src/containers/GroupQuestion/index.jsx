/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Button,
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Image as ImageIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../apis';
import GroupQuestionModal from './GroupQuestionModal';
import SearchBox from '../../components/SearchBox';

let timeOutId = null;
const GroupQuestion = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [keySearch, setKeySearch] = useState('');
  const [groupQuestionSelected, setGroupQuestionSelected] = useState();
  const [groupQuestions, setGroupQuestions] = useState([]);

  const fetchGroupQuestions = async (keyword) => {
    console.log(keyword);
    const data = [
      {
        id: '1',
        title: 'Bộ câu hỏi Toán cao cấp 20202',
        description: 'Đề bao gồm nhiều câu của đề thi các năm 2017, 2018, 2019',
        imageUrl: '',
      },
      {
        id: '2',
        title: 'Bộ câu hỏi Lý',
        description: 'Đề bao gồm nhiều câu hỏi khó',
        imageUrl: '',
      },
    ];
    setGroupQuestions(data);
    // const data = await apis.groupQuestion.getGroupQuestions(keyword);
    // if (data && data.status) {
    //   setGroupQuestions(data.result.groupQuestions);
    // } else {
    //   enqueueSnackbar('Fetch data failed', { variant: 'error' });
    // }
  };

  useEffect(() => {
    fetchGroupQuestions();
  }, []);

  const handleOpenToggle = (el) => (event) => {
    setAnchorEl(event.currentTarget);
    setGroupQuestionSelected(el);
  };

  const handleCloseToggle = () => {
    setAnchorEl(null);
  };

  const handleOpenEdit = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    console.log('delete ', groupQuestionSelected.id);
  };

  const handleOpenModalAdd = (e) => {
    e.preventDefault();
    setGroupQuestionSelected(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setKeySearch(value);
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      fetchGroupQuestions(value);
    }, 500);
  };
  const handleSave = (el) => async (e) => {
    e.preventDefault();
    setOpenModal(false);
    if (el.id) {
      const { title, description, imageUrl } = el;
      const data = await apis.groupQuestion.updateGroupQuestions(el.id, {
        title,
        description,
        imageUrl,
      });
      if (data && data.status) {
        const newGroupQuestions = [...groupQuestions];
        const pos = newGroupQuestions.findIndex((ele) => ele.id === el.id);
        newGroupQuestions[pos] = { ...data.result.groupQuestion };
        setGroupQuestions(newGroupQuestions);
        enqueueSnackbar('Update success', { variant: 'success' });
      } else {
        enqueueSnackbar('Update failed', { variant: 'error' });
      }
    } else {
      const { title, description, imageUrl } = el;
      const data = await apis.groupQuestion.createGroupQuestion({
        title,
        description,
        imageUrl,
      });
      if (data && data.status) {
        const newGroupQuestions = [...groupQuestions];
        newGroupQuestions.push({ ...data.result.groupQuestion });
        setGroupQuestions(newGroupQuestions);
        enqueueSnackbar('Create success', { variant: 'success' });
      } else {
        enqueueSnackbar('Create failed', { variant: 'error' });
      }
    }
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
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={handleOpenModalAdd}
          >
            Add Group Question
          </Button>
        </Box>
      </Box>
      <List>
        {groupQuestions.map((el) => (
          <ListItem className={classes.listItem} key={el.id}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              classes={{
                primary: classes.textPrimary,
              }}
              primary={el.title}
              secondary={el.description}
            />
            {/* <ListItemText>
              <Box display="flex" alignItems="flex-end">
                <Box mr={1}>
                  <Typography variant="button" component="h2">
                    Amount Question:
                  </Typography>
                </Box>
                <Typography variant="h5" component="h2">
                  10
                </Typography>
              </Box>
            </ListItemText> */}
            <ListItemSecondaryAction>
              <div onClick={handleOpenToggle(el)}>
                <IconButton edge="end" aria-label="more">
                  <MoreVertIcon />
                </IconButton>
              </div>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Menu
        classes={{
          paper: classes.menusToggle,
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseToggle}
      >
        <MenuItem onClick={handleOpenEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <GroupQuestionModal
        open={openModal}
        item={groupQuestionSelected}
        handleCloseModal={handleCloseModal}
        handleSave={handleSave}
      />
    </div>
  );
};

export default GroupQuestion;
