import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
	apiKey: "AIzaSyBfxyAj08EWQS5oyHWxRW4XMahRA4nsdfU",
	authDomain: "apric-todo-app.firebaseapp.com",
	projectId: "apric-todo-app",
	storageBucket: "apric-todo-app.appspot.com",
	messagingSenderId: "124932682635",
	appId: "1:124932682635:web:d77a68b8c537dd22ce358e",
	measurementId: "G-L85DRYB9C7"
};

const app = initializeApp(config);
const db = getFirestore(app);
export default db;
