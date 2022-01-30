import React, {useCallback} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";
import {moveCartItemToIndex, removeContainerItem, replaceCartIngredients} from "../../services/actions/cart";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";

function ConstructorItem ({index}) {
    const cart = useSelector(store => store.cart.constructorData);
    const cartItem = cart[index];
    const targetHash = cartItem.hash;
    const dispatch = useDispatch();
    const removeItem = (hash) => {
        dispatch(removeContainerItem(hash))
    }

    // function moveItem(fromIndex, toIndex) {
    //     dispatch(replaceCartIngredients(fromIndex, toIndex));
    // }
    const moveItem = useCallback((dragIndex, hoverIndex) => {
        const newCards = [...cart];

        newCards.splice(hoverIndex, 0, newCards.splice(dragIndex, 1)[0]);
        dispatch({
            type: "EBIS_ONO_KONEM",
            payload: newCards
        });
    },[cart])
    const [{isDragging}, dragRef] = useDrag({
        type: "sort",
        item: {
            sourceHash: cartItem.hash,
            sourceIndex: index
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        end: (item, monitor) => {
            const { sourceHash, sourceIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                //moveItem()
            }
        }
    })
    const [, dropRef] = useDrop({
        accept: "sort",
        hover(item, monitor) {
            const { sourceHash } = item;
            const sourceIndex = cart.findIndex(item => item.hash === sourceHash);
            const targetIndex = cart.findIndex(item => item.hash === targetHash);
            if (targetIndex !== sourceIndex) {
                console.log("Ny vse, pizda!!", targetIndex, sourceIndex, cart)
                moveItem(sourceIndex, targetIndex)
                console.log("a teperb yje", cart)
            }
        }
    })


    const opacity = isDragging ? 0 : 1;

    return (
        <li className={styles.item} ref={(node) => dragRef(dropRef(node))} style={{ opacity }}>
            <div className={styles.icon}>
                <DragIcon type="primary" />
            </div>
            <div className="ml-8">
                <ConstructorElement
                    type={undefined}
                    isLocked={false}
                    text={cartItem.name}
                    price={cartItem.price}
                    thumbnail={cartItem.image}
                    handleClose={() => removeItem(cartItem.hash)}
                />
            </div>
        </li>
    );
}

export default ConstructorItem;

ConstructorItem.propTypes = {
    index: PropTypes.number.isRequired
}