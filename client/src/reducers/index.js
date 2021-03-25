import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import news from './news';

export default combineReducers({
    posts,
    auth,
    news
})