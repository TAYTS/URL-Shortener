/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { object, string } from 'joi';

/////////////////////////////////////////
/*         validator definition        */
/////////////////////////////////////////
export const createURLReferencePayload = object({
  url: string().uri().required().example('http://www.google.com'),
}).label('Create URL Reference Payload');

export const createURLReferenceResponse = object({
  url: string().uri().required().example('http://www.google.com'),
  urlHash: string().length(15).required().example('in1abjq1abcd3de'),
}).label('Create URL Reference Response');

export const getURLReferencePayload = object({
  urlHash: string().length(15).required().example('http://domain.com/in1abjq1abcd3de'),
}).label('Get URL Reference Param');

export const getURLReferenceResponse = object({
  url: string().uri().required().example('http://www.google.com'),
  urlHash: string().length(15).required().example('in1abjq1abcd3de'),
}).label('Get URL Reference Response');
