/////////////////////////////////////////
/*          plugin definition          */
/////////////////////////////////////////
const swagger = {
  plugin: require('hapi-swagger'),
  options: {
    info: {
      title: 'URL Shortener API',
      description: 'URL Shortener API Documentation',
      version: '1.0.0',
    },
    swaggerUI: true,
    documentationPage: true,
    documentationPath: '/docs',
  },
};

export default swagger;
