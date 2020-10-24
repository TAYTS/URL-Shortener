/////////////////////////////////////////
/*          plugin definition          */
/////////////////////////////////////////
const cors = {
  plugin: require('hapi-cors'),
  options: {
    origins:
      process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [`https://${process.env.FRONTEND_DOMAIN}`],
    allowCredentials: 'true',
    methods: ['POST, GET, OPTIONS', 'PUT', 'DELETE'],
  },
};

export default cors;
