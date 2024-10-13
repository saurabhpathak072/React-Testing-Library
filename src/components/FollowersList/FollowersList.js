import React, { useEffect, useState } from 'react';
import './FollowersList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FollowersList() {
  const [followers, setFollowers] = useState([]);
  const [user, setUser] = useState({
    name: 'John Doe',
    address: {
        city: 'New York',
        zip: '10001'
    }
});

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    const { data } = await axios.get('https://randomuser.me/api/?results=5');
    setFollowers(data.results);
  };

 

  const updateCity = () => {
    // Shallow copy of the user object
    const updatedUser = { ...user };
    // Modify the nested object (address)
    updatedUser.address.city = 'Los Angeles';
    // Update the state with the modified shallow copy
    setUser(updatedUser);
};

  return (
    <div className="followerslist-container">
      <div>
        {followers.map((follower, index) => (
          <div
            data-testid={`follower-item-${index}`}
            key={index}
            className="follower-item"
          >
            <img
              src={follower.picture.large}
              alt="lPic"
            />
            <div className="followers-details">
              <div className="follower-item-name">
                <h4>{follower.name.first}</h4> <h4>{follower.name.last}</h4>
              </div>
              <p>{follower.login.username}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="todo-footer">
        <Link to="/">Go Back</Link>
      </div>
      <div>
      <div>
            <p>Name: {user.name}</p>
            <p>City : {user.address.city}</p>
            <button onClick={updateCity}>Update City</button>
        </div>
      </div>
    </div>
  );
}
