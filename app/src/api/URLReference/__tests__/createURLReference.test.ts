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
describe('Create URL Reference', () => {
  let server: Server;
  const url = '/url';
  const method = 'POST';

  beforeAll(async () => {
    server = await serverInit();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('it should return 201 with valid payload', async () => {
    const fakeURL = faker.internet.url();
    jest.spyOn(URLReference, 'create');

    const injectOptions: ServerInjectOptions = {
      method,
      url,
      payload: {
        url: fakeURL,
      },
    };
    const response = await server.inject(injectOptions);
    expect(URLReference.create).toBeCalledTimes(1);
    expect(response.statusCode).toEqual(201);

    const payload = JSON.parse(response.payload);
    expect(payload).toHaveProperty('url');
    expect(payload).toHaveProperty('urlHash');
  });

  it('it should return 400 with empty payload', async () => {
    const injectOptions: ServerInjectOptions = {
      method,
      url,
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(400);
  });

  it('it should return 400 with invalid payload', async () => {
    const injectOptions: ServerInjectOptions = {
      method,
      url,
      payload: {
        testing: faker.internet.url(),
      },
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(400);
  });

  it('it should return 400 with invalid payload data', async () => {
    const injectOptions: ServerInjectOptions = {
      method,
      url,
      payload: {
        url: faker.name,
      },
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(400);
  });
});
