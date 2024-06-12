import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue ,update, remove} from "firebase/database";

const config = {
    apiKey: "AIzaSyBwKkgNN9OlIqlLEpkDbu5cX6Kzw9OJPW0",
    authDomain: "restaurant-menu-2f3c2.firebaseapp.com",
    databaseURL: "https://restaurant-menu-2f3c2-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "restaurant-menu-2f3c2",
    storageBucket: "restaurant-menu-2f3c2.appspot.com",
    messagingSenderId: "1062433609795",
    appId: "1:1062433609795:web:d9be036cccf6752b325cf6"
}

const app = initializeApp(config);
const database = getDatabase(app);

export { database, ref, set, get, onValue, update, remove };