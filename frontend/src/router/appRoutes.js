import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import User from '../pages/User';
import Contest from '../pages/Contest';
import GroupQuestion from '../pages/GroupQuestion';
import Question from '../pages/Question';
import PrepareExam from '../pages/PrepareExam';
import Exam from '../pages/Exam';
import routes from '../constants/route';

export default [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.REGISTER,
    component: Register,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.HOME,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.USER,
    component: User,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.CONTEST,
    component: Contest,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.GROUP_QUESTIONS,
    component: GroupQuestion,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.QUESTION,
    component: Question,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.PREPARE_EXAM,
    component: PrepareExam,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.EXAM,
    component: Exam,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
];
