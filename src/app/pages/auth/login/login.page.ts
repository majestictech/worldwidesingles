import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { EnvService } from '../../../services/env.service';
import { ApiService } from '../../../api/api.service';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
showPassword = false;
@ViewChild('showHidePassword', { static: false }) passwordInput: IonInput;

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
	private http: HttpClient,
	private env: EnvService,
	public router: Router,
	public toastController: ToastController,
	public loadingController: LoadingController,
  private api: ApiService
  ) { }

  ngOnInit() {
  }

	async presentToast(message) {
	  const toast = await this.toastController.create({
		message: message,
		duration: 2000,
		position: 'top'
	  });
	  toast.present();
	}

	toggleShow() {
		this.showPassword = !this.showPassword;
		this.passwordInput.type = this.showPassword ? 'text' : 'password';
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

	login(form: NgForm) {
	  //alert('I am called...');
	  //http://192.168.1.21/retailb2b/api/ajax_login

	  //this.showAutoHideLoader();

	  this.http.post<any>(this.env.API_URL + '/ajax_login',
    {username:	form.value.username,
    password:  form.value.password}).subscribe(data => {
		//this.postId = data.id;
		console.log(data);
		//console.log(data['success']);
		console.log(data['data']);
		
		if(data['success'] == true) {
			console.log(data['data'].id);

			console.log(data);



			this.env.APP_USER_ID = data['data'].id;
			this.env.display_name = data['data'].display_name;
			this.api.signin(form.value.username, form.value.password);

			localStorage.setItem('APP_USER_ID', this.env.APP_USER_ID);
			
			this.presentToast("Login Successful");
			//this.hideLoader();
			this.router.navigate(['/home']);
		}
		else {
			// Login Failed
			this.hideLoader();
			this.presentToast('Invalid Username and/or Password');
		}
	});
  }
}
