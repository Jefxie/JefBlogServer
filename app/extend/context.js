module.exports = {
    uuid(count) {
        let u = String(Math.random()).slice(2);
        if (!count) return u;
        for (let i = 0; i < count; i++) {
            u += `-${String(Math.random()).slice(2)}`;
        }
        return u;
    },
    deepClone(obj) {
        let str,
            newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== "object") {
            return;
        } else if (JSON) {
            (str = JSON.stringify(obj)), //序列化对象
                (newobj = JSON.parse(str)); //还原
        } else {
            //如果不支持以上方法
            for (let i in obj) {
                newobj[i] =
                    typeof obj[i] === "object" ? cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }
};
