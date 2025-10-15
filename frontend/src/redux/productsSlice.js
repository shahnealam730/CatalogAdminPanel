const initialState = { items: [], loading: false, error: null };

// action types
const FETCH_START = 'products/fetchStart';
const FETCH_SUCCESS = 'products/fetchSuccess';
const FETCH_FAIL = 'products/fetchFail';
const ADD_PRODUCT = 'products/addProduct';

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT:
      return { ...state, items: [action.payload, ...state.items] };
    default:
      return state;
  }
}

// action creators
import axios from 'axios';

export const fetchProducts = (query = '') => async dispatch => {
  dispatch({ type: FETCH_START });
  try {
    const res = await axios.get(`/api/products${query}`);
    dispatch({ type: FETCH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_FAIL, payload: err.message });
  }
};

export const addProduct = (product, token) => async dispatch => {
  try {
    const res = await axios.post('/api/products', product, { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: ADD_PRODUCT, payload: res.data });
    return res.data;
  } catch (err) {
    throw err;
  }
};
