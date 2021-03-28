import { AUTH, LOGOUT, BOOKMARK } from 'constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

			return { ...state, authData: action?.data };
		case LOGOUT:
			localStorage.clear();
			return { ...state, authData: null };
		case BOOKMARK:
			localStorage.setItem('profile', JSON.stringify({...JSON.parse(localStorage.getItem('profile')),...action.payload}));

			return { ...state, authData: action?.payload };
		default:
			return state;
	}
}

export default authReducer;