var AWS = require('aws-sdk');
var fs = require('fs')
var options = {
    partSize: 10 * 1024 * 1024, 
    queueSize: 1
};

var s3 = new AWS.S3();
var s3Bucket = new AWS.S3( 
    { 
        params: 
            {
                Bucket: 'testing-uswest2'
            } 
    }
);

AWS.config.loadFromPath('../json/credentials.json');

var params = {
    Key: "testImage2.jpg",
    Body: fs.createReadStream("../../img/testImage.jpg"),
    Bucket: "testing-uswest2",
};

s3Bucket.upload(params, options, function(err, data) {
    console.log(err, data);
});
