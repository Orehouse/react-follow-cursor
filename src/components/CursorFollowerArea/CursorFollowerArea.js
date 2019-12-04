import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import uuid4 from 'uuid4';
import CursorFollowerItem from '../CursorFollowerItem/CursorFollowerItem';


const CursorFollowerArea = props => {
    const mousePosition = useRef({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
    const [items, setItems] = useState([]);

    const mouseMoveHandler = event => {
      const { x, y } = event;
      mousePosition.current = { x, y };
    };

    const setListeners = () => {
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('click', addItem);
      document.addEventListener('keydown', keyDownHandler);
    };

    const removeListeners = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('click', addItem);
      document.removeEventListener('keydown', keyDownHandler);
    };

    const keyDownHandler = ({ keyCode }) => {
      if (keyCode === 46) {
        removeItem();
      }
    };

    const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

    const addItem = () => {
      setItems(oldItems => [...oldItems, { maxSpeed: getRandomArbitrary(5, 30), key: uuid4() }]);
    };

    const removeItem = () => {
      setItems(oldItems => {
        const key = oldItems[0] ? oldItems[0].key : undefined;
        return key ? oldItems.filter(it => it.key !== key) : oldItems;
      });
    };

    const update = () => {
      setTargetPosition({ ...mousePosition.current });
      requestAnimationFrame(update);
    };

    useEffect(() => {
      setListeners();
      requestAnimationFrame(() => {
        update();
      });
      return () => {
        removeListeners();
      };
    }, []);

    return (
      <>
        {items.map(item => <CursorFollowerItem {...item} position={{ ...targetPosition }} />)}
      </>
    );
  }
;

export default CursorFollowerArea;
