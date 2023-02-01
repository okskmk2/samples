import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { collection, getDocs, getDoc, getFirestore, doc, setDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';

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


export {
    Storage
}