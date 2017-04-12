/*
    This contains the default callbacks (as demonstrated in the AWS SDK
    documentation) for the DBContoller DynamoDB calls.
*/

exports.delete = (err, data) => {
  if (err) {
    console.error('Unable to delete item. Error JSON: ', JSON.stringify(err, null, 2));
  } else {
    console.log('DeleteItem succeeded: ', JSON.stringify(data, null, 2));
  }
};

exports.get = (err, data) => {
  if (err) {
    console.error('Unable to read item. Error JSON: ', JSON.stringify(err, null, 2));
  } else {
    console.log('GetItem succeeded: ', JSON.stringify(data, null, 2));
  }
};

exports.put = (err, data) => {
  if (err) {
    console.error('Unable to add item. Error JSON: ', JSON.stringify(err, null, 2));
  } else {
    console.log('Added item: ', JSON.stringify(data, null, 2));
  }
};

exports.update = (err, data) => {
  if (err) {
    console.error('Unable to update item. Error JSON: ', JSON.stringify(err, null, 2));
  } else {
    console.log('UpdateItem succeeded: ', JSON.stringify(data, null, 2));
  }
};
