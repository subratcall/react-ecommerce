import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { reducer as toastrReducer } from "react-redux-toastr";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import modalReducer from "./modal/modal.reducer";
import shippingReducer from "./shipping/shipping.reducer";
import checkoutReducer from "./checkout/checkout.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};

const rootReducer = combineReducers({
  toastr: toastrReducer,
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  modal: modalReducer,
  shipping: shippingReducer,
  checkout: checkoutReducer,
});

export default persistReducer(persistConfig, rootReducer);
