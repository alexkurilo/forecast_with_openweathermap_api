const initialState = [];

export default function forecastInfo (state = initialState, action){
    switch (action.type) {
        case "FETCH_FORECAST":
            return [
                ...state,
                action.payload
            ];

        case 'ON_DELETE_CARD':
            state.splice(action.payload, 1);
            return [
                ...state
            ];
        case "UPDATE_FORECAST":
            state.splice(action.payload.reSelected, 1);
            state.push({forecast: action.payload.forecast});
            return [
                ...state
            ];

        default:
            return [
                ...state
            ];
    }
}
