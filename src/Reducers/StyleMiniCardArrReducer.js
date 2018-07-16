const initialState = {
    left: 0,
    top: 0,
    width: 0
};

export default function styleMiniCardArr (state = initialState, action){
    switch (action.type) {
        case "STYLE_MINI_CARD_ARR":
            //console.log(state);
            //console.log(action.payload.forecast);
            return action.payload;

        default:
            return state;
    }
}