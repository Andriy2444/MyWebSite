import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCategories } from "../../services/api";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getProducts({ search, category, minPrice, maxPrice, page, limit });
      setProducts(res.data.data);
      setLastPage(res.data.lastPage);
      setError("");
    } catch (err) {
      console.error("Failed to load products");
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, category, minPrice, maxPrice, limit]);

  useEffect(() => {
    fetchProducts();
  }, [search, category, minPrice, maxPrice, page, limit]);

  if (!token) {
    return <p className="not-logged">Please login to see products.</p>;
  }

  if (loading) {
    return <p className="loading">Loading products...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }


  return (
    <div className="home-container">
      <h1 className="home-title">All Products</h1>

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search product..."
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(tempSearch);
              setPage(1);
            }
          }}
          onBlur={() => {
            setSearch(tempSearch);
            setPage(1);
          }}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min price"
          value={tempMinPrice}
          onChange={(e) => setTempMinPrice(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setMinPrice(tempMinPrice);
              setPage(1);
            }
          }}
          onBlur={() => {
            setMinPrice(tempMinPrice);
            setPage(1);
          }}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={tempMaxPrice}
          onChange={(e) => setTempMaxPrice(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setMaxPrice(tempMaxPrice);
              setPage(1);
            }
          }}
          onBlur={() => {
            setMaxPrice(tempMaxPrice);
            setPage(1);
          }}
        />
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select name="pagination" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={5}>Show 5 product</option>
          <option value={10}>Show 10 product</option>
          <option value={20}>Show 20 product</option>
          <option value={50}>Show 50 product</option>
        </select>
      </div>

      {products.length === 0 ? (
        <p className="no-products">No products found for the selected filters.</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product: any) => (
              <Link to={`/product/${product._id}`} className="product-card" key={product._id}>
                <img src={product.image_url} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>{product.price} ₴</strong>
              </Link>
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              Prev
            </button>
            <span>Page {page} of {lastPage}</span>
            <button onClick={() => setPage((p) => Math.min(p + 1, lastPage))} disabled={page === lastPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
