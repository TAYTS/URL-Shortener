/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'screens/HomePage';
import RedirectPage from 'screens/RedirectPage';

/////////////////////////////////////////
/*            main component           */
/////////////////////////////////////////
const Routers: FunctionComponent = () => {
  /////////////////////////////////////////
  /*              rendering              */
  /////////////////////////////////////////
  return (
    <Switch>
      <Route path="/:urlHash" component={RedirectPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
};

export default Routers;
