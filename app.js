module.exports = app => {
    app.passport.verify(async (ctx, user) => {
        ctx.session.returnTo = "http://127.0.0.1:7001/api/user/login/";
        // 检查用户
        try {
            const existsUser = await ctx.model.User.findOne({ id: user.id });
            if (existsUser) {
                return existsUser;
            }
        } catch (error) {
            return;
        }
        // 调用 service 注册新用户
        const newUser = await ctx.service.user.userRegister(user.profile._json);
        return newUser;
    });

    // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
    app.passport.serializeUser(async (ctx, user) => {
        // 处理 user
        user = user.id;

        return user;
    });

    // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    app.passport.deserializeUser(async (ctx, user_id) => {
        const user = await ctx.model.User.findOne(
            { id: user_id },
            { _id: 0, __v: 0 }
        );

        return user;
    });
};
