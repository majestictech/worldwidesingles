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
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.page.html',
  styleUrls: ['./phonenumber.page.scss'],
})
export class PhonenumberPage implements OnInit {
	id:string='';
	contactNumber:any;
	distance: string = '';
	birthday: string = '';
	display_name: string = '';
	bio: string = '';
	profession: string = '';
	gender: string = '';
	showMe: string = '';
	age:any;
	ionicForm: FormGroup;
	authForm: FormGroup;
	user_login: string = '';
	loading: any;
	user = [];
	profiledata: Observable<any>;
	constructor(private photoservice: PhotoService, private http: HttpClient,private env: EnvService,public formBuilder: FormBuilder, private router: Router,private authService: AuthService, private loadingController: LoadingController,private alertService: AlertService,private route: ActivatedRoute) {
		
	this.id = this.route.snapshot.paramMap.get('id');
	this.profiledata = this.photoservice.profileData(this.id);
	this.profiledata.subscribe(res => {
		this.contactNumber = res.contactNumber;
		this.bio = res.bio;
		this.display_name = res.display_name;
		this.age = res.age;
		this.profession = res.profession;
		this.gender = res.gender;
		this.showMe = res.showMe;		
	}
	
	);
		
	this.loadData();
	}
	
  ionViewWillEnter()
  {
	this.activeStatus();
  }

	ngOnInit() {
	}
	
	    majNumberEdit(form: NgForm){
	this.http.post<any>(this.env.API_URL + '/updateprofile', {id:this.id, contactNumber:form.value.contactNumber}).subscribe(data => {
		console.log(data);
			this.router.navigate(['/settings/', this.env.APP_USER_ID]);
		});
	
	}
	

	loadData() 
	{
		this.profiledata = this.photoservice.profileData(this.env.APP_USER_ID);
		this.profiledata.subscribe(res => {
			console.log(res);		
			this.user = res
		});
	}
	
	activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}
}
