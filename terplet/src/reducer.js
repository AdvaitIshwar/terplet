export const initialState = {
    favorites: [],
    user: null,
};

function reducer(state, action){
    switch(action.type){
        case "ADD_TO_FAVORITES":
            return {
                ...state,
                favorites: [...state.favorites, action.item]
            };
            break;
        case "REMOVE_FROM_FAVORITES":
            return {state}
            break;
        default:
            break;
    }
};

export default reducer;