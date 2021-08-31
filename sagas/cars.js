const { NEW_CAR, UPDATE_CAR } = require('../events/cars');

const tableName = 'RegisteredCars';


module.exports = {
    handlers: {
        init: async store => {
            await store.defineTable(tableName, {
                id: {
                    type: 'uuid',
                    primaryKey: true,
                },
                keyIdentify: 'string'
            });
            return {
                noopSideEffectsOnReplay: true
            };
        },
        [NEW_CAR]: async (store, { payload: { keyIdentify, model, brand, year } }, sideEffects) => {
            if (await store.findOne(tableName, { keyIdentify }))
                return await sideEffects.executeCommand({
                    aggregateName: 'car',
                    aggregateId,
                    type: 'reject',
                    payload: {
                        reason: 'Model already exists'
                    }
                });
            await store.insert(tableName, { id, keyIdentify });
            await sideEffects.sendRegistrationMail({
                keyIdentify, model, brand, year
            });
        }
    },
    sideEffects: {
        sendRegistrationCar: async ({ model, brand, year, keyIdentify }) => {
            console.log(`Register created with identifier: ${keyIdentify}, with info about this car ${model}, ${brand}, ${year}> `);
        }
    }
};