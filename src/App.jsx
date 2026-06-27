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

import "./bakery-rwd.css";
// import "./App.css";
// import "./app2.css";
// import "./app3.css";
// import "./app4.css";
// import "./Form2.css";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import { AppContext } from "./AppContext";
// import { Header } from "./Header";
// import Form from "./Form";
// import EventRegistrationForm from "./EventRegistrationForm";
// import Form3 from "./Form3";
import Form4 from "./Form4";

// import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

// const images: GalleryItem[] = [
// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];

// import image1 from "/images/quan-jean.jpg";
// import image1thum from "/images/thumbs/quan-jean-thumb.jpg";
// import image2 from "/images/quan-pijama.jpg";
// import image2thum from "/images/thumbs/quan-pijama-thumb.jpg";

// const images = [
//   {
//     original: "/images/quan-jean.jpg",
//     thumbnail: "/images/thumbs/quan-jean-thumb.jpg",
//   },
//   {
//     original: "/images/quan-pijama.jpg",
//     thumbnail: "/images/thumbs/quan-pijama-thumb.jpg",
//   },
// ];

// function MyGallery() {
//   const galleryRef = useRef < ImageGalleryRef > null;

//   return (
//     <ImageGallery
//       ref={galleryRef}
//       items={images}
//       onSlide={(index) => console.log("Slid to", index)}
//     />
//   );
// }

// ["quan-jean.jpg", "quan-pijama.jpg"]

function getImages(text) {
  const myArray = text.split(";");
  return myArray;
  // return ["quan-jean.jpg", "quan-pijama.jpg"];
}

