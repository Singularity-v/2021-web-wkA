import {
  SET_PAGE_TITLE,
  SET_PAGE_CONTENT,
  SET_NAVBAR_ACTIVEITEM,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_PRODUCT_DETAIL,
  BEGIN_PRODUCTS_FEED,
  SUCCESS_PRODUCTS_FEED,
  FAIL_PRODUCTS_FEED,
  BEGIN_PRODUCTS_REQUEST,
  SUCCESS_PRODUCTS_REQUEST,
  FAIL_PRODUCTS_REQUEST,
} from "../utils/constants";

import {getProducts, getProductById, feedProducts} from "../api/index.js";

export const addCartItem = (dispatch, product, qty,col,colNum) => {
  const item = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    author:product.author,
    countInStock: product.countInStock,
    qty,
    col,
    colNum
  };
  dispatch({
    type: ADD_CART_ITEM,
    payload: item,
  });
};

export const removeCartItem = (dispatch, productId) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });
};

export const feedJSONToFirebase = async (dispatch) => {
  dispatch({ type: BEGIN_PRODUCTS_FEED });
  try {
    await feedProducts();
    dispatch({ type: SUCCESS_PRODUCTS_FEED });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_FEED, payload: error });
  }
}

export const setProductDetail = async (dispatch, productId, qty,col,colNum) => {
  dispatch({ type: BEGIN_PRODUCTS_REQUEST });
  try{
    const product = await getProductById(productId);

    if(col==="")col="None";
    if(qty === 0)
    // if(col==="")col="None";
    dispatch({
      type: SET_PRODUCT_DETAIL,
      payload: {
        product,
      }
    })
    else
    dispatch({
      type: SET_PRODUCT_DETAIL,
      payload: {
        product,
        qty,
        col,
        colNum
      }
    })
    dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
  }

}

export const setPage = async (dispatch, url, title) => {
  let products = [];
  dispatch({
    type: SET_PAGE_TITLE,
    payload: title,
  });
  try {
    products = await getProducts(url);
    dispatch({
      type: SET_PAGE_CONTENT,
      payload: { title, products },
    });
    dispatch({
      type: SET_NAVBAR_ACTIVEITEM,
      payload: url,
    });
    dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
  }
}
// export const pageContentsSet = (dispatch, title, products) => {
//   dispatch({
//     type: SET_PAGE_CONTENT,
//     payload: { title, products },
//   });
// };

// export const activeNavItemSet = (dispatch, activeNavItem) => {
//   dispatch({
//     type: SET_NAVBAR_ACTIVEITEM,
//     payload: activeNavItem,
//   });
// };