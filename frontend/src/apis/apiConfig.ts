let baseUrl = 'http://localhost:3001';

if (process && process.env.REACT_APP_API_URL) {
  baseUrl = process.env.REACT_APP_API_URL;
}

const config = {
  urlReference: {
    createURL: `${baseUrl}/url`,
    redirectPage: `${baseUrl}/url/{urlHash}`,
  },
};

export default config;
