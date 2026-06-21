import { useState, useEffect, useEffectEvent } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import {
  Outlet,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
} from "react-router";
// import { useParams } from "react-router";
// import { Header } from "./Header";
// import Dummy from "./Dummy";
import { v4 as uuidv4 } from "uuid";

function getCartUuid() {
  let cartid = sessionStorage.getItem("cartUuid");
  if (cartid === null) {
    sessionStorage.setItem("cartUuid", uuidv4());
    cartid = sessionStorage.getItem("cartUuid");
  }
  return cartid;
}

const SearchForm = ({ setMode, setSearch }) => {
  const [filterText, setFilterText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterText.length > 0) {
      setSearch(filterText);
      setMode("form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="form-control"
      />
      <button type="submit" className="btn btn-secondary">
        Search
      </button>
    </form>
  );
};

function Menu({ setMode, setCatego }) {
  const handleClick = (category) => {
    // e.preventDefault();
    setCatego(category);
    setMode("menu");
  };
  return (
    <div className="container">
      <nav>
        <ul className="nav">
          <li>
            {/* <a href="/">Home</a> */}
            <a>Home</a>
          </li>
          <li className="dropdown">
            {/* <a href="/">Electronics</a> */}
            <a>Electronics</a>
            <ul>
              <li onClick={() => handleClick("book")}>
                <a>Smart Phones</a>
                {/* <a href="/itemlist?category=CellPhone">Smart Phones</a> */}
              </li>
              <li onClick={() => handleClick("laptop")}>
                <a>Laptops</a>
                {/* <a href="/itemlist?category=Laptop">Laptops</a> */}
              </li>
              <li onClick={() => handleClick("handy")}>
                <a>Cameras </a>
                {/* <a href="/">Cameras </a> */}
              </li>
              <li>
                {/* <a href="/">Televisions</a> */}
                <a>Televisions</a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            {/* <a href="/">Home &amp; Furniture</a> */}
            <a>Home &amp; Furniture</a>
            <ul className="large">
              <li onClick={() => handleClick("kitchen")}>
                <a>Kitchen Essentials</a>
                {/* <a href="/">Kitchen Essentials</a> */}
              </li>
              <li>
                {/* <a href="/">Bath Essentials</a> */}
                <a>Bath Essentials</a>
              </li>
              <li>
                {/* <a href="/">Furniture</a> */}
                <a>Furniture</a>
              </li>
              <li>
                {/* <a href="/">Dining &amp; Serving</a> */}
                <a>Dining &amp; Serving</a>
              </li>
              <li>
                {/* <a href="/">Cookware</a> */}
                <a>Cookware</a>
              </li>
            </ul>
          </li>
          <li>
            {/* <a href="/">Books</a> */}
            <a>Books</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Detail() {
  const { prodId } = useParams();
  const [product, setProduct] = useState({});

  const getData = async (prodId) => {
    const response = await fetch(
      "http://localhost:8000/api/products/" + prodId,
    );
    const prod = await response.json();
    setProduct(prod);
  };

  const handleFetch = useEffectEvent(() => {
    getData(prodId);
  });

  useEffect(() => {
    handleFetch();
  }, [prodId]);

  return (
    <>
      <h2>Detail {prodId}</h2>
      <p className="">
        {product.title} | {product.price} $
      </p>
      <img className="" src={`/images/${product.imagename}`} alt="photo" />
    </>
  );
}

function ItemList({ category }) {
  // const [
  //   searchParams,
  //   // setSearchParams
  // ] = useSearchParams();
  // const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async (category, page) => {
    const response = await fetch(
      "http://localhost:8000/api/products/page?category=" +
        category +
        "&page=" +
        page,
    );
    const data = await response.json();
    const prods = await data.content;
    const totalp = await data.totalPages;
    // const prods = await response.json().content;
    // console.log(result);
    setProducts(prods);
    setTotalPages(totalp);
  };

  const handleFetch = useEffectEvent(() => {
    getData(category, page);
  });

  useEffect(() => {
    handleFetch();
    // getData(category);
  }, [category, page]);

  // console.log("render-sub-view");
  return (
    <>
      <h2>Items of category {category}</h2>
      <div>
        {products.map((item) => (
          <p key={item.id}>
            <Link to={`${item.id}`}>{item.title}</Link> | {item.price}
          </p>
        ))}
      </div>
    </>
  );
}

function ItemList2({ keywords }) {
  const [products, setProducts] = useState([]);

  const getData2 = async (keywords) => {
    const response = await fetch(
      "http://localhost:8000/api/products/search?title=" + keywords,
    );
    const prods = await response.json();
    // console.log(result);
    setProducts(prods);
    // return prods;
  };

  // https://medium.com/@maroobsyed/error-calling-setstate-synchronously-within-an-effect-can-trigger-cascading-renders-7e6fb9d971b2
  const handleFetch2 = useEffectEvent(() => {
    getData2(keywords);
  });

  useEffect(() => {
    // console.log("make-effect2");
    handleFetch2();
    // getData2(keywords);
  }, [keywords]);

  // console.log("render-sub-view2");
  return (
    <>
      <h2>Items found for search-keys {keywords}</h2>
      <div>
        {products.map((item) => (
          <p key={item.id}>
            <Link to={`${item.id}`}>{item.title}</Link> | {item.price}
          </p>
        ))}
      </div>
    </>
  );
}

function Cart() {
  const [cart, setCart] = useState([]);

  const getData = async (uuId) => {
    const response = await fetch("http://localhost:8000/api/cart/" + uuId);
    const items = await response.json();
    // console.log(result);
    setCart(items);
  };

  const handleFetch = useEffectEvent(() => {
    getData(getCartUuid());
  });

  useEffect(() => {
    // getData(category);
    handleFetch();
  }, []);

  return (
    <>
      <h2>Cart Items</h2>
      <div>
        {cart.map((item) => (
          <p key={item.id}>
            {item.title} | {item.price}
          </p>
        ))}
      </div>
    </>
  );
}

function Shop() {
  const [search, setSearch] = useState("");
  const [catego, setCatego] = useState("");
  const [mode, setMode] = useState("");

  return (
    <>
      <SearchForm setMode={setMode} setSearch={setSearch} />
      <Menu setMode={setMode} setCatego={setCatego} />
      {mode == "menu" && <ItemList category={catego} />}
      {mode == "form" && <ItemList2 keywords={search} />}
      {/* <Outlet context={[mode, catego, search]} /> */}
      <Outlet />
    </>
  );
}

function Contact() {
  const [searchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  return (
    <h1>
      Contact <i>{searchParams.get("option")}</i>
    </h1>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function Header() {
  return (
    <>
      <Link to="/products">Shop</Link> | <Link to="/cart">Cart</Link> |{" "}
      <Link to="/contact?option=abc">Contact</Link>
    </>
  );
}

const Layout = () => {
  return (
    <div id="layout">
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <Dummy /> */}
      {/* <Header />
      <Outlet /> */}
      {/* <nav>
      </nav> */}

      {/* <Header /> */}
      {/* <div className="">
        <Outlet />
      </div> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="cart" element={<Cart />} /> */}
          <Route path="products" element={<Shop />}>
            {/* <Route index element={<p></p>} /> */}
            <Route path=":prodId" element={<Detail />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
