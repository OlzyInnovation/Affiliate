import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const { data } = await axios.get('/api/dashboard');
        // setLoading(false);
        setProducts(data);
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
        console.log(err);
      }
    };
    // fetchData();
  }, []);

  // useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get('/api/dashboard');
  //     setLoading(false);
  //     setProducts(data);
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };

  //   // fetchData();
  // }

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
      <div>Dashboard</div>
    </div>
  );
}

export default Dashboard;
