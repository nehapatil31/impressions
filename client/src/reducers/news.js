import { FETCH_NEWS } from '../constants/actionTypes';

const newsReducer = (state = { newsData: null }, action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return { ...state, newsData: action?.payload };
        default:
            return state;
    }
}

export default newsReducer;