const INITIAL_STATE = {
    "email":"",
    "password":"",
    "name":"",
    "mobile":"",
    "business_registered_name":"",
    "business_trade_name":"",
    "business_type":"",
    "address_1":"",
    "address_2":"",
    "country":"",
    "city":"",
    "postcode":"",
    "admin":false
}

const customerDetailsReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case "ADD_DETAILS":
            return {
                ...state,
               ...action.payload
            }
            
            break;
        default:
            return state;
    }
} 



export default customerDetailsReducer;