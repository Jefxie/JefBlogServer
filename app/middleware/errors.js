module.exports = opt => {
    return async function errors(ctx, next) {
        try {
            ctx.body = {};
            await next();
            ctx.body.err = 0;
            ctx.body.msg = "ok";
        } catch (error) {
            if (typeof error !== "number") {
                ctx.body.msg = "服务器内部错误";
                ctx.logger.error(error);
            } else {
                ctx.body.msg = opt[`${error}`] || "";
            }
            ctx.body.err = error;
            ctx.logger.warn(ctx.body);
        }
    };
};
