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

    // mongodb配置
    config.mongoose = {
        // client: {
        //     url:'mongodb://127.0.0.1/jefblog',
        //     options: {
        //         user: "jefblog",
        //         pass: "jef@blog.db"
        //     }
        // }
        client: {
            url: "mongodb://127.0.0.1/jef_blog",
            options: {
                // user: "jefblog",
                // pass: "jef@blog.db"
            }
        }
    };
    // github passport config
    config.passportGithub = {
        key: "f03be718aa07234348ea",
        secret: "0f3eff9672e4f0a7a33513f9687af2cc8588be5e"
        // callbackURL: '/passport/github/callback',
        // proxy: false,
    };

    // cors
    config.cors = {
        origin: "http://127.0.0.1:3000",
        allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
        credentials: true
    };

    // 安全配置 开发时临时关闭csrf
    config.security = {
        csrf: {
            enable: false
        }
        // domainWhiteList: [
        //     "http://localhost:3000",
        //     "c",
        //     "http://127.0.0.1:3000/login",
        //     "http://127.0.0.1:7001"
        // ]
    };
    // 七牛生成token
    // config.qiniuToken = {
    //     accessKey: "gDdFqmUq-ZQJwBEwnexLN0zV3jwsXkkO93ZJe2zF",
    //     secretKey: "4iz6EAyiiJjPz2DR9mADDpAUNdk-Y020ZR5qc2HU",
    //     options: {
    //         scope: "jefblog",
    //         returnBody: `{"err":0,"data":"http://image.jef.site/$(key)"","key":"$(key)","hash":"$(etag)"}`
    //     }
    // };

    return config;
};
