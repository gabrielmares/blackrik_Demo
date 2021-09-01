const Blackrik = require('blackrik');

module.exports = {
    aggregates: [
        {
            name: 'cars',
            commands: require('./aggregates/cars.commands'),
            projection: require('./aggregates/cars.projection')
        }
    ],
    readModels: [
        {
            name: 'cars',
            projection: require('./readModels/cars.projection'),
            resolvers: require('./readModels/cars.resolvers'),
            adapter: 'default'
        }
    ],
    sagas: [
        {
            name: 'cars',
            source: require('./sagas/cars'),
            adapter: 'default'
        }
    ],
    adapter: 'default',
    readModelStoreAdapters: {
        default: {
            module: Blackrik.ADAPTERS.READMODELSTORE.MySQL,
            args: {
                host: 'localhost',
                database: 'eventstore',
                user: 'root',
                password: '1234'
            }
        }
    },
    eventStoreAdapter: {
        module: Blackrik.ADAPTERS.EVENTSTORE.MySQL,
        args: {
            host: 'localhost',
            database: 'eventstore',
            user: 'root',
            password: '1234'
        }
    },
    eventBusAdapter: {
        module: Blackrik.ADAPTERS.EVENTBUS.Kafka,
        args: {
            brokers: ['localhost:9092']
        }

    },
    contextProvider: require('./auth/provider'),
    server: {
        middlewares: [
            require('./auth/middleware')
        ],
        routes: [
            {
                method: 'GET',
                path: '/cars',
                callback: require('./auth/provider')
            }
        ]
    }
};
