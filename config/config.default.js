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
        client: {
            url:'mongodb://127.0.0.1/jefblog',
            options: {
                user: "jefblog",
                pass: "jef@blog.db"
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
        origin: "*",
        allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH"
    };

    // 安全配置 开发时临时关闭csrf
    // config.security = {
    //     csrf: {
    //         enable: false
    //     }
    // };
    return config;
};
