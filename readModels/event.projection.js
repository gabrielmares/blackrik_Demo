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
            year: 'number',
            brand: 'string',
            createdAt: 'date',
            updatedAt: 'date'
        });
    },
    [NEW_CAR]: (command, store) => {
        return await store.insert(tableName, {
            ...command.payload
        })
    },
    [UPDATE_CAR]: (command, store) => {
        return await store.update(tableName, {
            id: command.id
        }, {
            ...command.payload,
            updatedAt: Date.now()
        })
    }
}