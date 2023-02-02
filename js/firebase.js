import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { collection, getDocs, getDoc, getFirestore, doc, setDoc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyArnCVV0YwLNFEyRGiUUcgjirmIxogKsjY",
    authDomain: "baeundev-e80f2.firebaseapp.com",
    projectId: "baeundev-e80f2",
    storageBucket: "baeundev-e80f2.appspot.com",
    messagingSenderId: "1004641766437",
    appId: "1:1004641766437:web:5ef9845e8ed990e7a103cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve({
                    email: user.email, displayName: user.displayName
                });
            } else {
                reject();
            }
        });
    });
}



class Storage {
    constructor(storeName) {
        this.storeName = storeName;
    }
    async get(uuid) {
        const docRef = doc(db, this.storeName, uuid);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }

    async add(data) {
        return await setDoc(doc(db, this.storeName, crypto.randomUUID()), data);
    }

    async update(uuid, data) {
        return await updateDoc(doc(db, this.storeName, uuid), data);
    }

    async getAll() {
        let items = [];
        const querySnapshot = await getDocs(collection(db, this.storeName));
        querySnapshot.forEach((doc) => {
            items.push({
                ...doc.data(),
                uuid: doc.id
            })
        });
        return items;
    }

    async remove(uuid) {
        return await deleteDoc(doc(db, this.storeName, uuid));
    }
}
/**
 * 
 * @param {string} email 
 * @param {string} password 
 */
async function firebaseSignIn(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;;
}

async function firebaseSignUp(email, password, profile) {
    await createUserWithEmailAndPassword(auth, email, password);
    const { displayName, photoURL } = profile;
    await updateProfile(auth.currentUser, { displayName, photoURL });
}

function firebaseSignOut() {
    return signOut(auth);
}


export {
    Storage, firebaseSignIn, getCurrentUser, firebaseSignOut, firebaseSignUp
}