/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Server, ServerInjectOptions } from '@hapi/hapi';
import faker from 'faker';
import { serverInit } from 'server';
import { URLReference } from 'models/URLReference';

/////////////////////////////////////////
/*             define test             */
/////////////////////////////////////////
describe('Get URL Reference', () => {
  let server: Server;
  const fakeURL = faker.internet.url();
  const fakeURLHash = faker.random.alphaNumeric(15);
  const url = '/url';
  const method = 'GET';

  beforeAll(async () => {
    server = await serverInit();
    await URLReference.create({
      originalURL: fakeURL,
      URLHash: fakeURLHash,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await server.stop();
    await URLReference.destroy({
      where: {},
      truncate: true,
    });
  });

  it('it should return 200 with valid url hash', async () => {
    jest.spyOn(URLReference, 'findOne');

    const injectOptions: ServerInjectOptions = {
      method,
      url: `${url}/${fakeURLHash}`,
      payload: {
        url: fakeURL,
      },
    };
    const response = await server.inject(injectOptions);
    expect(URLReference.findOne).toBeCalledTimes(1);
    expect(response.statusCode).toEqual(200);

    const payload = JSON.parse(response.payload);
    expect(payload).toEqual({
      url: fakeURL,
      urlHash: fakeURLHash,
    });
  });

  it('it should return 404 with invalid url hash', async () => {
    jest.spyOn(URLReference, 'findOne');

    const injectOptions: ServerInjectOptions = {
      method,
      url: `${url}/${faker.random.alphaNumeric(15)}`,
    };

    const response = await server.inject(injectOptions);
    expect(URLReference.findOne).toBeCalledTimes(1);
    expect(response.statusCode).toEqual(404);
  });

  it('it should return 404 with invalid url hash format', async () => {
    const injectOptions: ServerInjectOptions = {
      method,
      url: `${url}/${faker.random.alphaNumeric(10)}`,
    };
    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(400);
  });
});
