const initialState = {};

export default function citiesInform (state = initialState, action){
    switch (action.type) {
        case "FILL_STORES_WITH_CITIES":
            return action.payload;

        default:
            return state;
    }
}