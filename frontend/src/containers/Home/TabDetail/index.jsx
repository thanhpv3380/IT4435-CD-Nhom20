/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
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
import { checkDate } from '../../../utils/date';

const TabDetail = ({ item }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();

  const handleJoin = (e) => {
    e.preventDefault();
    history.push(`/contest/${item.id}/prepare`);
  };

  return (
    <Grid item xs={4} key={item.id}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            item.createdBy.avatar ? (
              <Avatar alt={item.createdBy.name} src={item.createdBy.avatar} />
            ) : (
              <Avatar aria-label="recipe" className={classes.avatar}>
                {item.createdBy.name[0]}
              </Avatar>
            )
          }
          action={
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                marginTop: '20px',
              }}
            >
              {item.examTime} min
            </Typography>
          }
          title={item.title}
          subheader={`Creator: ${item.createdBy.name}`}
        />
        <CardMedia
          className={classes.media}
          image={
            item.imageUrl ||
            'https://monamedia.co/wp-content/uploads/2020/02/javascript-la-gi.jpg'
          }
          title={item.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Description: {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Box display="flex" alignItems="center">
                <AccessTimeIcon color="secondary" fontSize="small" />
                <Typography variant="body2" color="textSecondary" component="p">
                  {checkDate(item)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end">
                <Button color="primary" onClick={handleJoin}>
                  Join
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TabDetail;
