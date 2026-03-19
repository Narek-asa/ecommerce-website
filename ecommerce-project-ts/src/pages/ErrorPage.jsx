import { Header } from '../components/Header.tsx';
import './ErrorPage.css';

export function ErrorPage({ cart }) {
  return (
    <>
      <Header cart={cart} />

      <p className="error-message">Page Not Found!</p>
    </>
  );
}
