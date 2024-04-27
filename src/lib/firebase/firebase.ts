import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const API_KEY = process.env.API_KEY;
const AUTHDOMAIN = process.env.AUTHDOMAIN;
const APPID = process.env.APPID;
const MEASUREMENTID = process.env.MEASUREMENTID;
const MESSAGINGSENDERID = process.env.MESSAGINGSENDERID;
const STORAGEBUCKET = process.env.STORAGEBUCKET;
const PROJECTID = 'teach-connect-nextjs-a6f84';

const firebaseConfig = {
  apiKey: "AIzaSyBDYPfQVVCVe8wvXF_bmNoFDZjM1dI3TGo",
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();
export const auth = getAuth(app);

export default database;
