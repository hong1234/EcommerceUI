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
// import { Toaster, toast } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { BsArrowRightSquare } from "react-icons/bs";

// import "./App.css";
// import "./app2.css";
// import "./app3.css";
import "./app4.css";
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

function initCartUuid() {
  sessionStorage.setItem("cartUuid", uuidv4());
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
      navigate(`/shop/products/search?keys=${filterText}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sform">
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className=""
      />
      <button type="submit" className="">
        Search
      </button>
    </form>
  );
};

function Menu() {
  const navigate = useNavigate();
  const handleClick = (category) => {
    // e.preventDefault();
    // navigate(`/shop/products/select?category=${category}&page=1`);
    navigate(`/shop/products/${category}/1`);
  };
  return (
    <>
      <nav>
        <SearchForm />
        <ul className="nav">
          <li className="dropdown">
            {/* <a href="/">Home &amp; Furniture</a> */}
            <a>Herren</a>
            <ul className="">
              <li onClick={() => handleClick("herren-hose")}>
                {/* <a href="/">Bath Essentials</a> */}
                <a>Hose</a>
              </li>
              <li onClick={() => handleClick("herren-hemd")}>
                <a>Hemd</a>
                {/* <a href="/">Kitchen Essentials</a> */}
              </li>
              <li onClick={() => handleClick("herren-jacke")}>
                <a>Jacke</a>
                {/* <a href="/">Cameras </a> */}
              </li>
            </ul>
          </li>

          <li className="dropdown">
            {/* <a href="/">Books</a> */}
            <a>Damen</a>
            <ul>
              <li onClick={() => handleClick("damen-hose")}>
                <a>D-Hose</a>
                {/* <a href="/">Kitchen Essentials</a> */}
              </li>
              <li onClick={() => handleClick("damen-hemd")}>
                <a>D-Hemd</a>
                {/* <a href="/">Kitchen Essentials</a> */}
              </li>
              <li onClick={() => handleClick("damen-jacke")}>
                <a>D-Jacke</a>
                {/* <a href="/">Cameras </a> */}
              </li>
            </ul>
          </li>
          <li className="dropdown">
            {/* <a href="/">Electronics</a> */}
            <a>Kinder</a>
            <ul>
              <li onClick={() => handleClick("book")}>
                <a>Books</a>
                {/* <a href="/itemlist?category=Laptop">Laptops</a> */}
              </li>
              <li onClick={() => handleClick("handy")}>
                <a>Handys</a>
                {/* <a href="/itemlist?category=CellPhone">Smart Phones</a> */}
              </li>
              <li onClick={() => handleClick("laptop")}>
                <a>Laptops</a>
                {/* <a href="/itemlist?category=Laptop">Laptops</a> */}
              </li>
              {/* <li>
                <a>Cameras </a>
              </li> */}
              {/* <li>
                <a>Televisions</a>
              </li> */}
            </ul>
          </li>
        </ul>
      </nav>
    </>
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
    let cartItemDTO;
    if (prod.masstype == "hose") {
      // const
      cartItemDTO = {
        cartUuid: getCartUuid(),
        productUuid: prod.productUuid,
        masstype: prod.masstype,
        title: prod.title,
        price: prod.price,
        quantity: fdata.pieces,
        color: fdata.color,

        hoseVbung: fdata.hoseVbung,
        hoseVmong: fdata.hoseVmong,
        hoseVdui: fdata.hoseVdui,
        hoseDdui: fdata.hoseDdui,
        hoseDcang: fdata.hoseDcang,
        hemdVco: 0,
        hemdVnach: 0,
        hemdVnguc: 0,
        hemdVeo: 0,
        hemdVcotay: 0,
        hemdDvai: 0,
        hemdDtay: 0,
        hemdDao: 0,
      };
    }

    if (prod.masstype == "hemd") {
      // const
      cartItemDTO = {
        cartUuid: getCartUuid(),
        productUuid: prod.productUuid,
        masstype: prod.masstype,
        title: prod.title,
        price: prod.price,
        quantity: fdata.pieces,
        color: fdata.color,

        hoseVbung: 0,
        hoseVmong: 0,
        hoseVdui: 0,
        hoseDdui: 0,
        hoseDcang: 0,
        hemdVco: fdata.hemdVco,
        hemdVnach: fdata.hemdVnach,
        hemdVnguc: fdata.hemdVnguc,
        hemdVeo: fdata.hemdVeo,
        hemdVcotay: fdata.hemdVcotay,
        hemdDvai: fdata.hemdDvai,
        hemdDtay: fdata.hemdDtay,
        hemdDao: fdata.hemdDao,
      };
    }

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
    toast.success(`${fdata.pieces} ${product.title} is added to cart!`);
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
    <>
      {/* <Cart /> */}
      {/* <p>
        <b>Produktdetail {prodId}</b>
      </p> */}
      {/* <br /> */}
      <p className="">
        <b>{product.title}</b>
      </p>
      <p>{product.descript}</p>
      <p>{product.price}$</p>
      <img className="" src={`/images/${product.imagename}`} alt="photo" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldStyle}>
          <label htmlFor="color">Farbe</label>
          <br />
          <select
            id="color"
            {...register("color", {
              required: " Farbe ist erforderlich",
            })}
          >
            <option value=""></option>
            <option value="Red" style={{ backgroundColor: "#e31616" }}>
              Red
            </option>
            <option value="Green" style={{ backgroundColor: "#56c82d" }}>
              Green
            </option>
            <option value="Black" style={{ backgroundColor: "#000000" }}>
              Black
            </option>
            <option value="Other">Other</option>
          </select>
          {errors.color && (
            <span className="error-message">{errors.color.message}</span>
          )}
        </div>

        {product.masstype == "hose" ? (
          <div>
            <div className={fieldStyle}>
              <label htmlFor="hoseVbung">Bundumfang/bung in cm</label>
              <br />
              <input
                type="number"
                id="hoseVbung"
                {...register("hoseVbung", {
                  required: " Bundumfang 80-140 ist erforderlich",
                  min: {
                    value: 80,
                    message: "bundumfang must be at least 80 cm",
                  },
                  max: {
                    value: 140,
                    message: "bundumfang must be less than 140 cm",
                  },
                })}
              />
              {errors.hoseVbung && (
                <span className="error-message">
                  {errors.hoseVbung.message}
                </span>
              )}
            </div>

            <div className={fieldStyle}>
              <label htmlFor="hoseVmong">Hüftumfang/mong in cm</label>
              <br />
              <input
                type="number"
                id="hoseVmong"
                {...register("hoseVmong", {
                  required: " Hüftumfang 60-120 ist erforderlich",
                  min: {
                    value: 60,
                    message: "hüftumfang must be at least 60 cm",
                  },
                  max: {
                    value: 120,
                    message: "hüftumfang must be less than 120 cm",
                  },
                })}
              />
              {errors.hoseVmong && (
                <span className="error-message">
                  {errors.hoseVmong.message}
                </span>
              )}
            </div>

            <div className={fieldStyle}>
              <label htmlFor="hoseVdui">Oberschenkelumfang/dui in cm</label>
              <br />
              <input
                type="number"
                id="hoseVdui"
                {...register("hoseVdui", {
                  required: " Oberschenkelumfang 40-80 ist erforderlich",
                  min: {
                    value: 40,
                    message: "oberschenkelumfang must be at least 40 cm",
                  },
                  max: {
                    value: 80,
                    message: "oberschenkelumfang must be less than 80 cm",
                  },
                })}
              />
              {errors.hoseVdui && (
                <span className="error-message">{errors.hoseVdui.message}</span>
              )}
            </div>

            <div className={fieldStyle}>
              <label htmlFor="hoseDdui">Beinlänge/dChan in cm</label>
              <br />
              <input
                type="number"
                id="hoseDdui"
                {...register("hoseDdui", {
                  required: " Beinlänge 60-120 ist erforderlich",
                  min: {
                    value: 60,
                    message: "beinlänge must be at least 60 cm",
                  },
                  max: {
                    value: 120,
                    message: "beinlänge must be less than 120 cm",
                  },
                })}
              />
              {errors.hoseDdui && (
                <span className="error-message">{errors.hoseDdui.message}</span>
              )}
            </div>

            <div className={fieldStyle}>
              <label htmlFor="hoseDcang">Schrittlänge/dHang in cm</label>
              <br />
              <input
                type="number"
                id="hoseDcang"
                {...register("hoseDcang", {
                  required: " Schrittlänge 60-100 ist erforderlich",
                  min: {
                    value: 60,
                    message: "schrittlänge must be at least 60 cm",
                  },
                  max: {
                    value: 100,
                    message: "schrittlänge must be less than 100 cm",
                  },
                })}
              />
              {errors.hoseDcang && (
                <span className="error-message">
                  {errors.hoseDcang.message}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className={fieldStyle}>
              <label htmlFor="hemdVco">Halsumfang/co in cm</label>
              <br />
              <input
                type="number"
                id="hemdVco"
                {...register("hemdVco", {
                  required: " Halsumfang 30-60 ist erforderlich",
                  min: {
                    value: 30,
                    message: "halsumfang must be at least 30 cm",
                  },
                  max: {
                    value: 60,
                    message: "halsumfang must be less than 60 cm",
                  },
                })}
              />
              {errors.hemdVco && (
                <span className="error-message">{errors.hemdVco.message}</span>
              )}
            </div>
            <div className={fieldStyle}>
              <label htmlFor="hemdDvai">Schulterbreite/dVai in cm</label>
              <br />
              <input
                type="number"
                id="hemdDvai"
                {...register("hemdDvai", {
                  required: " Schulterbreite 60-120 ist erforderlich",
                  min: {
                    value: 60,
                    message: "schulterbreite must be at least 60 cm",
                  },
                  max: {
                    value: 120,
                    message: "schulterbreite must be less than 120 cm",
                  },
                })}
              />
              {errors.hemdDvai && (
                <span className="error-message">{errors.hemdDvai.message}</span>
              )}
            </div>
            <div className={fieldStyle}>
              <label htmlFor="hemdVnach">Armloch/nach in cm</label>
              <br />
              <input
                type="number"
                id="hemdVnach"
                {...register("hemdVnach", {
                  required: " Armloch 30-60 ist erforderlich",
                  min: {
                    value: 30,
                    message: "armloch must be at least 30 cm",
                  },
                  max: {
                    value: 60,
                    message: "armloch must be less than 60 cm",
                  },
                })}
              />
              {errors.hemdVnach && (
                <span className="error-message">
                  {errors.hemdVnach.message}
                </span>
              )}
            </div>
            <div className={fieldStyle}>
              <label htmlFor="hemdVnguc">Brustumfang/nguc in cm</label>
              <br />
              <input
                type="number"
                id="hemdVnguc"
                {...register("hemdVnguc", {
                  required: " Brustumfang 80-120 ist erforderlich",
                  min: {
                    value: 80,
                    message: "brustumfang must be at least 80 cm",
                  },
                  max: {
                    value: 120,
                    message: "brustumfang must be less than 120 cm",
                  },
                })}
              />
              {errors.hemdVnguc && (
                <span className="error-message">
                  {errors.hemdVnguc.message}
                </span>
              )}
            </div>
            <div className={fieldStyle}>
              <label htmlFor="hemdVeo">Taillenumfang/eo in cm</label>
              <br />
              <input
                type="number"
                id="hemdVeo"
                {...register("hemdVeo", {
                  required: " Taillenumfang 60-100 ist erforderlich",
                  min: {
                    value: 60,
                    message: "eo must be at least 60 cm",
                  },
                  max: {
                    value: 100,
                    message: "eo must be less than 100 cm",
                  },
                })}
              />
              {errors.hemdVeo && (
                <span className="error-message">{errors.hemdVeo.message}</span>
              )}
            </div>
            <div className={fieldStyle}>
              <label htmlFor="hemdVcotay">Handgelenk/cotay in cm</label>
              <br />
              <input
                type="number"
                id="hemdVcotay"
                {...register("hemdVcotay", {
                  required: " Handgelenk 10-30 ist erforderlich",
                  min: {
                    value: 10,
                    message: "cotay must be at least 10 cm",
                  },
                  max: {
                    value: 30,
                    message: "cotay must be less than 30 cm",
                  },
                })}
              />
              {errors.hemdVcotay && (
                <span className="error-message">
                  {errors.hemdVcotay.message}
                </span>
              )}
            </div>
            <div className={fieldStyle}>
              <label htmlFor="hemdDtay">Armlänge/dTay in cm</label>
              <br />
              <input
                type="number"
                id="hemdDtay"
                {...register("hemdDtay", {
                  required: " Armlänge 60-120 ist erforderlich",
                  min: {
                    value: 60,
                    message: "armlänge must be at least 60 cm",
                  },
                  max: {
                    value: 120,
                    message: "armlänge must be less than 120 cm",
                  },
                })}
              />
              {errors.hemdDtay && (
                <span className="error-message">{errors.hemdDtay.message}</span>
              )}
            </div>
            <div className={fieldStyle}>
              <label htmlFor="hemdDao">Hemdlänge/dAo in cm</label>
              <br />
              <input
                type="number"
                id="hemdDao"
                {...register("hemdDao", {
                  required: " Hemdlänge 60-120 ist erforderlich ",
                  min: {
                    value: 60,
                    message: "hemdlänge must be at least 60 cm",
                  },
                  max: {
                    value: 120,
                    message: "hemdlänge must be less than 120 cm",
                  },
                })}
              />
              {errors.hemdDao && (
                <span className="error-message">{errors.hemdDao.message}</span>
              )}
            </div>
          </div>
        )}

        <div className={fieldStyle}>
          <label htmlFor="pieces">Anzahl der Artikel</label>
          <br />
          <input
            type="number"
            id="pieces"
            {...register("pieces", {
              required: " Anzahl ist erforderlich",
              min: {
                value: 1,
                message: "anzahl muss mindestens 1 betragen",
              },
              max: {
                value: 100,
                message: "anzahl muss kleiner als 100 sein",
              },
            })}
          />
          {errors.pieces && (
            <span className="error-message">{errors.pieces.message}</span>
          )}
        </div>

        <div className={fieldStyle}>
          <label htmlFor="notes">Zusätzliche Hinweise</label>
          <br />
          <textarea id="notes" {...register("notes")} />
        </div>

        <div>
          {/* <br /> */}
          <button type="submit" className="">
            <b>Add To Cart</b>
          </button>
        </div>
      </form>
    </>
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
      <p>
        <b>Detail {prodId}</b>
      </p>
      <p className="">
        {product.title} | {product.price} $
      </p>
      <img className="" src={`/images/${product.imagename}`} alt="photo" />
    </div>
  );
}

function Order() {
  // const [items, setItems] = useState([]);
  const [order, setOrder] = useState();
  const { cartUuid } = useParams();
  const getOrder = async (cartUuid) => {
    const response = await fetch("http://localhost:8000/api/order/" + cartUuid);
    const data = await response.json();
    // setItems(data);
    setOrder(data);
  };

  const handleFetch = useEffectEvent(() => {
    getOrder(cartUuid);
  });

  useEffect(() => {
    handleFetch();
  }, [cartUuid]);

  if (order == null) {
    return null;
    // return <div>the order don't exist</div>;
  }

  return (
    <>
      <main>
        <p>
          <b>Order</b>
        </p>
        <p>ID:{order.cartUuid}</p>
        <p>
          Customer: {order.customerFname}, {order.customerLname}
        </p>
        <p>
          Total ink.Mwst:<b>{order.totalPrice}$</b>
        </p>
        <br />
        <p>Artikel</p>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>
              <b>{item.title}</b>
              <br />
              {`${item.masstype}, ${item.color}, Prs:${item.price}$, Qty:${item.quantity}`}
              <br />
              {item.hoseVbung !== 0 ? `Bundumfang:${item.hoseVbung}` : ""}
              {item.hoseVmong !== 0 ? `, Hüftumfang:${item.hoseVmong}` : ""}
              {item.hoseDdui !== 0 ? `, Beinlänge:${item.hoseDdui}` : ""}

              {item.hemdVco !== 0 ? `Halsumfang:${item.hemdVco}` : ""}
              {item.hemdVnach !== 0 ? `, Armloch:${item.hemdVnach}` : ""}
              {item.hemdVnguc !== 0 ? `, Brustumfang:${item.hemdVnguc}` : ""}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

function SelectList() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [prodId, setProdId] = useState(0);

  // const [
  //   searchParams,
  //   // setSearchParams
  // ] = useSearchParams();

  // const category = searchParams.get("category") || "all";
  // const page = searchParams.get("page") || "1";

  const { category, page } = useParams();

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
  }, [category, page]);

  if (!products.length) {
    return (
      <>
        <div className="sidebar-bottom tile">
          {/* <Cart /> */}
          {/* <br /> */}
          <p>
            <b>No Produkte der Kategorie {`"${category}"`}</b>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sidebar-bottom tile">
        {/* <Cart />
        <br /> */}
        <p>
          <b>Produkte der Kategorie {`"${category}"`}</b>
        </p>
        {/* <br /> */}
        <ul>
          {totalPages.length > 1 ? (
            totalPages.map((pa) => (
              <button key={pa}>
                <Link to={`/shop/products/${category}/${pa}`}>Page-{pa}</Link>
              </button>
            ))
          ) : (
            <></>
          )}
        </ul>
        <br />
        {/* <br /> */}
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              <p>
                {/* <FaStar color="red"  onClick={() => eventHandler(item.id)}/>{" "} */}
                <FaStar color="red" />
                {/* {item.id}- */} <b>{item.title}</b>{" "}
                {/* <button onClick={() => eventHandler(item.id)}>Detail</button> */}
                <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
              </p>
              {item.descript}
            </li>
          ))}
        </ul>
        <br />
      </div>
      <div className="main tile">
        {prodId !== 0 && <Detail prodId={prodId} setProdId={setProdId} />}
      </div>
    </>
  );
}

function Best() {
  const [products, setProducts] = useState([]);
  const [prodId, setProdId] = useState(0);

  const getBest = async () => {
    const response = await fetch("http://localhost:8000/api/products/best");
    const prods = await response.json();
    setProducts(prods);
    setProdId(0);
  };

  const handleFetch = useEffectEvent(() => {
    getBest();
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const eventHandler = (id) => {
    setProdId(id);
  };

  if (!products.length) {
    return (
      <>
        <div className="sidebar-bottom tile">
          <p>
            <b>There are't Best Products</b>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sidebar-bottom tile">
        {/* <Cart />
        <br /> */}
        <p>
          {/* <b>Best Products</b> */}
          <b>Bestseller</b>
        </p>
        <br />
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              <p>
                {/* <FaStar color="red"  onClick={() => eventHandler(item.id)}/>{" "} */}
                <FaStar color="red" /> <b>{item.title}</b>{" "}
                {/* <button onClick={() => eventHandler(item.id)}>Detail</button> */}
                <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
              </p>
              {item.descript}
            </li>
          ))}
        </ul>
        <br />
      </div>
      <div className="main tile">
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
    return (
      <>
        <div className="sidebar-bottom tile">
          {/* <Cart />
          <br /> */}
          <p>
            <b>No Products by keys {`"${keywords}"`}</b>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sidebar-bottom tile">
        {/* <Cart />
        <br /> */}
        <p>
          <b>Products by keys {`"${keywords}"`}</b>
        </p>
        <br />
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              <p>
                {/* <FaStar color="red"  onClick={() => eventHandler(item.id)}/>{" "} */}
                <FaStar color="red" />
                {/* {item.id}- */} <b>{item.title}</b>{" "}
                {/* <button onClick={() => eventHandler(item.id)}>Detail</button> */}
                <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
              </p>
              {item.descript}
            </li>
          ))}
        </ul>
        <br />
      </div>
      <div className="main tile">
        {prodId !== 0 && <Detail prodId={prodId} setProdId={setProdId} />}
      </div>
    </>
  );
}

function Cart() {
  // const [cart, setCart] = useState([]);
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  // const cartUuid = getCartUuid();

  const getData = async (uuId) => {
    const response = await fetch("http://localhost:8000/api/cart/" + uuId);
    const items = await response.json();
    dispatch({ type: "init", items });
    // setCart(items);
  };

  const handleFetch = useEffectEvent(() => {
    getData(getCartUuid());
    // getData(cartUuid);
  });

  useEffect(() => {
    handleFetch();
  }, []);

  if (!state.products.length) {
    // return null;
    return <main>Der Warenkorb ist im Moment nicht leer.</main>;
  }

  return (
    <main>
      <b>Cart</b>
      <p>{`ID:${getCartUuid()}`}</p>
      {/* <p>{`ID:${cartUuid}`}</p> */}
      <br />
      <ul>
        {state.products.map((item) => (
          <li key={item.id}>
            {/* {item.productUuid}
            <br /> */}
            <b>{item.title}</b>
            <br />
            {`${item.masstype}, ${item.color}, Prs:${item.price}$, Qty:${item.quantity}`}
            {/* {item.masstype == "hose" ? `| ${item.masstype}` : ""} */}
            <br />
            {item.hoseVbung !== 0 ? `Bundumfang:${item.hoseVbung}` : ""}
            {item.hoseVmong !== 0 ? `, Hüftumfang:${item.hoseVmong}` : ""}
            {item.hoseDdui !== 0 ? `, Beinlänge:${item.hoseDdui}` : ""}

            {item.hemdVco !== 0 ? `Halsumfang:${item.hemdVco}` : ""}
            {item.hemdVnach !== 0 ? `, Armloch:${item.hemdVnach}` : ""}
            {item.hemdVnguc !== 0 ? `, Brustumfang:${item.hemdVnguc}` : ""}
          </li>
        ))}
      </ul>
      <br />
      {/* <button onClick={() => navigate(-1)}>Zurück</button> */}
      <button onClick={() => navigate("/shop/products")}>Zum Katalog</button>
      <button onClick={() => navigate("/shop/checkout")}>Checkout</button>
    </main>
  );
}

function Catalog() {
  return (
    <>
      <Menu />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function Header() {
  return (
    <>
      <header>
        <h1>MassAnzug Service</h1>
        <div className="">
          <ul className="navC">
            <li>
              <Link to="/shop/products">|Products</Link>
            </li>
            <li>
              <Link to="/shop/cart">|Cart</Link>
            </li>
            {/* <li>
              <Link to="/shop/checkout">Checkout</Link>
            </li> */}
            <li>
              <Link to="/contact">|Contact</Link>
            </li>
            {/* <li>
              <Link to="/form">Form</Link>
            </li> */}
          </ul>
          <br />
        </div>
      </header>
    </>
  );
}

function Footer() {
  return <footer> Copyright &copy; VN Clothing</footer>;
}

const Layout = () => {
  return (
    <div id="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />

          {/* <Route path="cart" element={<Cart />} /> */}
          {/* <Route path="shop" element={<Shop />}> */}
          <Route path="shop/products" element={<Catalog />}>
            <Route index element={<Best />} />
            <Route path=":category/:page" element={<SelectList />} />
            <Route path="search" element={<SearchList />} />
            {/* <Route path=":prodId" element={<Product />} /> */}
          </Route>
          <Route path="shop/cart" element={<Cart />} />
          <Route path="shop/checkout" element={<Checkout />} />
          <Route path="shop/order/:cartUuid" element={<Order />} />

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
  // const [searchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  return (
    <main>
      <h4>
        {/* Contact <i>{searchParams.get("option")}</i> */}
        Contact
      </h4>
    </main>
  );
}

function Checkout() {
  // const [searchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const [product, setProduct] = useState();
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

  // const getData = async (prodId) => {
  //   const response = await fetch(
  //     "http://localhost:8000/api/products/" + prodId,
  //   );
  //   const prod = await response.json();
  //   setProduct(prod);
  //   // return true;
  // };

  // const postData = async (prod, fdata) => {};

  // private String customerAddress;

  const postData = async (fdata) => {
    const cartUuid = getCartUuid();
    const cartOrderDTO = {
      // cartUuid: getCartUuid(),
      cartUuid: cartUuid,
      customerFname: fdata.fname,
      customerLname: fdata.lname,
      customerEmail: fdata.email,
      customerFonnumber: fdata.fonnumber,
      customerAddress: fdata.address,
    };

    const response = await fetch("http://localhost:8000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartOrderDTO),
    });

    const order = await response.json();
    console.log(order);
    dispatch({ type: "clear" });
    initCartUuid();
    // navigate("/shop/order/" + getCartUuid());
    navigate("/shop/order/" + cartUuid);

    // if (response.ok) {
    // toast.success("Task status updated!");
    // getData();
    // }
  };

  // Handle form submission
  const onSubmit = (fdata) => {
    // console.log("Form data", fdata);
    // console.log("Product data", product);
    // postData(product, fdata);
    // setProdId(0);
    // toast.success(`${fdata.pieces} ${product.title} is added to cart!`);
    postData(fdata);
    // toast.success(`Thank ${fdata.fname} ${fdata.lname} for this order`);
  };

  return (
    <>
      <main className="">
        {/* Contact <i>{searchParams.get("option")}</i> */}
        <b>Checkout</b>
        <p>{`ID:${getCartUuid()}`}</p>
        {/* <button onClick={() => navigate("/shop/products")}>Zum Katalog</button> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={fieldStyle}>
            <label htmlFor="fname">Your first name</label>
            <br />
            <input
              type="text"
              id="fname"
              {...register("fname", {
                required: " fname is required",
              })}
              // className={getEditorStyle(errors.name)}
            />
            {errors.fname && (
              <span className="error-message">{errors.fname.message}</span>
            )}
          </div>
          <div className={fieldStyle}>
            <label htmlFor="lname">Your last name</label>
            <br />
            <input
              type="text"
              id="lname"
              {...register("lname", {
                required: " lname is required",
              })}
              // className={getEditorStyle(errors.name)}
            />
            {errors.lname && (
              <span className="error-message">{errors.lname.message}</span>
            )}
          </div>
          <div className={fieldStyle}>
            <label htmlFor="email">Your email</label>
            <br />
            <input
              type="email"
              id="email"
              {...register("email", {
                required: " Email is required",
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
          </div>
          <div className={fieldStyle}>
            <label htmlFor="fonnumber">Your Fonnumber</label>
            <br />
            <input
              type="text"
              id="fonnumber"
              {...register("fonnumber", {
                required: " Fonnumber is required",
              })}
              // className={getEditorStyle(errors.name)}
            />
            {errors.fonnumber && (
              <span className="error-message">{errors.fonnumber.message}</span>
            )}
          </div>
          <div className={fieldStyle}>
            <label htmlFor="address">Your Address</label>
            <br />
            <input
              type="text"
              id="address"
              {...register("address", {
                required: " Address is required",
              })}
              // className={getEditorStyle(errors.address)}
            />
            {errors.address && (
              <span className="error-message">{errors.address.message}</span>
            )}
          </div>
          <div>
            <button type="submit" className="">
              Make Order
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

function Home() {
  const shouldRedirect = true;
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/shop/products");
    }
  });
  return <h4>Home</h4>;
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
