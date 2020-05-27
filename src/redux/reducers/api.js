const initialState = {
    global: [],
    country: [],
    loading: false
}

const api = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA_PENDING':
            return {
                ...state,
                loading: false
            }
        case 'GET_DATA_REJECTED':
            return {
                ...state,
                loading: false
            }
        case 'GET_DATA_FULFILLED':
            return {
                ...state,
                loading: true,
                global: action.payload.data.Global,
                country: action.payload.data.Countries
            }
        default:
            return state;
    }
}

export default api;