const {
    NEW_CAR,
    UPDATE_CAR
} = require('../events/cars');


const {
    ConflictError,
    BadRequestError,
    ForbiddenError
} = require('../errors');


module.exports = {
    register: async (command, state/* , context */) => {
        if (state.registered)
            throw new ConflictError('Car already registered');
        if (!command.payload.model)
            throw new BadRequestError('Please provide an email address');
        if (!command.payload.year)
            throw new BadRequestError('Please provide a year');
        if (!command.payload.brand)
            throw new BadRequestError('Please provide a brand');

        return {
            type: NEW_CAR,
            payload: {
                ...command.payload
            }
        };
    },
    update: async (command, state) => {
        if (!state.registered || state.removed)
            throw new ForbiddenError();

        const { model, brand, year } = command.payload
        if (!model || !brand || !year)
            throw new BadRequestError('Please specify a new model and/or a new year');
        if (state.model === model && state.year === year)
            throw new BadRequestError(`Name is already set to '${state.model}' and '${state.year}`);

        return {
            type: UPDATE_CAR,
            payload: {
                ...command.payload
            }
        };
    }
};
