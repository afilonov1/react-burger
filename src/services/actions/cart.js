import {GET_FEED_FAILED, GET_FEED_SUCCESS, SET_CART_OF_ITEM_ID, SET_ORDER} from "./types/cart";

export function getFeed (url) {
    return async function(dispatch) {
        try {
            const response = await fetch(url);
            let json;
            if (response.ok) {
                json = await response.json();
                dispatch(getFeedSuccess(json.data))
            } else {
                dispatch(getFeedError())
            }

        } catch {
            dispatch(getFeedError())
        }
    }
}

const getFeedSuccess = (data) => ({
    type: GET_FEED_SUCCESS,
    payload: data
})
const getFeedError = () => ({
    type: GET_FEED_FAILED
})
export const setOrder = (name, number, cartSum, cartIDs) => ({
    type: SET_ORDER,
    name,
    number,
    cartSum,
    cartIDs
})
