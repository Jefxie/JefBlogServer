const Service = require("egg").Service;

class UserService extends Service {
    async userRegister(data) {
        const { ctx } = this;
        const user = await ctx.model.User();

        user.login = data.login;
        user.id = data.id;
        user.name = data.name;
        user.email = data.email;
        user.avatar_url = data.avatar_url;
        user.bio = data.bio;
        user.blog = data.blog;
        user.location = data.location;
        user.created_at = Date.now();
        user.level = data.type;

        return user.save();
    }
    getOneUserinfo(id) {
        const {ctx} = this;
        return ctx.model.User.findOne({ id });
    }
}

module.exports = UserService;
