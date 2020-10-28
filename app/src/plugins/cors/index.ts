/////////////////////////////////////////
/*          plugin definition          */
/////////////////////////////////////////
const cors = {
  plugin: require('hapi-cors'),
  options: {
    origins: ['*'],
    allowCredentials: 'true',
    methods: ['POST, GET, OPTIONS', 'PUT', 'DELETE'],
  },
};

export default cors;
