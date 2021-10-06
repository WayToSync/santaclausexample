const request = require("request");

module.exports = function httpRequest(userData, userInfo, outputData) {
  const { url, dataType } = userData;
  return new Promise((resolve, reject) => {
    const options = { json: true };
    request(url, options, (error, response, body) => {
      const indexData = body.findIndex(
        (jsonData) => jsonData[dataType] === userInfo
      );
      const userInfos = indexData > -1 ? body[indexData][outputData] : "";
      error ? reject(error) : resolve(userInfos);
    });
  });
};
