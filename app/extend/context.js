module.exports = {
    uuid(count) {
        let u = String(Math.random()).slice(2);
        if (!count) return u;
        for (let i = 0; i < count; i++) {
            u += `-${String(Math.random()).slice(2)}`;
        }
        return u;
    }
};
