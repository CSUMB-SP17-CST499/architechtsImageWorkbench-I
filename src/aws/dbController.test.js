import AWS from 'aws-sdk';

import awsconfig from './aws-config';
import DBController from './dbcontroller';

/*
    Tests for the DBController class. "test" table is cleared and repopulated
    each time the tests are run.
*/

describe('DBController test suite', () => {

  let dbc;
  let params;

  beforeAll(() => {
    dbc = new DBController();

    AWS.config = awsconfig;

    const docClient = new AWS.DynamoDB.DocumentClient();
    const dels = require('../../json/pre/dels.json');
    const puts = require('../../json/pre/puts.json');

    return new Promise((fulfill, reject) => {
      docClient.batchWrite(dels, (err, data) => {
        if (err) reject();
        docClient.batchWrite(puts, (err, data) => {
          if (err) reject();
          fulfill();
        });
      });
    });
  });

  test('DBController deletes a record from "test" table', done => {
    params = require('../../json/test/del.json');

    dbc.get(params, (err, data) => {
      expect(data.Item.uuid).toBe('96f43493-9820-4e33-a235-855a65cb3f8e');
      expect(data.Item.message).toBe('This record will be deleted.');

      dbc.delete(params, (err, data) => {
        expect(err).toBeNull();

        dbc.get(params, (err, data) => {
          expect(data).toEqual({});
          done();
        });
      });
    });
  });

  test('DBController gets a record from "test" table', done => {
    params = require('../../json/test/get.json');

    dbc.get(params, (err, data) => {
      expect(data.Item.uuid).toBe('3d808379-41b3-44fd-8166-3d2aacf51e52');
      expect(data.Item.message).toBe('This is a test record.');
      done();
    });
  });

  test('DBController puts a record into "test" table', done => {
    params = require('../../json/test/put.json');

    var get_params = {
      TableName: "test",
      Key: {
        uuid: "dc498c48-0951-46e7-9e31-d162feeda9b7"
      }
    };
    expect(get_params.Key.uuid).toBe(params.Item.uuid);

    dbc.get(get_params, (err, data) => {
      expect(data).toEqual({});

      dbc.put(params, (err, data) => {
        expect(err).toBeNull();

        dbc.get(get_params, (err, data) => {
          expect(data.Item.uuid).toBe('dc498c48-0951-46e7-9e31-d162feeda9b7');
          expect(data.Item.message).toBe('This is also a test record.');
          done();
        });
      });
    });
  });

  test('DBController updates a record in "test" table', done => {
    params = require('../../json/test/upd.json');
    var get_params = {
      TableName: 'test',
      Key: {
        uuid: '3c9714db-ef66-431e-b309-df73317e2a45'
      }
    };
    expect(get_params.Key.uuid).toBe(params.Key.uuid);

    dbc.get(get_params, (err, data) => {
      expect(data.Item.uuid).toBe('3c9714db-ef66-431e-b309-df73317e2a45');
      expect(data.Item.message).toBe('This record will be updated.');

      dbc.update(params, (err, data) => {
        expect(err).toBeNull();

        dbc.get(get_params, (err, data) => {
          expect(data.Item.uuid).toBe('3c9714db-ef66-431e-b309-df73317e2a45');
          expect(data.Item.message).toBe('This is an updated record.');
          done();
        });
      });
    });
  });
});
