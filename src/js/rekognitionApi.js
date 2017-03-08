var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});
var rekognition = new AWS.Rekognition();

var params = {
    Image: {
        S3Object: { Bucket: "testing-uswest2", Name: "IwERLBl.jpg" }
    },
    MaxLabels: 123,
    MinConfidence: 75
};

/**
* Summary:
*   Hits recognition retectLabels endpoint and prints out response.
*   Print error if error occurs. Display data otherwise.
*
*   @err The error message if error occurs.
*   @data Response in JSON format
*/
rekognition.detectLabels(params, function(err, data) {
    if (err)
        console.log(err, err.stack); // an error occurred
   else {
       for(var i = 0; i < data.Labels.length; i++) {
           console.log(
              data.Labels[i]["Confidence"] + "   " + data.Labels[i]["Name"]
          );
     }
   }
});
