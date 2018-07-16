const initialState = [
    {
        name: '',
        id: ''
    }
];

export default function citiesArr (state = initialState, action){
    switch (action.type) {
        case "ADD_CITIES_ARR":
            return action.payload;

        default:
            return state;
    }
}