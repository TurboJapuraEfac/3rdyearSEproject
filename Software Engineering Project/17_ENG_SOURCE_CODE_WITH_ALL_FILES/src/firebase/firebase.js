import { config } from './config';
import * as firebase from 'firebase';
import 'firebase/firestore'

firebase.initializeApp(config);
const db = firebase.firestore();

// signup correctly works
export function signUp(userDetails) {
    return new Promise((resolve, reject) => {
        const { userName, userEmail,userNIC, userMobile, userPassword, userCity, userAddress, userGender, userAge, userProfileImage, isCustomer, isSeller, isDelivery,isAdmin, typeOfGood } = userDetails;
        firebase.auth().createUserWithEmailAndPassword(userDetails.userEmail, userDetails.userPassword)
        .then((success) => {
            let user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            };
            firebase.storage().ref().child(`userProfileImage/${uid}/` + userProfileImage.name).put(userProfileImage).then((url) => {
                url.ref.getDownloadURL().then((success) => {
                    const userProfileImageUrl = success
                    console.log(userProfileImageUrl)
                    const userDetailsForDb = {
                        userName: userName,
                        userEmail: userEmail,
                        userNIC:userNIC,
                        userMobile:userMobile,
                        userPassword: userPassword,
                        userCity: userCity,
                        userAddress: userAddress,
                        userGender: userGender,
                        userAge: userAge,
                        userUid: uid,
                        isCustomer: isCustomer,
                        isSeller :isSeller,
                        isDelivery:isDelivery,
                        isAdmin:isAdmin,
                        userProfileImageUrl: userProfileImageUrl,
                        typeOfGood: typeOfGood,
                    }
                    db.collection("users").doc(uid).set(userDetailsForDb).then((docRef) => {
                        if (userDetailsForDb.isCustomer) {
                            userDetails.propsHistory.push("/shops");
                            resolve(userDetailsForDb)
                        }
                        if (userDetailsForDb.isSeller) {
                            userDetails.propsHistory.push("/order-requests");
                            resolve(userDetailsForDb)
                        }
                        if (userDetailsForDb.isDelivery) {
                            userDetails.propsHistory.push("/delivery-requests");
                            resolve(userDetailsForDb)
                        }
                        if (userDetailsForDb.isAdmin) {
                            userDetails.propsHistory.push("/admin-profile");
                            resolve(userDetailsForDb)
                        }
                        else {
                            userDetails.propsHistory.push("/");
                            resolve(userDetailsForDb)
                        }
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                        reject(error)
                    })
                }).catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log("Error in getDownloadURL function", errorMessage);
                    reject(errorMessage)
                })
            }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("Error in Image Uploading", errorMessage);
                reject(errorMessage)
            })
        }).catch((error) => {
            var errorMessage = error.message;
            console.log("Error in Authentication", errorMessage);
            reject(errorMessage)
        })
    })
}

//Login correctly works
export function logIn(userLoginDetails) {
    return new Promise((resolve, reject) => {
        const { userLoginEmail, userLoginPassword } = userLoginDetails;
        firebase.auth().signInWithEmailAndPassword(userLoginEmail, userLoginPassword).then((success) => {
            db.collection('users').doc(success.user.uid).get().then((snapshot) => {
                if (snapshot.data().isCustomer) {
                    userLoginDetails.propsHistory.push("/shops");
                    resolve(success)
                }
                else if (snapshot.data().isSeller) {
                    userLoginDetails.propsHistory.push("/order-requests");
                    resolve(success)
                }
                else if (snapshot.data().isDelivery) {
                    userLoginDetails.propsHistory.push("/delivery-requests");
                    resolve(success)
                }
                else if (snapshot.data().isAdmin) {
                    userLoginDetails.propsHistory.push("/admin-profile");
                    resolve(success)
                }
                else {
                    userLoginDetails.propsHistory.push("/");
                    resolve(success)
                }
            })
        }).catch((error) => {
            var errorMessage = error.message;
            reject(errorMessage)
        });

    })
}

//done
export function addItem(itemDetails) {
    const { itemTitle, itemDescription, itemPrice, itemImage, chooseItemType,chooseYourLocation } = itemDetails;
    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        };
        firebase.storage().ref().child(`itemImage/${uid}/` + itemImage.name).put(itemImage).then((url) => {
            url.ref.getDownloadURL().then((success) => {
                const itemImageUrl = success
                console.log(itemImageUrl)
                const itemDetailsForDb = {
                    itemTitle: itemTitle,
                    itemDescription: itemDescription,
                    itemPrice: itemPrice,
                    itemImageUrl: itemImageUrl,
                    chooseItemType: chooseItemType,
                    chooseYourLocation:chooseYourLocation,
                }
                db.collection("users").doc(uid).collection("menuItems").add(itemDetailsForDb).then((docRef) => {
                    resolve("Successfully added food item")
                }).catch(function (error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    reject(errorMessage)
                })
            }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("Error in getDownloadURL function", errorCode);
                console.log("Error in getDownloadURL function", errorMessage);
                reject(errorMessage)
            })
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Error in Image Uploading", errorMessage);
            reject(errorMessage)
        })
    })
}

export function orderNow(cartItemsList, totalPrice, shopDetails, userDetails, history) {
    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        };
        
        const myOrder = {
            itemsList: cartItemsList,
            totalPrice: totalPrice,
            status: "PENDING",
            ...shopDetails,
        }

        const orderRequest = {
            itemsList: cartItemsList,
            totalPrice: totalPrice,
            status: "PENDING",
            ...userDetails,
        }

        db.collection("users").doc(uid).collection("myOrder").add(myOrder).then((docRef) => {
            db.collection("users").doc(shopDetails.id).collection("orderRequest").doc(docRef.id).set(orderRequest).then((docRef) => {
                resolve('Successfully ordered')
            }).catch(function (error) {
                console.error("Error adding document: ", error.message);
                reject(error.message)
            })
        }).catch(function (error) {
            console.error("Error adding document: ", error.message);
            reject(error.message)
        })
    })
}

export function orderNowStripe(cartItemsList, totalPrice, shopDetails, userDetails, history) {
    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        };
        
        const myOrder = {
            itemsList: cartItemsList,
            totalPrice: totalPrice,
            status: "PENDING",
            ...shopDetails,
        }

        const orderRequest = {
            itemsList: cartItemsList,
            totalPrice: totalPrice,
            status: "PENDING",
            ...userDetails,
        }

        db.collection("users").doc(uid).collection("myOrder").add(myOrder).then((docRef) => {
            db.collection("users").doc(shopDetails.id).collection("orderRequest").doc(docRef.id).set(orderRequest).then((docRef) => {
                resolve('Successfully ordered')
            }).catch(function (error) {
                console.error("Error adding document: ", error.message);
                reject(error.message)
            })
        }).catch(function (error) {
            console.error("Error adding document: ", error.message);
            reject(error.message)
        })
    })
}


export function SelectDeliveryPerson(userDetails,orderId,deliveryDetails, history) {
    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        };
         firebase.firestore().collection('users').doc(uid).collection('orderRequest').doc(orderId).then((snapshot) => {

            const shopOrder =
            {
            ...userDetails,    
            ...snapshot.data()
            }

            console.log(shopOrder);
            
            }).catch(function (error) {
            console.error("Error adding document: ", error.message);
            reject(error.message)
        })  
    })
}



export default firebase;