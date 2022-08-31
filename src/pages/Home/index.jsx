import { React, useEffect, useState } from 'react';
import Edit from './components/Edit';
import List from './components/List';
import './index.css';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    alert('成功');
  }, [data]);

  return (
    <div className="app">
      <Edit add={setData} />
      <List listData={data} deleteData={setData} />
    </div>
  );
}

export default Home;
