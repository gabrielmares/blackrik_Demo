const { NEW_CAR, UPDATE_CAR } = require('../events/cars')
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
    [UPDATE_CAR]: async (command, store) => {
        return await store.update(tableName, {
            id: command.id
        }, {
            ...command.payload,
            updatedAt: Date.now()
        })
    }
}