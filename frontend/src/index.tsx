/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import reportWebVitals from './reportWebVitals';
import Routers from 'components/Routers';
import history from 'utils/history';
import './index.scss';

/////////////////////////////////////////
/*            main component           */
/////////////////////////////////////////
ReactDOM.render(
  <React.StrictMode>
    <Helmet titleTemplate="%s">
      <title>URL Shortener</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <Router history={history}>
      <Routers />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
