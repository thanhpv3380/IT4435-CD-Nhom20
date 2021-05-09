import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Tabs, Tab, Grid } from '@material-ui/core';
import TabDetail from './TabDetail';
import useStyles from './index.style';

const menus = [
  { id: 0, heading: 'All Contest' },
  { id: 1, heading: 'Đã tham gia' },
  { id: 2, heading: 'Đang diễn ra' },
  { id: 3, heading: 'Sắp diễn ra' },
  { id: 4, heading: 'Đã diễn ra' },
];

const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [contests, setContests] = useState([]);

  const fetchContests = async () => {
    const data = [
      {
        amount_question: 0,
        createdBy: '606866fc2ae34c38c018f371',
        examTime: 123,
        groupQuestion: '6076b337854523281c2c7dca',
        id: '5',
        startTime: '2021-05-03T16:18:00.000Z',
        title: 'fdsfds',
      },
      {
        amount_question: 0,
        createdBy: '606866fc2ae34c38c018f371',
        examTime: 123,
        groupQuestion: '6076b337854523281c2c7dca',
        id: '0',
        startTime: '2021-05-03T16:18:00.000Z',
        title: 'fdsfds',
      },
      {
        amount_question: 0,
        createdBy: '606866fc2ae34c38c018f371',
        examTime: 123,
        groupQuestion: '6076b337854523281c2c7dca',
        id: '1',
        startTime: '2021-05-03T16:18:00.000Z',
        title: 'fdsfds',
      },
      {
        amount_question: 0,
        createdBy: '606866fc2ae34c38c018f371',
        examTime: 123,
        groupQuestion: '6076b337854523281c2c7dca',
        id: '2',
        startTime: '2021-05-03T16:18:00.000Z',
        title: 'fdsfds',
      },
      {
        amount_question: 0,
        createdBy: '606866fc2ae34c38c018f371',
        examTime: 123,
        groupQuestion: '6076b337854523281c2c7dca',
        id: '3',
        startTime: '2021-05-03T16:18:00.000Z',
        title: 'fdsfds',
      },
    ];
    setContests(data);
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const handleChangeTab = async (event, newValue) => {
    setTab(newValue);
    await fetchContests();
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          {menus.map((el) => (
            <Tab label={el.heading} key={el.id}>
              {el.heading}
            </Tab>
          ))}
        </Tabs>
      </Paper>
      <Grid container spacing={3}>
        {contests.map((el) => (
          <TabDetail item={el} />
        ))}
      </Grid>
    </>
  );
};

export default Home;
