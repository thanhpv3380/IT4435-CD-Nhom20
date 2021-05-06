import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import './languages';
import Router from './router';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store()}>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
