import React, {
  useEffect,
  useState,
} from 'react';
import classes from './CursorFollowerItem.module.css';


const CursorFollowerItem = (props) => {
  const [position, setPosition] = useState({ ...props.position });
  const [targetPosition, setTargetPosition] = useState({ ...props.position });
  const [velocity] = useState(props.maxSpeed);

  const getLength = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
    const vx = x1 - x2;
    const vy = y1 - y2;
    return Math.sqrt(vx * vx + vy * vy);
  };

  const getNextPosition = () => {
    const { x: x1, y: y1 } = position;
    const { x: x2, y: y2 } = targetPosition;

    const maxSpeed = velocity;
    const length = getLength(position, targetPosition);
    let k = length ? maxSpeed / length : 1;
    if (length < maxSpeed) {
      k = 1;
    }
    return {
      x: x1 + (x2 - x1) * k,
      y: y1 + (y2 - y1) * k,
    };
  };

  const updatePosition = () => {
    const nextPosition = getNextPosition();
    if (nextPosition.x !== position.x || nextPosition.y !== position.y) {
      setPosition(nextPosition);
    }
  };

  useEffect(() => {
    setTargetPosition({ ...props.position });
    updatePosition();
  }, [props.position]);


  const { x, y } = position;
  return (
    <div
      className={classes.Item}
      style={{ left: `${x}px`, top: `${y}px` }}
    />
  );
};

export default CursorFollowerItem;
