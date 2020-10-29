/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { AxiosError, AxiosResponse } from 'axios';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import HomePage from '../index';
import * as api from '../api';

/////////////////////////////////////////
/*            test definition          */
/////////////////////////////////////////
describe('HomePage', () => {
  test('render', () => {
    const component = render(<HomePage />);

    expect(component).toMatchSnapshot();
  });

  test('render error message card', () => {
    const component = <HomePage />;
    const { getByTestId, rerender } = render(component);

    const urlBtn = getByTestId('url btn');
    fireEvent.submit(urlBtn);

    rerender(component);

    expect(getByTestId('error message card')).toBeInTheDocument();
  });

  test('render converted url message card', async () => {
    const component = <HomePage />;
    const { getByTestId, rerender } = render(component);

    const createURLReference = jest.spyOn(api, 'createURLReference').mockImplementation(async () =>
      Promise.resolve({
        data: {
          urlHash: 'testing',
        },
      } as AxiosResponse),
    );

    const urlTextInput = getByTestId('url text input');
    fireEvent.change(urlTextInput, { target: { value: 'http://www.google.com' } });

    const urlBtn = getByTestId('url btn');
    fireEvent.submit(urlBtn);

    await waitFor(() => expect(createURLReference).toBeCalledTimes(1));

    rerender(component);
    expect(getByTestId('converted url message card')).toBeInTheDocument();
  });

  test('render invalid url error message card', async () => {
    const component = <HomePage />;
    const { getByTestId, rerender } = render(component);

    const createURLReference = jest.spyOn(api, 'createURLReference').mockImplementation(async () =>
      Promise.reject({
        response: {
          status: 400,
        },
      } as AxiosError),
    );

    const urlTextInput = getByTestId('url text input');
    fireEvent.change(urlTextInput, { target: { value: 'http://www.google.com' } });

    const urlBtn = getByTestId('url btn');
    fireEvent.submit(urlBtn);

    await waitFor(() => expect(createURLReference).toBeCalledTimes(1));

    rerender(component);
    expect(getByTestId('error message card')).toBeInTheDocument();
  });

  test('render server error message card', async () => {
    const component = <HomePage />;
    const { getByTestId, rerender } = render(component);

    const createURLReference = jest.spyOn(api, 'createURLReference').mockImplementation(async () =>
      Promise.reject({
        response: {
          status: 500,
        },
      } as AxiosError),
    );

    const urlTextInput = getByTestId('url text input');
    fireEvent.change(urlTextInput, { target: { value: 'http://www.google.com' } });

    const urlBtn = getByTestId('url btn');
    fireEvent.submit(urlBtn);

    await waitFor(() => expect(createURLReference).toBeCalledTimes(1));

    rerender(component);
    expect(getByTestId('error message card')).toBeInTheDocument();
  });
});
