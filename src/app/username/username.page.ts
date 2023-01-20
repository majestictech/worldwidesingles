import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../services/env.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { PhotoService } from '../services/photo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})
export class UsernamePage implements OnInit {
	ionicForm: FormGroup;
	authForm: FormGroup;
	user_login: string = '';
	loading: any;
	user = [];
	profiledata: Observable<any>;
	constructor(private photoservice: PhotoService, private http: HttpClient,private env: EnvService,public formBuilder: FormBuilder, private router: Router,private authService: AuthService, private loadingController: LoadingController,private alertService: AlertService) { this.loadData(); }

  ngOnInit() { }
  
 
 	ionViewWillEnter(){
	   
	this.activeStatus();
	  
	}
  
  /*async majUsernameEdit(form: NgForm){
	  this.loading = await this.loadingController.create({
      message: 'Loading...',
    });
	
	this.loading.present();
	//var mpassword = form.mpassword;
	//var mcpassword = form.mcpassword;
	
	this.authService.majUsername(form.value.user_login).subscribe(
	  
      data => {
		this.loading.dismiss();
	  },
      error => {
		  this.alertService.presentToast("Error.");
		  this.loading.dismiss();
        console.log(error);
      },
      () => {
        
      }
	  
	  
    );

	  
  }	
  	*/
  
  	loadData() 
	{
		this.profiledata = this.photoservice.profileData(this.env.APP_USER_ID);
		this.profiledata.subscribe(res => {
			console.log(res);		
			this.user = res['results'];
		});
	}
	
  	activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}

	  
  

}
