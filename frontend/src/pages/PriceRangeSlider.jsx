import React from "react";

const RangeSlider = ({ value, min, max, onChange }) => {
    return (
      <div className="range-slider">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="slider"
          style={{ width: '100%' }}
        />
        <div className="flex justify-between mt-2">
          <span>{min}</span>
          <span>{value}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  };

export default RangeSlider;