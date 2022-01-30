import {
    ADD_CONTAINER_ITEM,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    MOVE_CART_ITEM_TO_INDEX, POST_ORDER_ERROR, POST_ORDER_REQUEST, POST_ORDER_SUCCESS,
    REMOVE_CONTAINER_ITEM,
    REPLACE_CART_INGREDIENTS,
    SET_CONTAINER_BUN,
    SET_ORDER,
} from '../actions/types/cart';
const initialState = {
    ingredientsData: null,
    initialConstructorIndexes: [0, 8, 3, 11, 10, 10, 11, 12, 4, 7, 0],
    constructorData: null,
    getIngredients: {
        isRequest: false,
        isSuccess: false,
        isError: false,
    },
    postOrder: {
        isRequest: false,
        isSuccess: false,
        isError: false,
    },
    order: {
        name: "",
        number: 0,
        cartSum: 0,
        cartIDs: []
    },
};

function getHash(id) {
    return id + Math.random() + new Date().getTime();
}
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
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                getIngredients: {
                    ...state.getIngredients,
                    isRequest: true,
                }
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                getIngredients: {
                    ...state.getIngredients,
                    isRequest: false,
                    isSuccess: true,
                    isError: false
                },
                ingredientsData: action.payload,
                constructorData: state.initialConstructorIndexes.map((item, index) => ({
                    ...action.payload[item],
                    hash: getHash(action.payload[item]._id)
                }))
            };
        }

        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                getIngredients: {
                    ...state.getIngredients,
                    isRequest: false,
                    isSuccess: false,
                    isError: true
                }
            }
        }
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                postOrder: {
                    ...state.postOrder,
                    isRequest: true,
                }
            }
        }
        case POST_ORDER_SUCCESS: {
            const name = action.payload.name;
            const number = action.payload.order.number;
            const cartIDs = action.cartIDs;
            const cartSum = cartIDs.reduce((acc, next) => state.ingredientsData.find(item => item._id === next).price + acc, 0);
            return {
                ...state,
                postOrder: {
                    ...state.postOrder,
                    isRequest: false,
                    isSuccess: true,
                    isError: false
                },
                order: {
                    ...state.order,
                    name,
                    number,
                    cartSum,
                    cartIDs
                }
            };
        }
        case POST_ORDER_ERROR: {
            return {
                ...state,
                postOrder: {
                    ...state.postOrder,
                    isRequest: false,
                    isSuccess: false,
                    isError: true
                }
            }
        }
        case ADD_CONTAINER_ITEM: {
            const constructor = state.constructorData;
            const ingredients = state.ingredientsData;
            const newItem = ingredients.find(item => item._id === action.id);
            return {
                ...state,
                constructorData: [
                    ...constructor.slice(0, -1),
                    {
                        ...newItem,
                        hash: getHash(action.id)
                    },
                    ...constructor.slice(-1)
                ]
            }
        }
        case SET_CONTAINER_BUN: {
            const constructor = state.constructorData;
            const ingredients = state.ingredientsData;
            const newBun = ingredients.find(item => item._id === action.id);
            return {
                ...state,
                constructorData: [
                    {
                        ...newBun,
                        hash: getHash(action.id)
                    },
                    ...constructor.slice(1, -1),
                    {
                        ...newBun,
                        hash: getHash(action.id)
                    }
                ]
            }
        }
        case REMOVE_CONTAINER_ITEM: {
            return {
                ...state,
                constructorData: state.constructorData.filter(item => item.hash !== action.hash)
            }
        }
        case REPLACE_CART_INGREDIENTS: {
            //const firstItem = state.constructorData[action.indexFrom]
            const firstItemIndex = action.indexFrom;
            const secondItemIndex = action.indexAt;
            const cart = state.constructorData;
            [cart[firstItemIndex], cart[secondItemIndex]] = [cart[secondItemIndex], cart[firstItemIndex]]
            return {
                ...state,
                constructorData: cart
            }
        }
        case MOVE_CART_ITEM_TO_INDEX: {
            const cart = state.constructorData;
            const item = cart.find(elem => elem.hash === action.hash);
            const cartWitchDeletedItem = cart.filter(item => item.hash !== action.hash);
            cartWitchDeletedItem.splice(action.indexAt, 0, item);
            return {
                ...state,
                constructorData: cartWitchDeletedItem
            }
        }
        default: {
            return state;
        }
    }
};