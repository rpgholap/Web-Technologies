const initialState = {score:0};
export const scoreReducer = (state=initialState, action) => {
    switch (action.type) {
        case "INCREMENT_SCORE": return {score: state.score + 2 }
        case "DECREMENT_SCORE": return {score: state.score - 1 }
        default: return state;
    }
}