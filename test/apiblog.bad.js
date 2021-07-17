const { beforeEach, expect, it } = require('@jest/globals');
const { describe } = require('yargs');
const Api = require('../apiblog');

beforeEach(() => {
  fetch.resetMocks();
});

describe('apiBlog test', () => {
  it('should return score', async () => {
    // notice yet again, we mock the response once here BEFORE making the api call
    // which is a mock api call because of our setup.
    fetch.mockResponsesOnce(
      JSON.stringify({
        result: [
          {
            user: 'John Doe',
            score: 42,
          },
        ],
      })
    );
    // mock api call getting made.
    const res = await Api.getScores();
    // now we're able to setup our tests.
    // we expect mock api call to be made and return this data, and be called 1 time.
    expect(res).toEqual([{ score: 42, user: 'John Doe' }]);
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it('Should Return value for POST action', () => {
    fetch.mockResponseOnce(
      JSON.stringify([{ result: 'Leaderboard score created correctly.' }])
    );
    // setup mock response and mock error handling
    const onResponse = jest.fn();
    const onError = jest.fn();

    return Api.setScores()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();

        expect(onResponse.mock.calls[0][0][0]).toEqual({
          result: 'Leaderboard score created correctly.',
        });
      });
  });
});
