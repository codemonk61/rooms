import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-media"></div>
      <div className="skeleton-details">
        <div className="skeleton-title"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;