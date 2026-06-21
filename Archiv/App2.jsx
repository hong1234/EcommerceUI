import { useState, useEffect, useEffectEvent } from "react";
// https://medium.com/@maroobsyed/error-calling-setstate-synchronously-within-an-effect-can-trigger-cascading-renders-7e6fb9d971b2

import {
  Outlet,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
  // useOutletContext,
  useNavigate,
} from "react-router";

// https://www.dhiwise.com/blog/design-converter/how-to-effectively-use-usesearchparams-in-react-router-dom

import { v4 as uuidv4 } from "uuid";

import "./App.css";
// import { useParams } from "react-router";
// import { Header } from "./Header";
// import Dummy from "./Dummy";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function getCartUuid() {
  let cartid = sessionStorage.getItem("cartUuid");
  if (cartid == null) {
    sessionStorage.setItem("cartUuid", uuidv4());
    // sessionStorage.setItem("cartUuid", "200b0834-ac3c-420f-91ad-4ef32c5dac96");
    cartid = sessionStorage.getItem("cartUuid");
  }
  return cartid;
}

function pages(ptotal) {
  let pages = [];
  for (let x = 0; x < ptotal; x++) {
    pages.push(x + 1);
  }
  return pages;
}

const SearchForm = () => {
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterText.length > 0) {
      navigate(`/products/search?keys=${filterText}`);
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

function Menu() {
  const navigate = useNavigate();
  const handleClick = (category) => {
    // e.preventDefault();
    navigate(`/products/select?category=${category}&page=1`);
  };
  return (
    <nav>
      <ul className="nav">
        <li className="dropdown">
          {/* <a href="/">Books</a> */}
          <a>Books</a>
          <ul>
            <li onClick={() => handleClick("book")}>
              <a>Programming</a>
              {/* <a href="/">Kitchen Essentials</a> */}
            </li>
            <li>
              <a>Cooking</a>
              {/* <a href="/">Cameras </a> */}
            </li>
          </ul>
        </li>
        <li className="dropdown">
          {/* <a href="/">Electronics</a> */}
          <a>Electronics</a>
          <ul>
            <li onClick={() => handleClick("handy")}>
              <a>Smart Phones</a>
              {/* <a href="/itemlist?category=CellPhone">Smart Phones</a> */}
            </li>
            <li onClick={() => handleClick("laptop")}>
              <a>Laptops</a>
              {/* <a href="/itemlist?category=Laptop">Laptops</a> */}
            </li>
            <li>
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
              {/* <a href="/">Cookware</a> */}
              <a>Cookware</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

function Detail({ prodId }) {
  const [product, setProduct] = useState();
  const getData = async (prodId) => {
    const response = await fetch(
      "http://localhost:8000/api/products/" + prodId,
    );
    const prod = await response.json();
    setProduct(prod);
    // return true;
  };

  const postData = async (prod) => {
    const cartItemDTO = {
      cartUuid: getCartUuid(),
      productUuid: prod.productUuid,
      title: prod.title,
      price: prod.price,
      quantity: 1,
    };

    // const response =
    await fetch("http://localhost:8000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemDTO),
    });

    // const item = await response.json();
    // console.log(item);

    // if (response.ok) {
    // toast.success("Task status updated!");
    // getData();
    // }
    // return true;
  };

  const handleFetch = useEffectEvent(() => {
    getData(prodId);
  });

  useEffect(() => {
    handleFetch();
  }, [prodId]);

  if (product == null) {
    return null;
  }

  const eventHandler = (prod) => {
    // console.log(prod);
    postData(prod);
    // setProdId(id);
  };

  return (
    <div>
      <h3>Product {prodId}</h3>
      <p className="">
        {product.id}-{product.title} | {product.price} $
      </p>
      <img className="" src={`/images/${product.imagename}`} alt="photo" />
      <p>
        <button onClick={() => eventHandler(product)}>AddToCart</button>
      </p>
    </div>
  );
}

function Product() {
  const { prodId } = useParams();
  const [product, setProduct] = useState({});

  const getData = async (prodId) => {
    const response = await fetch(
      "http://localhost:8000/api/products/" + prodId,
    );
    const prod = await response.json();
    setProduct(prod);
    // return true;
  };

  const handleFetch = useEffectEvent(() => {
    getData(prodId);
  });

  useEffect(() => {
    handleFetch();
  }, [prodId]);

  return (
    <div>
      <h3>Detail {prodId}</h3>
      <p className="">
        {product.title} | {product.price} $
      </p>
      <img className="" src={`/images/${product.imagename}`} alt="photo" />
    </div>
  );
}

function SelectList() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [prodId, setProdId] = useState(0);

  const [
    searchParams,
    // setSearchParams
  ] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const page = searchParams.get("page") || "1";

  const getSelect = async (category, page) => {
    const response = await fetch(
      "http://localhost:8000/api/products/page?category=" +
        category +
        "&page=" +
        page,
    );
    const data = await response.json();
    const prods = await data.content;
    const pinfos = await data.page;
    const ptotal = await pinfos.totalPages;

    setProducts(prods);
    setTotalPages(pages(ptotal));
    setProdId(0);
    // return true;
  };

  const handleFetch = useEffectEvent(() => {
    getSelect(category, page);
  });

  // console.log("render-sub-view");
  const eventHandler = (id) => {
    setProdId(id);
  };

  useEffect(() => {
    handleFetch();
  }, [searchParams]);

  return (
    <>
      <div>
        <h3>Products of category {`"${category}"`}</h3>
        <ul>
          {totalPages.length > 1 ? (
            totalPages.map((pa) => (
              <Link
                key={pa}
                to={`/products/select?category=${category}&page=${pa}`}
              >
                Page#{pa} |{" "}
              </Link>
            ))
          ) : (
            <></>
          )}
          {/* <br />
          <br /> */}
        </ul>
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              {item.id}-{item.title}{" "}
              <button onClick={() => eventHandler(item.id)}>Detail</button>
            </li>
          ))}
        </ul>
      </div>
      <div>{prodId !== 0 && <Detail prodId={prodId} />}</div>
    </>
  );
}

