/////////////////////////////////////////
/*           typing definition         */
/////////////////////////////////////////
import { ReactElement } from 'react';

// Component props
export interface CardProps {
  className?: string;
  children: string | ReactElement | (string | ReactElement)[];
  type?: 'default' | 'danger';
  dataTestId?: string;
}
