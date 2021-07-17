const axios = require('./axiosConfig');
const getPhotosByAlbumId = require('./index');

// jest.mock mocks the thing that makes the request (axios)
// now, if we make a get request, the mock call via jest is made, not the actual api call
jest.mock('./axiosConfig', () => {
  return {
    baseURL: 'https://jsonplaceholder.typicode.com/albums',
    // notice jest.fn which replaces the actual request
    // mockResolvedValue() is the same as mockImplementation(() => Promise.resolve(value)).
    request: jest.fn().mockResolvedValue({
      data: [
        {
          albumId: 3,
          id: 101,
          title: 'incidunt alias vel enim',
          url: 'https://via.placeholder.com/600/e743b',
          thumbnailUrl: 'https://via.placeholder.com/150/e743b',
        },
        {
          albumId: 3,
          id: 102,
          title:
            'eaque iste corporis tempora vero distinctio consequuntur nisi nesciunt',
          url: 'https://via.placeholder.com/600/a393af',
          thumbnailUrl: 'https://via.placeholder.com/150/a393af',
        },
        {
          albumId: 3,
          id: 103,
          title: 'et eius nisi in ut reprehenderit labore eum',
          url: 'https://via.placeholder.com/600/35cedf',
          thumbnailUrl: 'https://via.placeholder.com/150/35cedf',
        },
      ],
    }),
  };
});

describe('test getPhotosByAlbumId', () => {
  // reset state of all mocks
  afterEach(() => jest.resetAllMocks());

  it('fetches photos by album id', async () => {
    const photos = await getPhotosByAlbumId(3);
    expect(axios.request).toHaveBeenCalled();
    expect(axios.request).toHaveBeenCalledWith({
      method: 'get',
      url: '/3/photos?_limit=3',
    });
    expect(photos.length).toEqual(3);
    expect(photos[0].albumId).toEqual(3);
  });
});
