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

import { v4 as uuidv4 } from "uuid";

import "./App.css";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import { AppContext } from "./AppContext";
// import { Header } from "./Header";

import Form from "./Form";
import EventRegistrationForm from "./EventRegistrationForm";
import Form3 from "./Form3";
import Form4 from "./Form4";

// import { useForm } from "react-hook-form";
// import "./Form2.css";

import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

// import "./Form3.css";

const schema = yup.object({
  name: yup.string().required("Please enter name"),
  // email: yup
  //   .string()
  //   .email("Please enter valid email")
  //   .required("Please enter email"),
  // website: yup
  //   .string()
  //   .url("Please enter valid url")
  //   .required("Please enter url"),
  // color: yup.number().nullable().required("Please select color"),
  color: yup.string().nullable().required("Please select color"),
});

const colorList = [
  // { value: 1, label: "Red" },
  // { value: 2, label: "Green" },
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
];

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

function Detail({ prodId }) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const {
    register,
    handleSubmit,
    // formState,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { field } = useController({ name: "color", control });
  const {
    value: colorValue,
    onChange: colorOnChange,
    ...restColorField
  } = field;

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

  const postData = async (prod) => {
    const cartItemDTO = {
      cartUuid: getCartUuid(),
      productUuid: prod.productUuid,
      title: prod.title,
      price: prod.price,
      quantity: 1,
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
  //   // console.log(prod);
  //   postData(prod);
  //   // setProdId(id);
  // };

  // const onSubmit = async () => {
  //   // async request which may result error
  //   try {
  //     // await fetch()
  //   } catch (e) {
  //     // handle your error
  //   }
  // };

  // <form onSubmit={handleSubmit(onSubmit)} />;

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted successfully!", data);
    console.log("Form submitted successfully!", product);
    postData(product);
  };

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
        {/* <h2 className="form-title">Form Validation</h2> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          {/* <div>
            <label className="form-label">Username:</label>
            <input
              className="form-input"
              type="text"
              name="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters long",
                },
              })}
            />
            {errors.username && (
              <span className="error-message">{errors.username.message}</span>
            )}
          </div> */}

          {/* Email Field */}
          {/* <div>
            <label className="form-label">Email:</label>
            <input
              className="form-input"
              type="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div> */}

          {/* Long Field with Range Validation */}
          {/* <div className="form-group">
            <label className="form-label">Long size - Angabe in cm:</label>
            <input
              className="form-input"
              type="number"
              {...register("klong", {
                required: "Long size is required", // Required validation
                min: {
                  value: 100,
                  message: "Your long size must be at least 100 cm",
                },
                max: {
                  value: 200,
                  message: "Your long size must be less than 200 cm",
                },
              })}
            />
            {errors.klong && (
              <span className="error-message">{errors.klong.message}</span>
            )}
          </div> */}

          <div>
            <label>Name</label>
            <br />
            <input
              className="form-input"
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label>Color</label>
            <Select
              className="select-input"
              // className="form-input"
              placeholder="Select Color"
              isClearable
              options={colorList}
              value={
                colorValue
                  ? colorList.find((x) => x.value === colorValue)
                  : colorValue
              }
              onChange={(option) =>
                colorOnChange(option ? option.value : option)
              }
              {...restColorField}
            />
            {/* <Select options={colorList} /> */}
            {errors.color && <p>{errors.color.message}</p>}
          </div>

          <button className="submit-button" type="submit">
            AddToCart
          </button>
          {/* <button type="submit">AddToCart</button> */}
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
      {prodId !== 0 && <Detail prodId={prodId} />}
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
            {item.title} | {item.productUuid} | {item.price}
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
      <Link to="/products">Shop</Link> |{" "}
      {/* <Link to="/cart">Cart</Link> |{" "} */}
      <Link to="/contact?option=abc">Contact</Link> |{" "}
      <Link to="/form">Form</Link> | <Link to="/form1">Form1</Link> |{" "}
      <Link to="/form2">Form2</Link> | <Link to="/form3">Form3</Link> |{" "}
      <Link to="/form4">Form4</Link>
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
          {/* <Route path="cart" element={<Cart />} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="form" element={<EmailValidationForm />} />
          <Route path="form1" element={<Form />} />
          <Route path="form2" element={<EventRegistrationForm />} />
          <Route path="form3" element={<Form3 />} />
          <Route path="form4" element={<Form4 />} />
          {/* <Route path="form3" element={<EmailValidationForm />} /> */}
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
