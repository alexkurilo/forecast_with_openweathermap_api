const initialState = -1;

export default function indexFocusCard (state = initialState, action){
    switch (action.type) {
        case 'FOCUS_CARD':

            return  action.payload;

        default:
            return state;
    }
}