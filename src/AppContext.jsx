import { createContext, useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";
// import AppContext from "./AppContext";

const cartState = {
  // state
  products: [],
  // loggedIn: false,
  // count: 0,
};

function productReducer(state, action) {
  switch (action.type) {
    // case "login":
    //   return { ...state, loggedIn: true };

    // case "logout":
    //   return { ...state, loggedIn: false };

    case "init":
      return {
        ...state,
        products: action.items,
      };

    case "add":
      // const newProduct = {
      //   // id: uuidv4(),
      //   // dbid: action.payload.id,
      //   // title: action.payload.title,
      // };
      // const newProducts = [...state.products, {}];
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: action.item.id,
            cartUuid: action.item.cartUuid,
            productUuid: action.item.productUuid,
            title: action.item.title,
            price: action.item.price,
            quantity: action.item.quantity,
          },
        ],
        // products: newProducts,
        // count: state.count + 1,
      };

    case "delete":
      // const filteredProductState = state.products.filter(
      //   (product) => product.id !== action.payload.id,
      // );
      return {
        ...state,
        // products: filteredProductState,
        count: state.count - 1,
      };

    case "reset":
      return {
        ...state,
        // products: filteredProductState,
        count: 0,
      };

    default:
      return cartState;
  }
}

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, cartState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
