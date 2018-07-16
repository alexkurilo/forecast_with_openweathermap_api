const initialState = [];

export default function selectedCountries (state = initialState, action){
    switch (action.type) {
        case "SELECTED_COUNTRIES":
            return  [
                ...state,
                action.payload
                ];

        default:
            return state;
    }
}