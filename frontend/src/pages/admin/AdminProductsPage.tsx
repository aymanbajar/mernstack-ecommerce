import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useAuth } from "../../contexts/Auth/AuthContext";

export default function AdminProductsPage() {
  const { t } = useTranslation();
  const { token } = useAuth();
  
  const [products, setProducts] = useState<any[]>([]);
  const [productForm, setProductForm] = useState({ title: "", image: "", price: "", stock: "", category: "Uncategorized" });
  const [productMessage, setProductMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/product`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductMessage("");
    try {
      if (editId) {
        // Edit
        await axios.put(`${BASE_URL}/product/${editId}`, productForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductMessage(t("Product updated successfully!"));
      } else {
        // Add
        await axios.post(`${BASE_URL}/product`, productForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductMessage(t("Product added successfully!"));
      }
      setProductForm({ title: "", image: "", price: "", stock: "", category: "Uncategorized" });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setProductMessage(t("Failed to save product."));
    }
  };

  const handleEdit = (product: any) => {
    setEditId(product._id);
    setProductForm({
      title: product.title,
      image: product.image,
      price: product.price,
      stock: product.stock,
      category: product.category || "Uncategorized"
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t("Are you sure you want to delete this product?"))) {
      try {
        await axios.delete(`${BASE_URL}/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert(t("Failed to delete product."));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{t("Products Management")}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t("Add, edit, or remove products from your catalog.")}</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          {editId ? <FaEdit className="text-gray-400" /> : <FaPlus className="text-gray-400" />}
          {editId ? t("Edit Product") : t("Add New Product")}
        </h2>
        {productMessage && (
          <div className={`p-3 mb-6 rounded-md text-sm font-medium border ${productMessage.includes('success') ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50'}`}>
            {productMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Product Title")}</label>
              <input type="text" required value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Image URL")}</label>
              <input type="url" required value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Price")}</label>
              <input type="number" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Stock")}</label>
              <input type="number" required value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Category")}</label>
              <select required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-white">
                <option value="Uncategorized">Uncategorized</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-5 mt-2 border-t border-gray-100 dark:border-gray-800">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-md transition-colors">
              {editId ? t("Update Product") : t("Publish Product")}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setProductForm({ title: "", image: "", price: "", stock: "", category: "Uncategorized" }); }} className="bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 text-sm font-medium py-2 px-6 rounded-md transition-colors">
                {t("Cancel")}
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t("All Products")}</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 text-xs">
                  <th className="px-4 py-3 font-medium">{t("Product")}</th>
                  <th className="px-4 py-3 font-medium">{t("Category")}</th>
                  <th className="px-4 py-3 font-medium">{t("Price")}</th>
                  <th className="px-4 py-3 font-medium">{t("Stock")}</th>
                  <th className="px-4 py-3 font-medium">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {products.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-900 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                        <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{product.title}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{product.category || "Uncategorized"}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">${product.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${product.stock > 0 ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-blue-600 transition-colors" title={t("Edit")}>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-red-600 transition-colors" title={t("Delete")}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      {t("No products found.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
