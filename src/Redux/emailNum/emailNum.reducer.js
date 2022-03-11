const INITIAL_STATE = {
    emailNum:""
 }
 
 const emailNumReducer = (state = INITIAL_STATE,action) => {
     switch (action.type) {
         case "CHANGE_EMAIL_NUM":
             return {
                ...state,
                emailNum:action.payload
             }
             
             break;
         
         default:
             return state;
     }
 } 
 
 
 
 export default emailNumReducer;