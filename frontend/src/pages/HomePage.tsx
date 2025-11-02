import { useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";
import { BASE_URL } from  '../constants/BASE_URL'
import type { Product } from "../types/Product";
import axios from "axios";
import {useTranslation} from 'react-i18next';
const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
    const {t} = useTranslation();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product`);
        setProducts(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(t('Failed to fetch products.'));
      }
    };
    fetchProducts();
  }, [t]);
 if (error) {
   return <div>{error}</div>;
 }
  return (
    <div >
      {/* product list */}
      <div className="flex flex-col gap-4 m-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div  key={product._id}>
            <ProductCart {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;