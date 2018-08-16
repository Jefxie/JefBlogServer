"use strict";

const Controller = require("egg").Controller;

class Notice extends Controller {
    async modifyNotice() {
        const { ctx } = this;
        const { id } = ctx.params;
        if (!id) throw 1;
        const notice = await ctx.service.notice.gerOneNotice(id);
        notice.state = 0;

        notice.save();
    }
    async getNoticeList() {
        const { ctx } = this;
        const { query = {} } = ctx;
        if (!query.id) throw 1;
        const res = await ctx.service.notice.getNoticeList(
            query.id,
            query.state
        );
        ctx.body.data = res;
    }
    async getNoticeCount() {
        const { ctx } = this;
        const { body = {} } = ctx.request;
        if (!body.id) throw 1;
        const res = await ctx.service.notice.getNoticeCount(
            body.id,
            body.state
        );
        ctx.body.data = res;
    }
}

module.exports = Notice;
