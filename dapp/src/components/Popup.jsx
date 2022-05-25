import React from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import SizedConfetti from 'react-confetti'
import "./Popup.css";

const Popup = ({content, handleClose, isParty}) => {
  const { width, height } = useWindowSize()
  const confettiX = width * 0.15;
  const confettiY = height * 0.15 - 20;
  const confettiWidth = width * 0.7;

  return (
    <div className="popup-box">
      {isParty 
        ? <SizedConfetti
            width={width}
            height={height}
            confettiSource={{
              w: confettiWidth,
              h: 1,
              x: confettiX,
              y: confettiY,
            }}
            recycle={false}
            numberOfPieces={500}
            initialVelocityY={20}
            gravity={0.3}
            tweenDuration={500}
          />
        : null}
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {content}
      </div>
    </div>
  );
};

export default Popup;