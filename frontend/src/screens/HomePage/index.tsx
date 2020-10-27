/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { AxiosError } from 'axios';
import React, { FunctionComponent, useState, useCallback, FormEvent } from 'react';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import { createURLReference } from './api';

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

      setErrorMessage('');
      createURLReference({
        url: inpValue,
      })
        .then((res) => {
          setShorterURL(res.data.urlHash);
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
    <div className="home-page__main-container">
      <form className="url-input__container" onSubmit={shortenURLHandler}>
        <input
          className="url-input"
          placeholder="Shorten URL"
          type="text"
          autoComplete="off"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="shorten-url-submit-btn" type="submit">
          Shorten
        </button>
      </form>
      {errorMessage && <div>Error: {errorMessage}</div>}
      {shortenURL && <div>Shorten URL: {shortenURL}</div>}
    </div>
  );
};

export default HomePage;
