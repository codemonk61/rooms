import React, { useState, useEffect, useCallback } from 'react';
import RoomCard from '../RoomCard/RoomCard';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { fetchRooms } from '../../utils/fetchRooms';
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRooms = useCallback(async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      setError(null);
      const newRooms = await fetchRooms(page);
      
      if (newRooms.length === 0) {
        setHasMore(false);
      } else {
        setRooms(prevRooms => [...prevRooms, ...newRooms]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (err) {
      setError('Failed to load rooms. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);


  useEffect(() => {
    loadMoreRooms();
  }, []);


  useInfiniteScroll(loadMoreRooms);

  return (
    <div className="room-list-container">
      <h1 className="room-list-header">Available Rooms</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="room-list">
        {rooms.map((room, index) => (
          <RoomCard key={`${room.id}-${index}`} room={room} />
        ))}
        
        {(loading || hasMore) && (
          <div className="loading-container">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLoader key={`skeleton-${i}`} />
            ))}
          </div>
        )}
      </div>
      
      {!hasMore && !loading && (
        <div className="no-more-rooms">No more rooms to show</div>
      )}
    </div>
  );
};

export default RoomList;