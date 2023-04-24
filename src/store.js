import { legacy_createStore as createStore,applyMiddleware} from 'redux'
import rootReduces from './redux/reducers'
import logger from 'redux-logger';
const Store = createStore(rootReduces,applyMiddleware(logger))

export default Store;