// import { APIRequest } from './api';

// // define our testing
// describe('testing api', () => {
//   // want to do this when mock fetch > 1
//   // want to reset it across our tests to assert
//   // on the arguments given to the fetch
//   beforeEach(() => {
//     fetch.resetMocks();
//   });

//   it('calls google and returns data to me', async () => {
//     // notice that we mocked the response BEFORE making the request.
//     fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

//     // assert on response
//     const res = await APIRequest('google');
//     expect(res.data).toEqual('12345');

//     // assert on times called & arguments given to fetch
//     expect(fetch.mock.calls.length).toEqual(1);
//     expect(fetch.mock.calls[0][0]).toEqual('http://google.com');
//   });
// });

//api.test.js
import { APIRequest } from './api';

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls google and returns data to me', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

    //assert on the response
    const res = await APIRequest('google');
    expect(res.data).toEqual('12345');

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('https://google.com');
  });
});
