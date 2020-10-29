/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import faker from 'faker';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import RedirectPage from '../index';
import * as api from '../api';
import * as goto from 'utils/goto';

/////////////////////////////////////////
/*            test definition          */
/////////////////////////////////////////
describe('RedirectPage', () => {
  test('render', () => {
    const component = render(
      <MemoryRouter initialEntries={['/abcd']}>
        <Route exact path="/{urlHash}" component={RedirectPage} />
      </MemoryRouter>,
    );

    expect(component).toMatchSnapshot();
  });

  test('redirect for valid hash', async () => {
    const redirectURL = faker.internet.url();
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        replace: jest.fn(),
      },
    });

    const redirectPage = jest.spyOn(api, 'redirectPage').mockImplementation(async () =>
      Promise.resolve({
        data: { url: redirectURL },
      } as AxiosResponse),
    );

    const component = (
      <MemoryRouter initialEntries={['/abcd']}>
        <Route exact path="/:urlHash" component={RedirectPage} />
      </MemoryRouter>
    );

    render(component);

    await waitFor(() => expect(redirectPage).toBeCalledTimes(1));

    expect(window.location.replace).toBeCalledTimes(1);
    expect(window.location.replace).toBeCalledWith(redirectURL);
  });

  test('redirect to root path for invalid hash', async () => {
    const redirectPage = jest
      .spyOn(api, 'redirectPage')
      .mockImplementation(async () => Promise.reject({} as AxiosError));

    jest.mock('utils/goto', () => ({
      default: jest.fn(),
    }));
    const mockGoto = jest.spyOn(goto, 'default');

    const component = (
      <MemoryRouter initialEntries={['/abcd']}>
        <Route exact path="/:urlHash" component={RedirectPage} />
      </MemoryRouter>
    );

    render(component);

    await waitFor(() => expect(redirectPage).toBeCalledTimes(1));

    expect(mockGoto).toBeCalledTimes(1);
    expect(mockGoto).toBeCalledWith('/');
  });
});
