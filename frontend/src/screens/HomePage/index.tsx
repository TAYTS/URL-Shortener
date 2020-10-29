/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { AxiosError } from 'axios';
import React, { FunctionComponent, useState, useCallback, FormEvent } from 'react';
import isEmpty from 'lodash/isEmpty';
import CopyToClipboard from 'react-copy-to-clipboard';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import { createURLReference } from './api';

import Card from 'components/Card';

// import local styling
import './index.scss';

/////////////////////////////////////////
/*            main component           */
/////////////////////////////////////////
const HomePage: FunctionComponent = () => {
  /////////////////////////////////////////
  /*              lifecycle              */
  /////////////////////////////////////////
  const [inpValue, setInputValue] = useState<string>('');
  const [shortenURL, setShorterURL] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const shortenURLHandler = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (isEmpty(inpValue)) {
        setErrorMessage('Please enter URL!');
        return;
      }

      setShorterURL('');
      setErrorMessage('');

      createURLReference({
        url: inpValue,
      })
        .then((res) => {
          const domain = `${window.location.protocol}//${window.location.host}`;
          setShorterURL(`${domain}/${res.data.urlHash}`);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 400) {
            setErrorMessage('Invalid URL');
          } else {
            setErrorMessage('Server Error');
          }
        });
    },
    [inpValue],
  );

  return (
    <div className="home-page__main-container" data-testid="home page">
      <form className="url-input__container" onSubmit={shortenURLHandler} data-testid="url form">
        <input
          className="url-input"
          placeholder="Shorten URL"
          type="text"
          autoComplete="off"
          onChange={(e) => setInputValue(e.target.value)}
          data-testid="url text input"
        />
        <button className="shorten-url-submit-btn" type="submit" data-testid="url btn">
          Shorten
        </button>
      </form>
      {errorMessage && (
        <Card className="message-card__container" type="danger" dataTestId="error message card">
          Error: {errorMessage}
        </Card>
      )}
      {shortenURL && (
        <Card className="message-card__container" dataTestId="converted url message card">
          Shorten URL:{' '}
          <a className="url-link" href={shortenURL}>
            {shortenURL}
          </a>
          <CopyToClipboard text={shortenURL}>
            <button className="copy-btn">Copy</button>
          </CopyToClipboard>
        </Card>
      )}
    </div>
  );
};

export default HomePage;
