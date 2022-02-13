import React, {useCallback} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";
import {moveCartItemToIndex, removeContainerItem, replaceCartIngredients} from "../../services/actions/cart";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";

function ConstructorItem({index}) {
  const cart = useSelector(store => store.cart.constructorData);
  const ingredient = cart[index];
  const {hash} = ingredient;
  const dispatch = useDispatch();
  const removeItem = (hash) => {
    dispatch(removeContainerItem(hash))
  }


  const findCard = useCallback((hash) => {
    const card = cart.filter((c) => `${c.hash}` === hash)[0];
    return {
      card,
      index: cart.indexOf(card),
    };
  }, [cart]);
  const moveCard = useCallback((hash, atIndex) => {
    const {index} = findCard(hash);
    dispatch(replaceCartIngredients(index, atIndex));
  }, [findCard, dispatch]);
  const originalIndex = findCard(hash).index;
  const [{isDragging}, drag] = useDrag(() => ({
    type: "sort",
    item: {hash, originalIndex},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const {hash: droppedHash, originalIndex} = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        dispatch(moveCartItemToIndex(droppedHash, originalIndex));
      }
    },
  }), [hash, originalIndex, moveCard]);
  const [, drop] = useDrop(() => ({
    accept: "sort",
    hover({hash: draggedHash}) {
      //const isItemInCart = cart.filter(item => item.hash === draggedHash).length !== 0;
      if (draggedHash !== hash) {
        const {index: overIndex} = findCard(hash);
        moveCard(draggedHash, overIndex);
      }
    },
  }), [findCard, moveCard]);
  const opacity = isDragging ? 0 : 1;

  return (
    <li className={styles.item} ref={(node) => drag(drop(node))} style={{opacity}}>
      <div className={styles.icon}>
        <DragIcon type="primary"/>
      </div>
      <div className="ml-8">
        <ConstructorElement
          type={undefined}
          isLocked={false}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => removeItem(ingredient.hash)}
        />
      </div>
    </li>
  );
}

export default ConstructorItem;

ConstructorItem.propTypes = {
  index: PropTypes.number.isRequired
}
