import { AxiosRequestConfig } from 'axios';

export type Headers = {
  Accept?: string;
  'Content-Type'?: string;
  Authorization?: string;
};

export type RequestProps = AxiosRequestConfig & {
  needAuthenticate?: boolean;
  query?: { [key: string]: string | string[] | boolean | number };
  body?: Record<string, unknown>;
};
