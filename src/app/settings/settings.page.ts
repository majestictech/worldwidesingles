import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from '../services/env.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { LogoutPage } from '../modals/logout/logout.page';
import { SharePage } from '../modals/share/share.page';
import { PhotoService } from '../services/photo.service';
import { Observable } from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SocialService } from './../services/social.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
	dataReturned: any;
	id:string='';
	display_name: string = '';
	age:any;
	maxDistance:any;
	upper: any;
	lower: any;
	active : boolean = false;
	contactNumber:any;
	ionicForm: FormGroup;
	authForm: FormGroup;
	user_login: string = '';
	loading: any;
	agePreference = [];
	profiledata: Observable<any>;
	 message: string;
 image: string;
 instaimage: string;
 murl: string;
 subject: string;


	constructor(public _social: SocialService, private socialSharing: SocialSharing, private photoservice: PhotoService, private http: HttpClient,private env: EnvService,public formBuilder: FormBuilder, private router: Router,private authService: AuthService, private loadingController: LoadingController,private alertService: AlertService,private route: ActivatedRoute,public modalController: ModalController) {
		
	//this.id = this.route.snapshot.paramMap.get('id');
	this.profiledata = this.photoservice.profileData(this.env.APP_USER_ID);
	this.profiledata.subscribe(res => {
		console.log(res)
		this.maxDistance = res['results']['maxDistance'];
		this.agePreference = res['results'];	
	}
	);

	
	}
	
	ionViewWillEnter(){
	   
	this.activeStatus();
	  
	}

	ngOnInit() {	
	}

	
	majSettingsEdit(form: NgForm){
	//console.log('Value Is: ');
	//console.log(form.value.user);
	this.http.post<any>(this.env.API_URL + '/updateprofile', {id:this.env.APP_USER_ID, maxDistance:form.value.maxDistance, lower:form.value.agePreference['lower'], upper:form.value.agePreference['upper']}).subscribe(data => {
		console.log(data);
		this.router.navigate(['/profile']);
		});
	
	}

  
        async open_Share() {
    const modal = await this.modalController.create({
      component: SharePage,
	  cssClass: 'share-modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
 }
  
      async open_LogoutPage() {
    const modal = await this.modalController.create({
      component: LogoutPage,
	  cssClass: 'logout-modal',
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
 }
 


  checkValue(ev: any) {
	console.log('Value Is: ');
	console.log(ev.target.value);
  }
  
  
   async shareLink(){
		this.message = "test";
		//console.log(mysharemessage);
		//mysharemessage = window.encodeURIComponent(mysharemessage);
		
		this._social.share(
              "none",
              "Share",
              "none",
              this.message,
              this.subject,
              this.image,
              this.murl
            );
			
  }
  
  
  	activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}

  

	

}
