import firebase from '../firebase/firebase';
const db = firebase.firestore();

//update all types of users
export const update_user = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) 
            {
                db.collection('users').doc(user.uid).get().then((snapshot) => {
                    dispatch({
                        type: 'SET_USER',
                        user: { ...snapshot.data(), isLogin: true }
                    })
                })
            } else {
                // No user is signed in.
            }
        });
    }
}

//log out all types of users
export const remove_user = () => {
    return (dispatch) => {
        firebase.auth().signOut().then(() => {
            console.log("Successfully log out");
            dispatch({
                type: 'REMOVE_USER',
                user: { isLogin: false }
            })
        }).catch((error) => {
            // An error happened.
            let errorMessage = error.message;
            console.log("Log Out Error Message => ", errorMessage);
        });
    }
}

//shop list for customers
export const shop_list = () => {
    return (dispatch) => {
        db.collection('users').onSnapshot(snapshot => {
            const shopList = [];
            snapshot.forEach(doc => {
                if (doc.data().isSeller) {
                    const obj = { id: doc.id, ...doc.data() }
                    shopList.push(obj);
                }
            })
            dispatch({
                type: 'SHOP_LIST',
                shopList: shopList,
            })
        })
    }
}

//order list for delivery guys
export const order_list = () => {
    return (dispatch) => {
        var allorders = db.collectionGroup('orderRequest').where('status', '==', 'IN PROGRESS');
        allorders.get().then(function (querySnapshot) {
        const orderList = [];
        querySnapshot
        .forEach(doc => {
                    const obj = { id: doc.id, ...doc.data() }
                    orderList.push(obj);
                })
                    dispatch({
                    type: 'ORDER_LIST',
                    orderList: orderList,
            });
        });
    }
}

//delivery guys list for shops
export const delivery_list = () => {
    return (dispatch) => {
        db.collection('users').onSnapshot(snapshot => {
            const deliveryList = [];
            snapshot.forEach(doc => {
                if (doc.data().isDelivery) {
                    const obj = { id: doc.id, ...doc.data() }
                    deliveryList.push(obj);
                }
            })
            dispatch({
                type: 'DELIVERY_LIST',
                deliveryList: deliveryList,
            })
        })
    }
}


//order requests to Sellers
export const order_request = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('users').doc(user.uid).collection("orderRequest").onSnapshot(snapshot => {
                    const orderRequest = [];
                    snapshot.forEach(doc => {
                        const obj = { id: doc.id, ...doc.data() }
                        orderRequest.push(obj)
                    })
                    dispatch({
                        type: 'ORDER_REQUEST',
                        orderRequest: orderRequest,
                    })
                })
            }
        });
    }
}

//sellers select delivery persons
export const deliveryorder_request = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('users').doc(user.uid).collection("delorderRequest").onSnapshot(snapshot => {
                    const deliveryorderRequest = [];
                    snapshot.forEach(doc => {
                        const obj = { id: doc.id, ...doc.data() }
                        deliveryorderRequest.push(obj)
                    })
                    dispatch({
                        type: 'DELIVERY_ORDER_REQUEST',
                        deliveryorderRequest: deliveryorderRequest,
                    })
                })
            }
        });
    }
}


//orders from Customers to Seller
export const my_order = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('users').doc(user.uid).collection("myOrder").onSnapshot(snapshot => {
                    const myOrder = [];
                    snapshot.forEach(doc => {
                        const obj = { id: doc.id, ...doc.data() }
                        myOrder.push(obj)
                    })
                    dispatch({
                        type: 'MY_ORDER',
                        myOrder: myOrder,
                    })
                })
            } 
        });
    }
}

//delivery requests from Sellers
export const shop_order = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('users').doc(user.uid).collection("shopOrder").onSnapshot(snapshot => {
                    const shopOrder = [];
                    snapshot.forEach(doc => {
                        const obj = { id: doc.id, ...doc.data() }
                        shopOrder.push(obj)
                    })
                    dispatch({
                        type: 'SHOP_ORDER',
                        shopOrder: shopOrder,
                      
                    })
                      console.log(shopOrder);
                })
                
            } 
        });
    }
}

// add items by Seller
export const my_items = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('users').doc(user.uid).collection("menuItems").onSnapshot(snapshot => {
                    const myItems = [];
                    snapshot.forEach(doc => {
                        const obj = { id: doc.id, ...doc.data() }
                        myItems.push(obj)
                    })
                    dispatch({
                        type: 'MY_ITEMS',
                        myItems: myItems,
                    })
                })
            }
        });
    }
}




