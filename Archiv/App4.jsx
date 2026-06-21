import { useState, useContext, useEffect, useEffectEvent } from "react";
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
  // useSubmit,
  // Form,
} from "react-router";
// https://www.dhiwise.com/blog/design-converter/how-to-effectively-use-usesearchparams-in-react-router-dom

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

// import "./App.css";
import "./app2.css";
// import "./Form2.css";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import { AppContext } from "./AppContext";
// import { Header } from "./Header";
// import Form from "./Form";
// import EventRegistrationForm from "./EventRegistrationForm";
// import Form3 from "./Form3";
import Form4 from "./Form4";

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
            <li onClick={() => handleClick("cooking")}>
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

function Detail({ prodId, setProdId }) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const fieldStyle = "flex flex-col mb-2";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      pieces: 1,
    },
  });

  const {
    // state,
    dispatch,
  } = useContext(AppContext);
  const [product, setProduct] = useState();
  const getData = async (prodId) => {
    const response = await fetch(
      "http://localhost:8000/api/products/" + prodId,
    );
    const prod = await response.json();
    setProduct(prod);
    // return true;
  };

  const postData = async (prod, fdata) => {
    const cartItemDTO = {
      cartUuid: getCartUuid(),
      productUuid: prod.productUuid,
      title: prod.title,
      price: prod.price,
      quantity: fdata.pieces,
    };

    const response = await fetch("http://localhost:8000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemDTO),
    });

    const item = await response.json();
    // console.log(item);
    dispatch({ type: "add", item });

    // if (response.ok) {
    // toast.success("Task status updated!");
    // getData();
    // }
  };

  const handleFetch = useEffectEvent(() => {
    getData(prodId);
  });

  useEffect(() => {
    handleFetch();
  }, [prodId]);

  // const eventHandler = (prod) => {
  //   console.log(prod);
  //   postData(prod, fdata);
  //   setProdId(0);
  // };

  // Handle form submission
  const onSubmit = (fdata) => {
    console.log("Form data", fdata);
    console.log("Product data", product);
    postData(product, fdata);
    setProdId(0);
  };

  // function getEditorStyle(fieldError) {
  //   return fieldError ? "border-red-500" : "";
  // }

  // const getEditorStyle = (fieldError) => {
  //   return fieldError ? "border-red-500" : "";
  // };

  if (product == null) {
    return null;
  }

  return (
    <div>
      <h3>Product {prodId}</h3>
      <p className="">
        {product.title} | {product.price} $ |{" "}
        {/* <button onClick={() => eventHandler(product)}>AddToCart</button> */}
      </p>
      <img className="" src={`/images/${product.imagename}`} alt="photo" />
      {/* <div className="form-container"> */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className={fieldStyle}>
            <label htmlFor="name">Your name</label>
            <br />
            <input
              type="text"
              id="name"
              {...register("name", {
                required: " name is required",
              })}
              // className={getEditorStyle(errors.name)}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>
          <div className={fieldStyle}>
            <label htmlFor="email">Your email</label>
            <br />
            <input
              type="email"
              id="email"
              {...register("email", {
                required: " email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              // className={getEditorStyle(errors.email)}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div> */}

          <div className={fieldStyle}>
            <label htmlFor="color">Color you like:</label>
            <br />
            <select
              id="color"
              {...register("color", {
                required: " color is required",
              })}
              // className={getEditorStyle(errors.color)}
            >
              <option value=""></option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Black">Black</option>
              <option value="Other">Other</option>
            </select>
            {errors.color && (
              <span className="error-message">{errors.color.message}</span>
            )}
          </div>

          <div className={fieldStyle}>
            <label htmlFor="lsize">Long size in cm:</label>
            <br />
            <input
              type="number"
              id="lsize"
              {...register("lsize", {
                required: " long size is required",
                min: {
                  value: 100,
                  message: "Your long size must be at least 100 cm",
                },
                max: {
                  value: 200,
                  message: "Your long size must be less than 200 cm",
                },
              })}
              // className={getEditorStyle(errors.lsize)}
            />
            {errors.lsize && (
              <span className="error-message">{errors.lsize.message}</span>
            )}
          </div>

          <div className={fieldStyle}>
            <label htmlFor="pieces">Quantity - number of pieces:</label>
            <br />
            <input
              type="number"
              id="pieces"
              {...register("pieces", {
                required: " quantity is required",
                min: {
                  value: 1,
                  message: "quantity must be at least 1",
                },
                max: {
                  value: 100,
                  message: "quantity must be less than 100",
                },
              })}
              // className={getEditorStyle(errors.lsize)}
            />
            {errors.pieces && (
              <span className="error-message">{errors.pieces.message}</span>
            )}
          </div>

          <div className={fieldStyle}>
            <label htmlFor="notes">Additional notes</label>
            <br />
            <textarea id="notes" {...register("notes")} />
          </div>

          <div>
            <button type="submit" className="">
              AddToCart
            </button>
          </div>
        </form>
      </div>
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

  if (!products.length) {
    return <h3>No Products of category {`"${category}"`}</h3>;
  }

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
      <div>
        {prodId !== 0 && <Detail prodId={prodId} setProdId={setProdId} />}
      </div>
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

  if (!products.length) {
    return <h3>No Products by keys {`"${keywords}"`}</h3>;
  }

  return (
    <div>
      <div>
        <h3>Products by keys {`"${keywords}"`}</h3>
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              {item.id}-{item.title}{" "}
              <button onClick={() => eventHandler(item.id)}>Detail</button>
            </li>
          ))}
        </ul>
      </div>
      {prodId !== 0 && <Detail prodId={prodId} setProdId={setProdId} />}
    </div>
  );
}

function Cart() {
  // const [cart, setCart] = useState([]);
  const { state, dispatch } = useContext(AppContext);

  const getData = async (uuId) => {
    const response = await fetch("http://localhost:8000/api/cart/" + uuId);
    const items = await response.json();
    dispatch({ type: "init", items });
    // setCart(items);
  };

  const handleFetch = useEffectEvent(() => {
    getData(getCartUuid());
  });

  useEffect(() => {
    handleFetch();
  }, []);

  if (!state.products.length) {
    return null;
  }

  return (
    <div>
      <h3>Cart</h3>
      <ul>
        {state.products.map((item) => (
          <li key={item.id}>
            {/* {item.productUuid}
            <br /> */}
            {item.title} | UnitPrice={item.price} | Quantity={item.quantity}
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
      <Cart />
      <Outlet />
      {/* <Outlet context={[mode, catego, search]} /> */}
    </div>
  );
}

function Header() {
  return (
    <div>
      <ul className="site-nav">
        <li>
          <Link to="/products">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/contact?option=abc">Contact</Link>
        </li>
        {/* <Link to="/form">Form</Link> | <Link to="/form1">Form1</Link> |{" "}
      <Link to="/form2">Form2</Link> | <Link to="/form3">Form3</Link> |{" "}
      <Link to="/form4">Form4</Link> */}
      </ul>
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
          {/* <Route path="form" element={<EmailValidationForm />} />
          <Route path="form1" element={<Form />} />
          <Route path="form2" element={<EventRegistrationForm />} />
          <Route path="form3" element={<Form3 />} />
          <Route path="form4" element={<Form4 />} /> */}
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

// Validation logic for email format
const isEmailValid = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

function EmailValidationForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!isEmailValid(value)) {
      setError("Invalid email format.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      // Submit form
      console.log("Form Submitted:", email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={handleEmailChange} />
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
