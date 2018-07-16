const initialState = [];

export default function countriesObj (state = initialState, action){
    switch (action.type) {
        case "ADD_COUNTRIES_OBJ":
            return [
                ...state,
                action.countryObj
            ];

        default:
            return state;
    }
}