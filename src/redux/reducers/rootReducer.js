export function rootReducer(state, action){
    if (action.type === 'xxx'){
        return state +1;
    }

    return state;
}