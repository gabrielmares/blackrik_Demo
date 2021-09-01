const { NEW_CAR, UPDATE_CAR, EVENT_REJECTED } = require('../events/cars')
const tableName = 'Cars'


module.exports = {
    init: async store => {
        await store.defineTable(tableName, {
            id: {
                type: 'uuid',
                primaryKey: true,
            },
            model: 'string',
            year: 'string',
            brand: 'string',
            createdAt: 'date',
            updatedAt: 'date'
        });
    },
    [NEW_CAR]: async (store, event) => {
        return await store.insert(tableName, {
            model: event.payload.model,
            year: event.payload.year,
            brand: event.payload.brand,
            id: event.payload.keyIdentify
        })
    },
    [UPDATE_CAR]: async (store, { keyIdentify }) => {
        return await store.update(tableName, {
            keyIdentify
        }, {
            ...command.payload,
            updatedAt: Date.now()
        })
    },
    [EVENT_REJECTED]: async (store, { keyIdentify }) => {
        return await store.delete(tableName, { keyIdentify })
    }
}