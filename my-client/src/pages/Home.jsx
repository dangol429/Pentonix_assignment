import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SuperheroTable from '../components/SuperheroTable';

const Home = () => {
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  return (
    <>
      <Navbar setSelectedPublisher={setSelectedPublisher} />
      <SuperheroTable selectedPublisher={selectedPublisher} />
    </>
  );
};

export default Home;
