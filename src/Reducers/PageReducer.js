const initialState = 1;

export default function page (state = initialState, action){
    switch (action.type) {
        case 'NEXT_PAGE':
            //console.log(state);
            //console.log(action.payload);
            return  action.payload;

        default:
            return state;
    }
}