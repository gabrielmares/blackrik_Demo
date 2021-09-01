module.exports = (req = null) => {
    return {
        user: req?.body?.token ?? 'system'
    };
};
