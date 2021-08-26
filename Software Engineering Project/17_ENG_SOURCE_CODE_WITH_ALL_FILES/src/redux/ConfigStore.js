const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { ...state, user: action.user };
    }
    case "REMOVE_USER": {
      return { ...state, user: action.user };
    }
    case "SHOP_LIST": {
      return { ...state, shopList: action.shopList };
    }
    case "ORDER_LIST": {
      return { ...state, orderList: action.orderList };
    }
     case "DELIVERY_LIST": {
      return { ...state, deliveryList: action.deliveryList };
    }
    case "ORDER_REQUEST": {
      return { ...state, orderRequest: action.orderRequest };
    }
     case "DELIVERY_ORDER_REQUEST": {
      return { ...state, deliveryorderRequest: action.deliveryorderRequest };
    }
    case "MY_ORDER": {
      return { ...state, myOrder: action.myOrder };
    }
    case "SHOP_ORDER": {
      return { ...state, shopOrder: action.shopOrder };
    }
    case "MY_ITEMS": {
      return { ...state, myItems: action.myItems };
    }
   
    default: {
      return state;
    }
  }
};

export default reducer;
