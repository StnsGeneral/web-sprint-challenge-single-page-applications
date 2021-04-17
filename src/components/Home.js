import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  const routeToPizza = () => {
    history.push('/pizza');
  };

  return (
    <div className="home-wrapper">
      <img
        src="./Assets/Pizza.jpg"
        alt="Margherita Pizza"
        className="home-image"
      />
      <button onClick={routeToPizza} className="home-button">
        Order Now!
      </button>
    </div>
  );
}
