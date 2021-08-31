const {
    NEW_CAR,
    UPDATE_CAR
} = require('../events/cars');

module.exports = {
    init: () => ({}),
    [NEW_CAR]: (state, { payload }) => ({
        ...state,
        ...payload,
        registered: true
    }),
    [UPDATE_CAR]: (state, { payload }) => ({
        ...state,
        ...payload
    })
};
