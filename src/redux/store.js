import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers';

const logger = createLogger({});

const store = createStore(
    reducers,
    compose(
        applyMiddleware(
            logger,
            promiseMiddleware
        )
    )
)

export { store }