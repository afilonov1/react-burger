import {
    GET_FEED_FAILED,
    GET_FEED_SUCCESS, SET_CART_OF_ITEM_ID, SET_ORDER,
} from '../actions/types/cart';
const initialState = {
    ingredientsData: null,
    initialConstructorIndexes: [0, 8, 3, 11, 10, 10, 11, 12, 4, 7, 0],
    constructorData: null,
    isFailed: false,
    order: {
        name: "",
        number: 0,
        cartSum: 0,
        cartIDs: []
    },
    cartOfItemID: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER: {
            return {
                ...state,
                order: {
                    ...state.order,
                    number: action.number,
                    cartSum: action.cartSum,
                    cartIDs: action.cartIDs,
                    name: action.name
                }
            }
        }
        case SET_CART_OF_ITEM_ID: {
            return {
                ...state,
                cartOfItemID: action.payload
            }
        }
        case GET_FEED_SUCCESS: {
            //console.log("state=",state, action)
            return {
                ...state,
                ingredientsData: action.payload,
                constructorData: state.initialConstructorIndexes.map((item, index) => action.payload[item])
            };
        }
        case GET_FEED_FAILED: {
            return {
                ...state,
                isFailed: true
            }
        }
        default: {
            return state;
        }
    }
};