function MyGallery({ imgs }) {
  const images = [
    // {
    //   original: "/images/quan-jean.jpg",
    //   thumbnail: "/images/thumbs/quan-jean-thumb.jpg",
    // },
    // {
    //   original: "/images/quan-pijama.jpg",
    //   thumbnail: "/images/thumbs/quan-pijama-thumb.jpg",
    // },
    {
      original: "/images/" + imgs[0],
      thumbnail: "/images/thumbs/" + imgs[0],
    },
    {
      original: "/images/" + imgs[1],
      thumbnail: "/images/thumbs/" + imgs[1],
    },
  ];
  return (
    <div className="app">
      {/* <header>
        <div className="header-wrapper">
          <h1>React image gallery demo</h1>
        </div>
      </header> */}
      <div className="image-gallery-wrapper">
        <ImageGallery items={images} />
      </div>
    </div>
  );
}

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
        Suchen
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

  // const imgs = ["quan-jean.jpg", "quan-pijama.jpg"];

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
      <h3>
        {product.title} - {product.price}€
      </h3>
      <div>
        {/* <MyGallery imgs={getImages("quan-jean.jpg;quan-pijama.jpg")} /> */}
        <MyGallery imgs={getImages(product.imagename)} />
      </div>
      <p>
        {/* <img className="" src={`/images/${product.imagename}`} alt="photo" /> */}
        {/* <MyGallery /> */}
        {product.descript}
      </p>
      {/* <p>
        <b>Ihre individuellen Maße</b> in der Maßeinheit Zentimeter(cm)
      </p> */}
      <b>Ihre individuellen Maße</b>
      <br />
      in der Maßeinheit Zentimeter
      <div>
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
                <label htmlFor="hoseVbung">Bundumfang/vongBung</label>
                <br />
                <input
                  type="number"
                  id="hoseVbung"
                  {...register("hoseVbung", {
                    required: " Bundumfang 80-140 ist erforderlich",
                    min: {
                      value: 80,
                      message: "Bundumfang muss mindestens 80 cm betragen",
                    },
                    max: {
                      value: 140,
                      message: "Bundumfang muss weniger als 140 cm betragen",
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
                <label htmlFor="hoseVmong">Hüftumfang/vongMong</label>
                <br />
                <input
                  type="number"
                  id="hoseVmong"
                  {...register("hoseVmong", {
                    required: " Hüftumfang 60-120 ist erforderlich",
                    min: {
                      value: 60,
                      message: "Hüftumfang muss mindestens 60 cm betragen",
                    },
                    max: {
                      value: 120,
                      message: "Hüftumfang muss weniger als 120 cm betragen",
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
                <label htmlFor="hoseVdui">Oberschenkelumfang/vongDui</label>
                <br />
                <input
                  type="number"
                  id="hoseVdui"
                  {...register("hoseVdui", {
                    required: " Oberschenkelumfang 40-80 ist erforderlich",
                    min: {
                      value: 40,
                      message:
                        "Oberschenkelumfang muss mindestens 40 cm betragen",
                    },
                    max: {
                      value: 80,
                      message:
                        "Oberschenkelumfang muss weniger als 80 cm betragen",
                    },
                  })}
                />
                {errors.hoseVdui && (
                  <span className="error-message">
                    {errors.hoseVdui.message}
                  </span>
                )}
              </div>

              <div className={fieldStyle}>
                <label htmlFor="hoseDdui">Beinlänge/daiChan</label>
                <br />
                <input
                  type="number"
                  id="hoseDdui"
                  {...register("hoseDdui", {
                    required: " Beinlänge 60-120 ist erforderlich",
                    min: {
                      value: 60,
                      message: "Beinlänge muss mindestens 60 cm betragen",
                    },
                    max: {
                      value: 120,
                      message: "Beinlänge muss weniger als 120 cm betragen",
                    },
                  })}
                />
                {errors.hoseDdui && (
                  <span className="error-message">
                    {errors.hoseDdui.message}
                  </span>
                )}
              </div>

              <div className={fieldStyle}>
                <label htmlFor="hoseDcang">Schrittlänge/daiHang</label>
                <br />
                <input
                  type="number"
                  id="hoseDcang"
                  {...register("hoseDcang", {
                    required: " Schrittlänge 60-100 ist erforderlich",
                    min: {
                      value: 60,
                      message: "Schrittlänge muss mindestens 60 cm betragen",
                    },
                    max: {
                      value: 100,
                      message: "Schrittlänge muss weniger als 100 cm betragen",
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
                <label htmlFor="hemdVco">Halsumfang/vongCo</label>
                <br />
                <input
                  type="number"
                  id="hemdVco"
                  {...register("hemdVco", {
                    required: " Halsumfang 30-60 ist erforderlich",
                    min: {
                      value: 30,
                      message: "Halsumfang muss mindestens 30 cm betragen",
                    },
                    max: {
                      value: 60,
                      message: "Halsumfang muss weniger als 60 cm betragen",
                    },
                  })}
                />
                {errors.hemdVco && (
                  <span className="error-message">
                    {errors.hemdVco.message}
                  </span>
                )}
              </div>
              <div className={fieldStyle}>
                <label htmlFor="hemdDvai">Schulterbreite/daiVai</label>
                <br />
                <input
                  type="number"
                  id="hemdDvai"
                  {...register("hemdDvai", {
                    required: " Schulterbreite 60-120 ist erforderlich",
                    min: {
                      value: 60,
                      message: "Schulterbreite muss mindestens 60 cm betragen",
                    },
                    max: {
                      value: 120,
                      message:
                        "Schulterbreite muss weniger als 120 cm betragen",
                    },
                  })}
                />
                {errors.hemdDvai && (
                  <span className="error-message">
                    {errors.hemdDvai.message}
                  </span>
                )}
              </div>
              <div className={fieldStyle}>
                <label htmlFor="hemdVnach">Armloch/vongNach</label>
                <br />
                <input
                  type="number"
                  id="hemdVnach"
                  {...register("hemdVnach", {
                    required: " Armloch 30-60 ist erforderlich",
                    min: {
                      value: 30,
                      message: "Armloch muss mindestens 30 cm betragen",
                    },
                    max: {
                      value: 60,
                      message: "Armloch muss weniger als 60 cm betragen",
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
                <label htmlFor="hemdVnguc">Brustumfang/vongNguc</label>
                <br />
                <input
                  type="number"
                  id="hemdVnguc"
                  {...register("hemdVnguc", {
                    required: " Brustumfang 80-120 ist erforderlich",
                    min: {
                      value: 80,
                      message: "Brustumfang muss mindestens 80 cm betragen",
                    },
                    max: {
                      value: 120,
                      message: "Brustumfang muss weniger als 120 cm betragen",
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
                <label htmlFor="hemdVeo">Taillenumfang/vongEo</label>
                <br />
                <input
                  type="number"
                  id="hemdVeo"
                  {...register("hemdVeo", {
                    required: " Taillenumfang 60-100 ist erforderlich",
                    min: {
                      value: 60,
                      message: "Taillenumfang muss mindestens 60 cm betragen",
                    },
                    max: {
                      value: 100,
                      message: "Taillenumfang muss weniger als 100 cm betragen",
                    },
                  })}
                />
                {errors.hemdVeo && (
                  <span className="error-message">
                    {errors.hemdVeo.message}
                  </span>
                )}
              </div>
              <div className={fieldStyle}>
                <label htmlFor="hemdVcotay">Handgelenk/vongCotay</label>
                <br />
                <input
                  type="number"
                  id="hemdVcotay"
                  {...register("hemdVcotay", {
                    required: " Handgelenk 10-30 ist erforderlich",
                    min: {
                      value: 10,
                      message: "Handgelenk muss mindestens 10 cm betragen",
                    },
                    max: {
                      value: 30,
                      message: "Handgelenk muss weniger als 30 cm betragen",
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
                <label htmlFor="hemdDtay">Armlänge/daiTay</label>
                <br />
                <input
                  type="number"
                  id="hemdDtay"
                  {...register("hemdDtay", {
                    required: " Armlänge 60-120 ist erforderlich",
                    min: {
                      value: 60,
                      message: "Armlänge muss mindestens 60 cm betragen",
                    },
                    max: {
                      value: 120,
                      message: "Armlänge muss weniger als 120 cm betragen",
                    },
                  })}
                />
                {errors.hemdDtay && (
                  <span className="error-message">
                    {errors.hemdDtay.message}
                  </span>
                )}
              </div>
              <div className={fieldStyle}>
                <label htmlFor="hemdDao">Hemdlänge/daiAo</label>
                <br />
                <input
                  type="number"
                  id="hemdDao"
                  {...register("hemdDao", {
                    required: " Hemdlänge 60-120 ist erforderlich ",
                    min: {
                      value: 60,
                      message: "Hemdlänge muss mindestens 60 cm betragen",
                    },
                    max: {
                      value: 120,
                      message: "Hemdlänge muss weniger als 120 cm betragen",
                    },
                  })}
                />
                {errors.hemdDao && (
                  <span className="error-message">
                    {errors.hemdDao.message}
                  </span>
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
                  message: "Anzahl muss mindestens 1 betragen",
                },
                max: {
                  value: 100,
                  message: "Anzahl muss kleiner als 100 sein",
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

          <p>
            <button type="submit">
              <b>IN DEN WARENKORB LEGEN</b>
            </button>
          </p>
        </form>
      </div>
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
          <b>Vielen Dank für Ihre Bestellung</b>
        </p>
        {/* <br /> */}
        Bestellung-Nr:
        <br />
        <b>{order.cartUuid}</b>
        <br />
        <br />
        Gesamtbetrag inkl. MwSt:
        <br />
        <b>{order.totalPrice} €</b>
        <br />
        <br />
        Kunde:{" "}
        <b>
          {order.customerFname}, {order.customerLname}
        </b>
        <br />
        Email: {order.customerEmail}
        <p>Artikel</p>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>
              <b>
                {item.title} - {item.price}€
              </b>
              <br />
              {`${item.masstype}, Farbe:${item.color}, Anzahl:${item.quantity}`}
              <br />
              {item.hoseVbung !== 0 ? `Bundumfang:${item.hoseVbung}` : ""}
              {item.hoseVmong !== 0 ? `, Hüftumfang:${item.hoseVmong}` : ""}
              {item.hoseDdui !== 0 ? `, Beinlänge:${item.hoseDdui}` : ""}

              {item.hemdVco !== 0 ? `Halsumfang:${item.hemdVco}` : ""}
              {item.hemdVnach !== 0 ? `, Armloch:${item.hemdVnach}` : ""}
              {item.hemdVnguc !== 0 ? `, Brustumfang:${item.hemdVnguc}` : ""}
              <br />
              {/* <br /> */}
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

  const eventHandler = (id) => {
    setProdId(id);
  };

  useEffect(() => {
    handleFetch();
  }, [category, page]);

  if (!products.length) {
    return (
      <>
        <aside className="">
          <p>Keine Produkte in der Kategorie {`"${category}"`}</p>
        </aside>
      </>
    );
  }

  return (
    <>
      {/* <main className="">
        {prodId !== 0 && <Detail prodId={prodId} setProdId={setProdId} />}
      </main> */}
      {prodId !== 0 ? (
        <main>
          <Detail prodId={prodId} setProdId={setProdId} />
        </main>
      ) : (
        <></>
      )}
      <aside className="">
        {/* <Cart />
        <br /> */}
        {/* <p>
          <b>Kategorie {`"${category}"`}</b>
        </p> */}
        {/* <br /> */}
        <p>
          {totalPages.length > 1 ? (
            totalPages.map((pa) => (
              <button key={pa}>
                <Link to={`/shop/products/${category}/${pa}`}>Page-{pa}</Link>
              </button>
            ))
          ) : (
            <></>
          )}
        </p>
        {/* <br /> */}
        {/* <br /> */}
        {products.map((item) => (
          <p key={item.id}>
            <FaStar color="red" /> {item.title}{" "}
            <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
          </p>
          // {item.descript}
        ))}
        {/* <ul>
          {products.map((item) => (
            <li key={item.id}>
              <p>
                <FaStar color="red" />
                <b>{item.title}</b>{" "}
                <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
              </p>
              {item.descript}
            </li>
          ))}
        </ul> */}
        {/* <br /> */}
      </aside>
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
        <aside className="">
          <p>
            <b>There are't Best Products</b>
          </p>
        </aside>
      </>
    );
  }

  return (
    <>
      {/* <main className="">
        {prodId !== 0 && <Detail prodId={prodId} setProdId={setProdId} />}
      </main> */}
      {prodId !== 0 ? (
        <main>
          <Detail prodId={prodId} setProdId={setProdId} />
        </main>
      ) : (
        <></>
      )}
      <aside className="">
        {/* <Cart />
        <br /> */}
        <p>
          {/* <b>Best Products</b> */}
          <b>Bestseller</b>
        </p>
        {/* <br /> */}
        {/* <ul>
          {products.map((item) => (
            <li key={item.id}>
              <p>
                <FaStar color="red" /> <b>{item.title}</b>{" "}
                <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
              </p>
              {item.descript}
            </li>
          ))}
        </ul> */}
        {products.map((item) => (
          <p key={item.id}>
            <FaStar color="red" /> {item.title}{" "}
            <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
          </p>
          // {item.descript}
        ))}
        {/* <br /> */}
      </aside>
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
        <aside className="">
          {/* <Cart />
          <br /> */}
          <p>Keine Produkte für Suchwort {`"${keywords}"`}</p>
        </aside>
      </>
    );
  }

  return (
    <>
      {/* <main className="">
        {prodId !== 0 && <Detail prodId={prodId} setProdId={setProdId} />}
      </main> */}
      {prodId !== 0 ? (
        <main>
          <Detail prodId={prodId} setProdId={setProdId} />
        </main>
      ) : (
        <></>
      )}
      <aside className="">
        {/* <Cart /> */}
        {/* <p>
          <b>Produkte für Suchwort {`"${keywords}"`}</b>
        </p> */}
        {products.map((item) => (
          <p key={item.id}>
            <FaStar color="red" /> {item.title}{" "}
            <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
          </p>
          // {item.descript}
        ))}
        {/* <ul>
          {products.map((item) => (
            <li key={item.id}>
              <p>
                <FaStar color="red" />
                <b>{item.title}</b>{" "}
                <BsArrowRightSquare onClick={() => eventHandler(item.id)} />
              </p>
              {item.descript}
            </li>
          ))}
        </ul> */}
        {/* <br /> */}
      </aside>
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
    return <main>Der Warenkorb ist leer im Moment.</main>;
  }

  return (
    <main>
      <b>Warenkorb</b>
      <br />
      {`ID:${getCartUuid()}`}
      {/* <p>{`ID:${cartUuid}`}</p> */}
      {/* <br /> */}
      <ul>
        {state.products.map((item) => (
          <li key={item.id}>
            {/* {item.productUuid}
            <br /> */}
            <b>
              {item.title} - {item.price}€
            </b>
            <br />
            {`${item.masstype}, Farbe:${item.color}, Anzahl:${item.quantity}`}
            {/* {item.masstype == "hose" ? `| ${item.masstype}` : ""} */}
            <br />
            {item.hoseVbung !== 0 ? `Bundumfang:${item.hoseVbung}` : ""}
            {item.hoseVmong !== 0 ? `, Hüftumfang:${item.hoseVmong}` : ""}
            {item.hoseDdui !== 0 ? `, Beinlänge:${item.hoseDdui}` : ""}

            {item.hemdVco !== 0 ? `Halsumfang:${item.hemdVco}` : ""}
            {item.hemdVnach !== 0 ? `, Armloch:${item.hemdVnach}` : ""}
            {item.hemdVnguc !== 0 ? `, Brustumfang:${item.hemdVnguc}` : ""}
            <br />
            {/* <br /> */}
          </li>
        ))}
      </ul>
      {/* <br /> */}
      <button onClick={() => navigate(-1)}>Zurück</button>
      {/* <button onClick={() => navigate("/shop/products")}>Zum Katalog</button> */}
      <button onClick={() => navigate("/shop/checkout")}>
        {/* <b>Bestellen</b> */}
        <b>BESTELLEN</b>
      </button>
    </main>
  );
}

// function Catalog() {
//   return (
//     <>
//       {/* <Menu /> */}
//       <Outlet />
//       {/* <main>
//       </main> */}
//     </>
//   );
// }

function Header() {
  return (
    <>
      <header>
        <h1>MassAnzug Service</h1>
        {/* <p></p> */}
        <Link to="/shop/products">|Produkte</Link>
        <Link to="/shop/cart">|Warenkorb</Link>
        <Link to="/contact">|Kontakt</Link>
        <Menu />
        {/* <div className="">
          <ul className="">
            <li>
              <Link to="/shop/products">|Produkte</Link>
            </li>
            <li>
              <Link to="/shop/cart">|Warenkorb</Link>
            </li>
            <li>
              <Link to="/contact">|Kontakt</Link>
            </li>
          </ul>
          <br />
        </div> */}
      </header>
    </>
  );
}

function Footer() {
  return <footer> Copyright &copy; VN Clothing</footer>;
}

const Layout = () => {
  return (
    <div id="container">
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
          <Route path="gallery" element={<MyGallery />} />
          <Route path="service" element={<ServiceInfo />} />
          {/* <Route path="cart" element={<Cart />} /> */}
          {/* <Route path="shop" element={<Shop />}> */}
          {/* <Route path="shop/products" element={<Catalog />}>
            <Route index element={<Best />} />
            <Route path=":category/:page" element={<SelectList />} />
            <Route path="search" element={<SearchList />} />
          </Route> */}
          <Route path="shop/products" element={<Best />} />
          <Route
            path="shop/products/:category/:page"
            element={<SelectList />}
          />
          <Route path="shop/products/search" element={<SearchList />} />
          {/* <Route path="path="shop/products/:prodId" element={<Product />} /> */}
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

function ServiceInfo() {
  return (
    <main>
      <h4>Service Infos</h4>
    </main>
  );
}

function Contact() {
  // const [searchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  return (
    <main>
      <h4>
        {/* Contact <i>{searchParams.get("option")}</i> */}
        Kontakt
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
        <p>
          <b>KundenInformationen</b>
        </p>
        {/* <p>{`ID:${getCartUuid()}`}</p> */}
        {/* <br /> */}
        {/* <button onClick={() => navigate("/shop/products")}>Zum Katalog</button> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={fieldStyle}>
            <label htmlFor="fname">Ihr Vorname</label>
            <br />
            <input
              type="text"
              id="fname"
              {...register("fname", {
                required: " Vorname ist erforderlich",
              })}
            />
            {errors.fname && (
              <span className="error-message">{errors.fname.message}</span>
            )}
          </div>
          <div className={fieldStyle}>
            <label htmlFor="lname">Ihr Name</label>
            <br />
            <input
              type="text"
              id="lname"
              {...register("lname", {
                required: " Name ist erforderlich",
              })}
            />
            {errors.lname && (
              <span className="error-message">{errors.lname.message}</span>
            )}
          </div>
          <div className={fieldStyle}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              {...register("email", {
                required: " Email ist erforderlich",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>
          <div className={fieldStyle}>
            <label htmlFor="fonnumber">Tel-Nummer</label>
            <br />
            <input
              type="text"
              id="fonnumber"
              {...register("fonnumber", {
                required: " Tel-Nummer ist erforderlich",
              })}
            />
            {errors.fonnumber && (
              <span className="error-message">{errors.fonnumber.message}</span>
            )}
          </div>
          <div className={fieldStyle}>
            <label htmlFor="address">Adresse</label>
            <br />
            <input
              type="text"
              id="address"
              {...register("address", {
                required: " Adresse ist erforderlich",
              })}
            />
            {errors.address && (
              <span className="error-message">{errors.address.message}</span>
            )}
          </div>
          <p>
            <button type="submit" className="">
              <b>BESTELLUNG BESTÄTIGEN</b>
            </button>
          </p>
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