function SearchList() {
  const [products, setProducts] = useState([]);
  const [prodId, setProdId] = useState(0);
  // const [cart, setCart] = useState([]);

  const [searchParams] = useSearchParams();
  const keywords = searchParams.get("keys");

  const getSearch = async (keywords) => {
    const response = await fetch(
      "http://localhost:8000/api/products/search?title=" + keywords,
    );
    const prods = await response.json();
    // console.log(result);
    setProducts(prods);
    setProdId(0);
    // return true;
  };

  const handleFetch = useEffectEvent(() => {
    getSearch(keywords);
  });

  useEffect(() => {
    // console.log("make-effect");
    handleFetch();
    // getSearch(keywords);
  }, [keywords]);

  // console.log("render-sub-view");
  const eventHandler = (id) => {
    setProdId(id);
  };

  return (
    <div>
      <div>
        <h3>Products by keys {`"${keywords}"`}</h3>
        {products.map((item) => (
          <p key={item.id}>
            {item.id}-{item.title}{" "}
            <button onClick={() => eventHandler(item.id)}>Detail</button>
          </p>
        ))}
      </div>
      {prodId !== 0 && <Detail prodId={prodId} />}
    </div>
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
    handleFetch();
  }, []);

  return (
    <div>
      <h3>Cart</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.title} | {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Shop() {
  // const [search, setSearch] = useState("");
  // const [catego, setCatego] = useState("");
  // const [mode, setMode] = useState("");

  return (
    <div>
      <SearchForm />
      <Menu />
      <Outlet />
      {/* <Outlet context={[mode, catego, search]} /> */}
    </div>
  );
}

function Header() {
  return (
    <div>
      <Link to="/products">Shop</Link> | <Link to="/cart">Cart</Link> |{" "}
      <Link to="/contact?option=abc">Contact</Link>
    </div>
  );
}

const Layout = () => {
  return (
    <div id="layout" className="container">
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Shop />}>
            <Route path="select" element={<SelectList />} />
            <Route path="search" element={<SearchList />} />
            {/* <Route path=":prodId" element={<Product />} /> */}
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

function Contact() {
  const [searchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  return (
    <h3>
      Contact <i>{searchParams.get("option")}</i>
    </h3>
  );
}

function Home() {
  return <h3>Home</h3>;
}

export default App;
