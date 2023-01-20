import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { EnvService } from '../../../services/env.service';
import { ApiService } from '../../../api/api.service';

import { Router } from '@angular/router';
//import { randomBytes } from 'crypto';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	id:string='';
  password='';
  constructor(private modalController: ModalController,
        private authService: AuthService,
        private navCtrl: NavController,
        private alertService: AlertService,
        private env: EnvService,
        public toastController: ToastController,
        private http: HttpClient, private router: Router,
        public loadingController: LoadingController,
        private api: ApiService
       ) { }

  ngOnInit() {
  }

  	async presentToast(message) {
	  const toast = await this.toastController.create({
		message: (message)?message:'',
		duration: 2000,
		position: 'top'
	  });
	  toast.present();
	}

		async showAutoHideLoader() {
		this.loadingController.create({
			message: 'Loading...',
			translucent: true,
			showBackdrop: true,
			spinner: 'circles',
			//duration: 2000
		}).then((res) => {
			res.present();

			res.onDidDismiss().then((dis) => {
				console.log('Loading dismissed! after 2 Seconds');
			});
		});
	}

		hideLoader() {
      this.loadingController.dismiss();
    }


  	register(form: NgForm) {
	  //alert('I am called...');
	  //http://192.168.1.21/retailb2b/api/ajax_login

	  this.showAutoHideLoader();
    /*console.log(form);
    alert(this.password);
    return false;
	*/

	  this.http.post<any>(this.env.API_URL + '/ajax_register',
     {user_login:form.value.user_login,
       user_pass: form.value.password}).subscribe(data => {
		//this.postId = data.id;
		this.env.APP_USER_ID = data['data']['id'];
		console.log(data);
		//console.log(data['success']);
		console.log(data['data']);
    console.log({
      user_loginname:form.value.user_login,
      user_login:form.value.user_login,
      password:form.value.password
    });
    this.api.signUp(form.value.user_login, form.value.user_login, form.value.password, this.env.APP_USER_ID);
		this.hideLoader();
		//alert(data['data']['id']);
		this.router.navigate(['/','personal']);


	})
  }

}
