import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useAuth } from "../Auth/AuthContext";

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  toggleWishlist: async () => {},
  loading: false,
});

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWishlist();
    } else {
      setWishlistIds([]);
    }
  }, [isAuthenticated, token]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // the endpoint returns populated products, so we map their _ids
      const ids = res.data.map((p: any) => p._id || p);
      setWishlistIds(ids);
    } catch (err) {
      console.error("Error fetching wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!isAuthenticated) {
      alert("Please login to add items to your wishlist");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/user/wishlist/toggle`, { productId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistIds(res.data.wishlist);
    } catch (err) {
      console.error("Error toggling wishlist", err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
