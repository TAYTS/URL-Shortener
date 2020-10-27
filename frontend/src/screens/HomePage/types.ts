/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////

/////////////////////////////////////////
/*           typing definition         */
/////////////////////////////////////////
// Component props

// API response
export type CreateURLReferencePayload = {
  url: string;
};

export type CreateURLReferenceSuccessResponse = {
  url: string;
  urlHash: string;
};
