import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
  },
  questionBox: {
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  questionSquare: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: theme.spacing(3),
    border: '1px solid #eee',
    padding: theme.spacing(1),
    margin: '2px',
  },
  fullscreen: {
    background: '#fff',
    zIndex: 99999,
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    position: 'fixed',
    padding: theme.spacing(8),
  },
}));
