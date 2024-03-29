const { storyServer } = require('../../../database/driver');
const mocks = require('node-mocks-http');
const { storiesInput, storiesOutput } = require('../../../data/stories');
const storyController = require('../../../controllers/storyController');

jest.mock('../../../utils/responseHandler');
const responseHandler = require('../../../utils/responseHandler');

describe('Testing story controller', () => {
  test('testing createStory method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest
      .spyOn(storyServer, 'createStory')
      .mockReturnValue(storiesOutput[0].dataValues);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 201;
        return res.json({
          status: 'success',
          message: 'story created successfully',
          data: storiesOutput[0].dataValues,
        });
      }
    );
    await storyController.createStory(req, res, nextFn);

    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(jsonData.data).toEqual(storiesOutput[0].dataValues);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('story created successfully');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(storyServer.createStory).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing getAllStory method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest.spyOn(storyServer, 'getAllStory').mockImplementation(() => {
      var stories = storiesOutput.map(function (item) {
        return item.dataValues;
      });
      return stories;
    });

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'sent all story data',
          data: storiesOutput.map(function (item) {
            return item.dataValues;
          }),
        });
      }
    );
    await storyController.getAllStory(req, res, nextFn);
    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('sent all story data');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(storyServer.getAllStory).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing getStory method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest.spyOn(storyServer, 'getStory').mockImplementation(() => {
      return storiesOutput[0].dataValues;
    });

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'sent story data',
          data: storiesOutput[0].dataValues,
        });
      }
    );
    await storyController.getStory(req, res, nextFn);
    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('sent story data');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(storyServer.getStory).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing updateStory method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest.spyOn(storyServer, 'updateStory').mockReturnValue([1]);
    jest
      .spyOn(storyServer, 'getStory')
      .mockReturnValue(storiesOutput[0].dataValues);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'story was updated successfully!',
          data: storiesOutput[0].dataValues,
        });
      }
    );
    await storyController.updateStory(req, res, nextFn);
    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(jsonData.data).toEqual(storiesOutput[0].dataValues);
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('story was updated successfully!');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(storyServer.updateStory).toHaveBeenCalledTimes(1);
    expect(storyServer.getStory).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing deleteStory method : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = () => {
      console.log('Some Error Occurred');
    };

    jest.spyOn(storyServer, 'deleteStory').mockReturnValue([1]);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 204;
        return res.json({
          status: 'success',
          message: 'story was deleted successfully!',
          data: {},
        });
      }
    );
    await storyController.deleteStory(req, res, nextFn);
    const jsonData = res._getJSONData();
    expect(res.statusCode).toBe(204);
    expect(jsonData.data).toEqual({});
    expect(jsonData.status).toBe('success');
    expect(jsonData.message).toBe('story was deleted successfully!');
    expect(responseHandler).toHaveBeenCalledTimes(1);
    expect(storyServer.deleteStory).toHaveBeenCalledTimes(1);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing getStory method with no data: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = (err) => {
      //console.log('some error occured');
      return err;
    };

    jest.spyOn(storyServer, 'getStory').mockImplementation(() => {
      return 0;
    });

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'sent story data',
          data: storiesOutput[0].dataValues,
        });
      }
    );
    const err = await storyController.getStory(req, res, nextFn);
    //console.log(err);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
    expect(err.isOperational).toBe(true);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing updateStory method with no data : ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = (err) => {
      //console.log('Some Error Occurred');
      return err;
    };

    jest.spyOn(storyServer, 'updateStory').mockReturnValue([0]);
    jest
      .spyOn(storyServer, 'getStory')
      .mockReturnValue(storiesOutput[0].dataValues);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 200;
        return res.json({
          status: 'success',
          message: 'story was updated successfully!',
          data: storiesOutput[0].dataValues,
        });
      }
    );
    const err = await storyController.updateStory(req, res, nextFn);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
    expect(err.isOperational).toBe(true);
    jest.unmock('../../../utils/responseHandler');
  });

  test('testing deleteStory method with no data: ', async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const req = mocks.createRequest();
    const res = mocks.createResponse();
    const nextFn = (err) => {
      //console.log('Some Error Occurred');
      return err;
    };

    jest.spyOn(storyServer, 'deleteStory').mockReturnValue(0);

    responseHandler.mockImplementation(
      (req, res, statusCode, data, message, status) => {
        res.statusCode = 204;
        return res.json({
          status: 'success',
          message: 'story was deleted successfully!',
          data: {},
        });
      }
    );
    const err = await storyController.deleteStory(req, res, nextFn);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
    expect(err.isOperational).toBe(true);
    jest.unmock('../../../utils/responseHandler');
  });
});

// node-mock-htttp
// test('test TRashfiq', () => {
//   expect(2).toBe(2);
// });
