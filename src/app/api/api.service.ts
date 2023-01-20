import { Injectable } from '@angular/core';
//import { initializeApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  'firebase/compat/firestore';
//import * as firebase from '@awesome-cordova-plugins/firebase/ngx';
//import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';
//import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication/ngx';
import { Router } from '@angular/router';
//import { SnackbarService } from '../services/snackbar.service';
import { environment } from '../../environments/environment';
//import { FirebaseConfig } from '@awesome-cordova-plugins/firebase-config/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loader = false;
  user: any;
  db: any;

  constructor(
    //private snack: SnackbarService,

    private router: Router,
    //private firebase: firebase,
    //private firebaseAuthentication: FirebaseAuthentication,
    //private firebaseConfig: FirebaseConfig
  ) {

  }

  configApp() {
    //const app = initializeApp(environment.firebase);
    //const db = getFirestore(app);

    firebase.initializeApp(environment.firebase);
	  //firebase.firestore().settings({ experimentalForceLongPolling: true });

    this.db = firebase.firestore();//firebase.database();

  }

  signin(email: string, password: string) {


    /*this.firebaseAuthentication.signInWithEmailAndPassword(email, password)
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
*/
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      this.loader = false;

      this.user = {
        id: email.substring(0, email.indexOf('@')).toLowerCase()
      };
      console.log('user from api service');
      console.log(this.user);
      console.log('user from api service ends');

      localStorage.setItem('loggedIn', this.user.id);
      //this.router.navigate(['/tabs/tab2'], { skipLocationChange: false });

    })
    .catch((error)=> {
      // Handle Errors here.
      //this.loader = false;
      console.log('error while signin', error);
      //this.snack.openSnackBar(error.message, 'ok');
      // ...
    });




  }

  signUp(name: string, email: string, password: string, appUserId: string ) {

  /*this.firebaseAuthentication.createUserWithEmailAndPassword(email, password)
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
  */

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      this.loader = false;

      this.user = {
        name: name,
        id: email.substring(0, email.indexOf('@')).toLowerCase()
      };
      localStorage.setItem('loggedIn', this.user.id);

      // create user list on firebase
      this.db.collection('users').doc(this.user.id).set({
        name: name,
        id: this.user.id,
        appUserId: ((appUserId)?appUserId:'')
      });

      // redirect to home
      alert('Registration successfull, Please login now.')
      //this.router.navigate(['/tabs/tab1'], { skipLocationChange: false })
    })
    .catch((error)=> {
      // Handle Errors here.
      this.loader = false;
      alert('Error while sign up');
      console.log('error while signup', error);
      //this.snack.openSnackBar(error.message, 'ok');
      // ...
    });


  }

  signOut(){

    /*this.firebaseAuthentication.signOut()
  .then((res: any) => {
    console.log(res)}
  )
  .catch((error: any) => console.error(error));
*/
    firebase.auth().signOut().then(()=> {
      //alert('Logged out successfully');
      this.user = {};
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('APP_USER_ID');
	  
      this.router.navigate(['/tabs/tab1'], { skipLocationChange: false });

    }).catch((error)=> {
      console.log('error while logout', error);
    });


  }

  sendMsg(id: string, to:string, from:string, msg: string) {
    let unique = this.generateRandomString(16);

    this.db.collection("chatRoom/").doc(unique).set({
      key: this.generateRandomString(6),
      id: [`${to}`, `${from}`],
      to: (to) ? to : 'admin',
      from: (from) ? from : 'admin',
      msg: msg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

  }

  generateRandomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}
