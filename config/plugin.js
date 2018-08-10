"use strict";

// had enabled by egg
// exports.static = true;

const plugins = {
    mongoose: {
        enable: true,
        package: "egg-mongoose"
    },
    passport: {
        enable: true,
        package: "egg-passport"
    },
    passportGithub: {
        enable: true,
        package: "egg-passport-github"
    },
    cors: {
        enable: true,
        package: "egg-cors"
    },
    validate: {
        enable: true,
        package: "egg-validate"
    }
};

module.exports = plugins;
