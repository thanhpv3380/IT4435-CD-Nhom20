import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  textPrimary: {
    fontSize: theme.spacing(2.5),
    fontWeight: 'bold',
  },
  listItem: {
    background: '#fff',
    padding: theme.spacing(2),
    boxShadow: theme.palette.boxShadow_l1,
    borderRadius: theme.spacing(1),
    fontSize: theme.spacing(2),
    cursor: 'pointer',
    marginBottom: theme.spacing(2),
  },
  menusToggle: {
    boxShadow: theme.palette.boxShadow_l1,
  },
}));
