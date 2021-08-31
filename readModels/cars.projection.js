const { NEW_CAR, UPDATE_CAR } = require('../events/cars')
const tableName = 'Cars'


module.exports = {
    init: async store => {
        await store.defineTable(tableName, {
            id: {
                type: 'uuid',
                primaryKey: true,
            },
            keyIdentify: 'string',
            model: 'string',
            year: 'string',
            brand: 'string',
            createdAt: 'date',
            updatedAt: 'date'
        });
    },
    [NEW_CAR]: async (command, store) => {
        return await store.insert(tableName, {
            model: command.payload.model,
            year: command.payload.year,
            brand: command.payload.brand,
            keyIdentify: command.payload.keyIdentify
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