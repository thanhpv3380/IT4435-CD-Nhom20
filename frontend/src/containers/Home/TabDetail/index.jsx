/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Button,
} from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import useStyles from './index.style';

const TabDetail = ({ item }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid item xs={4} key={item.id}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <Button
              color="primary"
              fullWidth
              style={{ marginTop: '10px', marginRight: '10px' }}
            >
              Join
            </Button>
          }
          title={item.title}
          subheader={`${item.examTime} min`}
        />
        <CardMedia
          className={classes.media}
          image="https://monamedia.co/wp-content/uploads/2020/02/javascript-la-gi.jpg"
          title={item.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Description: {item.description}fsdffdsfsdfdsfsfd
          </Typography>
        </CardContent>
        <CardActions>
          <Box display="flex" alignItems="center">
            <AccessTimeIcon color="secondary" fontSize="small" />
            <Typography variant="body2" color="textSecondary" component="p">
              Time remain: {moment(item.startTime).fromNow()}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TabDetail;
