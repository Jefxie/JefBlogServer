"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    // 挂载鉴权路由
    app.passport.mount("github");

    // user
    router.get("/api/user", controller.user.userLogin);
    router.put("/api/user", controller.user.modifyUserInfo);

    // category
    router.get("/api/category", controller.category.getCategoryList);
    router.post("/api/category", controller.category.addCategory);
    router.put("/api/category", controller.category.modifyCategory);
    router.delete("/api/category", controller.category.deleteCategory);

    // article
    router.get("/api/article/:id", controller.article.getArticleDetail);
    router.get("/api/article", controller.article.getArticleList);
    router.post("/api/article", controller.article.addArticle);
    router.put("/api/article", controller.article.modifyArticle);
    router.delete("/api/article", controller.article.removeArticle);

    // comment
    router.get("/api/comment", controller.comment.getComment);
    router.post("/api/comment", controller.comment.addComment);
    router.delete("/api/comment", controller.comment.removeComment);
};
