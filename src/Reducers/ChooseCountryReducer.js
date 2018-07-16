const initialState = {
    display: "block",
    nonDisplay: "none"
};

export default function changeDisplay (state = initialState, action){
    switch (action.type) {
        case "CHOOSE_COUNTRY":
            return  action.payload;

        default:
            return state;
    }
}