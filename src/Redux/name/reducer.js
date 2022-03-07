const INITIAL_STATE = {
    presentName:"Sandesh"
}

const nameReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case "CHANGE_NAME":
            return {
                ...state,
                presentName:action.payload
            }
            
            break;
        case "ADD_NAME":
            return{
                ...state,
                presentName:state.presentName + action.payload
            }
            break;
        default:
            return state;
    }
} 



export default nameReducer;