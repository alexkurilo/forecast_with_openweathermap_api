const initialState = "";

export default function selectedCity (state = initialState, action){
    switch (action.type) {
        case "SELECT_CITY":
            return  action.payload;

        default:
            return state;
    }
}