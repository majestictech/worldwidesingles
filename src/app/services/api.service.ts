import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loader: boolean = false;
  user: any;
  db: any;
  constructor(private router: Router) { }
  configApp() {
    //const app = initializeApp(environment.firebase);
    //const db = getFirestore(app);

    firebase.initializeApp(environment.firebase);
	  //firebase.firestore().settings({ experimentalForceLongPolling: true });

    this.db = firebase.firestore();//firebase.database();

  }

  signin(email: string, password: string) {

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      this.loader = false;

      this.user = {
        id: email.substring(0, email.indexOf('@')).toLowerCase()
      };

      localStorage.setItem('loggedIn', this.user.id);
      //this.router.navigate(['/tabs/tab2'], { skipLocationChange: false })
    })
    .catch((error)=> {
      // Handle Errors here.
      this.loader = false;
      console.log('error while signin', error);
      //this.snack.openSnackBar(error.message, 'ok');
      // ...
    });




  }

  signUp(name: string, email: string, password: string) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      this.loader = false;

      this.user = {
        name: name,
        id: email.substring(0, email.indexOf('@')).toLowerCase()
      };
      localStorage.setItem('loggedIn', this.user.id);

      // create user list on firebase
      this.db.collection("users").doc(this.user.id).set({
        name: name,
        id: this.user.id
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

    firebase.auth().signOut().then(()=> {
      alert('Logged out successfully');
      this.user = {};
      localStorage.removeItem('loggedIn');
	  localStorage.removeItem('APP_USER_ID');
      //this.router.navigate(['/tabs/tab1'], { skipLocationChange: false });

    }).catch((error)=> {
      console.log('error while logout', error);
    });


  }

  sendMsg(id: string, to: string, from: string, msg: string) {
    const unique = this.generateRandomString(16);

    this.db.collection('chatRoom/').doc(unique).set({
      key: this.generateRandomString(6),
      id: [`${to}`, `${from}`],
      to: (to) ? to : 'admin',
      from: (from) ? from : 'admin',
      msg: (msg) ? msg : '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

  }

  generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
