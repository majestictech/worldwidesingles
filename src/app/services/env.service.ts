import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  //API_URL = 'https://majestictechnosoft.com/retailb2b/api';
  API_URL = 'https://majestictechnosoft.com/worldwide/api';

  APP_USER_ID = '';
  current_user = null;
  display_name = null;
  PHONE_NUMBER = null;
  STORE_NAME = null;
  USER_ROLE = null;
  APP_VERSION = '0.0.1';

  
message = "test message";
subject = null;

  constructor(private platform: Platform,private http: HttpClient,public router: Router,private toastController: ToastController) {
	if(localStorage.getItem('APP_USER_ID') == 'null') {
		this.router.navigate(['/login']);
	}
	else {
		//this.router.navigate(['/home']);
		this.APP_USER_ID = localStorage.getItem('APP_USER_ID');
	}
  }
}