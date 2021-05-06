import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, Router } from 'react-router-dom';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Timer as TimerIcon,
} from '@material-ui/icons';
import routes from '../../constants/route';
import useStyles from './index.style';

const menus = [
  {
    heading: 'Dashboard',
    icon: <DashboardIcon />,
    route: routes.HOME,
  },
  {
    heading: 'Contest',
    icon: <TimerIcon />,
    route: routes.CONTEST,
  },
  {
    heading: 'Group Question',
    icon: <AssignmentIcon />,
    route: routes.GROUP_QUESTIONS,
  },
  {
    heading: 'User Information',
    icon: <PersonIcon />,
    route: routes.USER,
  },
];

const Layout = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Multichoice
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menus.map((el, index) => (
            <Link to={el.route} key={index} className={classes.link}>
              <ListItem button key={index}>
                <ListItemIcon>{el.icon}</ListItemIcon>
                <ListItemText primary={el.heading} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
