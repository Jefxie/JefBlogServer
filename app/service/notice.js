const Service = require("egg").Service;

class NoticeService extends Service {
    async addNotice(data) {
        const { ctx } = this;
        const notice = await ctx.model.Notice();
        notice._id = ctx.uuid(2);
        notice.type = "comment";
        notice.created_at = Date.now();
        notice.state = 1;
        notice.from = data.from;
        notice.to = data.to;
        notice.target = data.target;

        return notice.save();
    }
    async getNoticeList(to = "", state = 0) {
        const { ctx } = this;
        const _param = {};
        if (to) {
            _param.to = to;
        }
        if (state) {
            _param.state = state;
        }
        return ctx.model.Notice.find(_param, { __v: 0 })
            .populate("from", "-_id name login")
            .populate("target", "-_id id title")
            .sort({ create_at: -1 });
    }
    getNoticeCount(to = "", state = 1) {
        const { ctx } = this;
        return ctx.model.Notice.count({ to, state });
    }
    gerOneNotice(_id) {
        const { ctx } = this;
        return ctx.model.Notice.findOne({ _id }, { __v: 0 });
    }
    removeNotice(_id) {
        return this.ctx.model.Notice.remove({ _id }).exec();
    }
}

module.exports = NoticeService;
