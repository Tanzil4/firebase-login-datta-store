 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
 import { getAuth , onAuthStateChanged , createUserWithEmailAndPassword  , signInWithEmailAndPassword , signOut   } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
 import { getFirestore,  collection, addDoc , getDocs  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
    apiKey: "AIzaSyDxKqpGtGvc1pDrky6ixSAFIkPZSaBHMxY",
    authDomain: "database-1a7f6.firebaseapp.com",
    projectId: "database-1a7f6",
    storageBucket: "database-1a7f6.appspot.com",
    messagingSenderId: "508559810367",
    appId: "1:508559810367:web:473a8e0ae78cb5d9a2fd8a",
    measurementId: "G-59YV5XSTBG"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 console.log(app);
 const analytics = getAnalytics(app);
 const auth = getAuth(app);
console.log(auth);



onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid = user.uid;
      console.log('user is loggin');
      login.style.display = 'none'
      logout.style.display = 'block'

  } else {
    console.log('user is not loggin');
       login.style.display = 'block'
      logout.style.display = 'none'
  }
});
let signup_email = document.getElementById('signup_email')
let signup_pass = document.getElementById('signup_pass')
let signup_btn = document.getElementById('signup_btn')

let signin_email = document.getElementById('signin_email')
let signin_pass = document.getElementById('signin_pass')
let signin_btn = document.getElementById('signin_btn')

let login = document.getElementById('login')
let logout = document.getElementById('logout')

let logout_btn = document.getElementById('logout_btn')

logout_btn.addEventListener('click', logout_acc)

signup_btn.addEventListener('click', signup_account)

signin_btn.addEventListener('click', signin_accountemail)




function signup_account() {
    createUserWithEmailAndPassword(auth, signup_email.value, signup_pass.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });

  addnumpass()
  async function addnumpass() {
    try {
      const docRef1 = await addDoc(collection(db, "users"), {
        email : signup_email.value,
        pass : signup_pass.value,
       
      });
      console.log("Document written with ID: ", docRef1.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }
  signup_email.value = ''
  signup_pass.value = ''
}

function signin_accountemail() {
    signInWithEmailAndPassword(auth, signin_email.value, signin_pass.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  signin_email.value = ''
  signin_pass.value = ''
}


function logout_acc() {
    
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}



const db = getFirestore(app);
console.log(db);


let prodimg = document.getElementById('prodimg')
let cat = document.getElementById('cat')
let productname = document.getElementById('productname')

let product_btn = document.getElementById('product_btn')
product_btn.addEventListener('click', addnumberdb)

function addnumberdb() {
  addnum()
  async function addnum() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        Img : prodimg.value,
        category : cat.value,
        product : productname.value
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }
  getbd()
}
let show = document.getElementById('show')
getbd()
async function getbd() {
  const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
// console.log(doc.id);
// console.log(doc.data());
let {Img, category, product} = doc.data()
console.log(Img);
let ele = ` <img src=${Img} alt="">
 <h2 class="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                ${product}
              </h2>
               <p class="text-sm mt-6 text-gray-800">${category}</p>`

               show.innerHTML+= ele
});

}