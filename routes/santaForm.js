"use strict";
const express = require("express");
const router = express.Router();
const httpRequest = require("../api/http-request");
const moment = require("moment");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const UID = "uid";
const BIRTHDAY = "birthdate";
const ADDRESS = "address";
let REQNUMBERS = 0;

const UsersInfos = {
  url: "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json",
  dataType: "username",
};

const ProfilesInfos = {
  url: "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json",
  dataType: "userUid",
};

function userAge(userBirthDate) {
  const dateNow = moment();
  const birthDayFormat = moment(
    userBirthDate.replaceAll("/", "-"),
    "YYYY-DD-MM"
  ).format("YYYY-MM-DD");
  return dateNow.diff(birthDayFormat, "years");
}

router.post("/", (request, response) => {
  const { userid, wish } = request.body;
  httpRequest(UsersInfos, userid, UID).then((userInfos) => {
    if (userInfos) {
      httpRequest(ProfilesInfos, userInfos, BIRTHDAY).then((userBirthDate) => {
        if (userAge(userBirthDate) < 10) {
          httpRequest(ProfilesInfos, userInfos, ADDRESS).then((userAddress) => {
            const submissionInfos = {
              name: userid,
              address: userAddress,
              wishList: wish,
            };
            //<-- One request per User
            // myCache.set(userid, submissionInfos);
            //-->

            //<-- Multiple request per User
            REQNUMBERS = REQNUMBERS + 1;
            myCache.set(REQNUMBERS, submissionInfos);
            //-->

            response.redirect(`/submission`);
          });
        } else {
          response.redirect(`/error`);
        }
      });
    } else {
      response.redirect(`/error`);
    }
  });
});

module.exports = {
  santaForm: router,
  myCache,
};
