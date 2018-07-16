const initialState = "";

export default function selectedCountry (state = initialState, action){
    switch (action.type) {
        case "SELECT_COUNTRY":
            return  action.payload;

        default:
            return state;
    }
}