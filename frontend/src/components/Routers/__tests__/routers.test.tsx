/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import Router from '../index';

/////////////////////////////////////////
/*            test definition          */
/////////////////////////////////////////
describe('Routers', () => {
  test('HomePage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('home page')).toBeInTheDocument();
  });

  test('RedirectPage', () => {
    render(
      <MemoryRouter initialEntries={['/abcdefg']}>
        <Router />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('redirect page')).toBeInTheDocument();
  });
});
