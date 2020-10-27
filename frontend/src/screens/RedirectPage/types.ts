/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import { RouteComponentProps } from 'react-router-dom';

/////////////////////////////////////////
/*           typing definition         */
/////////////////////////////////////////
// Component props
type RouteParams = {
  urlHash: string;
};

export type RedirectPageProps = RouteComponentProps<RouteParams>;

// API response
export type GetURLReferencePayload = {
  url: string;
};

export type GetURLReferenceResponse = {
  url: string;
};
