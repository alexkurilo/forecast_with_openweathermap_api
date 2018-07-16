const initialState = {
    page: 1,
    index: -1,
    forecast: ""
};

export default function forecastInfoDetail (state = initialState, action){
    switch (action.type) {
        case "FETCH_FORECAST_DETAIL":
            //console.log(state);
            //console.log(action.payload.forecast);
            return action.payload;

        case 'NEXT_PAGE':
            //console.log(state);
            //console.log(action.payload);
            return Object.assign(state, {
                page: action.payload
            });

        default:
            return state;
    }
}