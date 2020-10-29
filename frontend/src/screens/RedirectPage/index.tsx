/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import React from 'react';
import { FunctionComponent, useEffect } from 'react';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import goto from 'utils/goto';
import { redirectPage } from './api';
import { RedirectPageProps } from './types';

/////////////////////////////////////////
/*            main component           */
/////////////////////////////////////////
const RedirectPage: FunctionComponent<RedirectPageProps> = (props: RedirectPageProps) => {
  /////////////////////////////////////////
  /*              lifecycle              */
  /////////////////////////////////////////
  useEffect(() => {
    const {
      match: {
        params: { urlHash },
      },
    } = props;
    redirectPage({ urlHash })
      .then((res) => {
        window.location.replace(res.data.url);
      })
      .catch(() => {
        goto('/');
      });
  });

  return <div data-testid="redirect page" />;
};

export default RedirectPage;
