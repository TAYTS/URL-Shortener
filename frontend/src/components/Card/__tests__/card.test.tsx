/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import React from 'react';
import { render } from '@testing-library/react';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import Card from '../index';

/////////////////////////////////////////
/*            test definition          */
/////////////////////////////////////////
describe('Card', () => {
  test('is rendered', () => {
    const component = render(<Card>Card Content</Card>);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('danger type', () => {
      const component = render(<Card type="danger">Card Content</Card>);

      expect(component).toMatchSnapshot();
    });

    test('additional className', () => {
      const component = render(<Card className="testing">Card Content</Card>);

      expect(component).toMatchSnapshot();
    });
  });
});
