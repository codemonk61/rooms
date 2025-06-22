import React, { useState } from 'react';
import useMediaLoader from '../../hooks/useMediaLoader';
import './RoomCard.css';

const RoomCard = React.memo(({ room }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { mediaRef, isVisible } = useMediaLoader();
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };


  const mediaToShow = room.properties?.video_url?.med 
    ? { type: 'video', url: room.properties.video_url.med } 
    : null;


  const variant = room.variants[selectedVariant];

  return (
    <div className={`room-card ${expanded ? 'expanded' : ''}`}>
      <div className="room-media" ref={mediaRef}>
        {isVisible && mediaToShow && (
          mediaToShow.type === 'video' ? (
            <video 
              src={mediaToShow.url} 
              controls 
              muted 
              playsInline 
              loop 
             
              className="room-video"
            />
          ) : null
        )}
      </div>
      
      <div className="room-details">
        <h2 className="room-name">{room.name}</h2>
        
   
        <div className="variant-selector">
          {room.variants.map((variant, index) => (
            <button
              key={index}
              className={`variant-button ${selectedVariant === index ? 'active' : ''}`}
              onClick={() => setSelectedVariant(index)}
            >
              {variant.name}
            </button>
          ))}
        </div>
        
        <p className="room-price">
          {variant.total_price.currency} {variant.total_price.discounted_price.toFixed(2)}
        </p>
        
        {/* Display properties */}
        <div className="room-properties">
          {variant.display_properties.map((prop, index) => (
            <span key={index} className="property-tag">
              {prop.value}
            </span>
          ))}
        </div>
        
        <p className={`room-description ${expanded ? 'expanded' : ''}`}>
          {room.additional_info?.short_tariff_notes}
        </p>
        
        <button onClick={toggleExpand} className="expand-button">
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
});

export default RoomCard;