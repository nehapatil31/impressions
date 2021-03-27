import { FETCH_NEWS, BOOKMARK } from '../constants/actionTypes';
import * as api from '../api';

export const getNews = () => async (dispatch) => {
    try {
        const { data } = await api.fetchNews();

        dispatch({ type: FETCH_NEWS, payload: data });
    } catch (error) {
        console.log(error);
    }

}
export const bookmarkNews = (title) => async (dispatch) => {
    try {
        const { data } = await api.bookmarkNews(title);

        dispatch({ type: BOOKMARK, payload: data });
    } catch (error) {
        console.log(error);
    }
}