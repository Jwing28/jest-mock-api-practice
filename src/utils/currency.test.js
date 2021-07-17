const convert = require('./currency');

beforeEach(() => {
  fetch.resetMocks();
});

// test happy path, call was mocked and prev calls cleared before making this request
// receive data back from api call.
it('finds exchange', async () => {
  fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));
  const rate = await convert('USD', 'CAD');

  expect(rate).toEqual(1.42);
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('returns null when exception', async () => {
  // allows us to override default mock behavior and specify what we think should be returned
  fetch.mockReject(() => Promise.reject('API is down'));

  // make our mock call. granted here we might provide diff argument for bad response.
  const rate = await convert('USD', 'CAD');

  // expect bad value because provided our own expected response.
  expect(rate).toEqual(null);
  expect(fetch).toHaveBeenCalledWith(
    'https://api.exchangeratesapi.io/latest?base=USD'
  );
});
