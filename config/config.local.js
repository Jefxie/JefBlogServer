"use strict";

module.exports = appInfo => {
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1533178731352_5618";

    // add your config here
    config.middleware = ["errors"];

    // 错误集中处理
    config.errors = {
        "1": "未登录或登录信息失效",
        "2": "用户名或密码错误",
        "3": "参数错误",
        "4": "权限不足"
    };

    config.returnTo = {
        api: "http://127.0.0.1:7001/api/user/login",
        to: "http://localhost:3010/login"
    };

    // mongodb配置
    config.mongoose = {
        client: {
            url: "mongodb://127.0.0.1/jef_blog",
            options: {}
        }
    };
    // github passport config
    config.passportGithub = {
        key: "e4007a4eb776489e4d70",
        secret: "55928e4e5e9a083c5880bd2dd6d7e7aaf00b9f04"
    };

    // cors
    config.cors = {
        origin: "http://localhost:3010",
        allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
        credentials: true
    };

    // 安全配置 开发时临时关闭csrf
    config.security = {
        csrf: {
            enable: false
        }
    };
    // 七牛生成token
    config.qiniuToken = {
        accessKey: "*",
        secretKey: "*",
        options: {
            scope: "jefblog",
            returnBody: `{"err":0,"data":"http://image.jef.site/$(key)","key":"$(key)","hash":"$(etag)"}`
        }
    };

    return config;
};
