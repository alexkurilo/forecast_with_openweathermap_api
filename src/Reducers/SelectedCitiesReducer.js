const initialState = [];

export default function selectedCities (state = initialState, action){
    switch (action.type) {
        case "SELECTED_CITIES":
            return  [
                ...state,
                action.payload
            ];
        case 'ON_DELETE_CARD':
            state.splice(action.payload, 1);
            return [
                ...state
            ];
/*
        case "UPDATE_SELECTED_CITIES":
            state.splice(action.payload.reSelected, 1);
            state.push({
                selectedCity: action.payload.selectedCity,
                selectedCityId: action.payload.selectedCityId,
                selectedCountryCode: action.payload.selectedCountryCode
            });
            return  [
                ...state
            ];*/

        default:
            return state;
    }
}