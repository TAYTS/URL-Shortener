/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import './index.scss';
import { CardProps } from './types';

/////////////////////////////////////////
/*            main component           */
/////////////////////////////////////////
const Card: FunctionComponent<CardProps> = ({ className, children, type = 'default' }: CardProps) => {
  /////////////////////////////////////////
  /*              lifecycle              */
  /////////////////////////////////////////
  return (
    <div
      className={classnames('card__container', className, {
        'card__container--danger': type === 'danger',
      })}
    >
      {children}
    </div>
  );
};

export default Card;
