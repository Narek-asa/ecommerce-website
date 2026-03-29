import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header.tsx';
import { ProductsGrid } from './ProductsGrid.jsx';
import './HomePage.css';
import { API_BASE } from '../../api/config.js';

export function HomePage({ cart, loadCart }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const urlPath = search
          ? `${API_BASE}/api/products?search=${encodeURIComponent(search)}`
          : `${API_BASE}/api/products`;

        console.log('Requesting:', urlPath);

        const response = await axios.get(urlPath);
        console.log('Response:', response.data);

        setProducts(response.data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>

      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
