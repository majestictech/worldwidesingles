import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../services/env.service';
import { PhotoService } from '../services/photo.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
	ionicForm: FormGroup;
	id:string='';
	authForm: FormGroup;
	distance: string = '';
	birthday: string = '';
	display_name: string = '';
	bio: string = '';
	profession: string = '';
	gender: string = '';
	hobbies: string = '';
	showMe: string = '';
	instagram: string = '';
	age:any;
	profiledata: Observable<any>;	
	latitude: any = 0; //latitude
	longitude: any = 0; //longitude
  constructor(private geolocation: Geolocation, public formBuilder: FormBuilder, private router: Router,private env: EnvService, private photoservice: PhotoService, private http: HttpClient,private route: ActivatedRoute) { 
  
	this.id = this.route.snapshot.paramMap.get('id');
	this.profiledata = this.photoservice.profileData(this.id);
	  this.profiledata.subscribe(res => {
			console.log(res)
			this.bio = res['results']['bio'];
			this.display_name = res['results']['display_name'];
			this.age = res['results']['age'];
			this.profession = res['results']['profession'];
			this.gender = res['results']['gender'];
			this.showMe = res['results']['showMe'];
			this.hobbies = res['results']['hobbies'];
			this.instagram = res['results']['instagram'];
			
		}
	);
  
  }
  
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  
    ionViewWillEnter(){
	   
	this.activeStatus();
	  
  }
  
  
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ngOnInit() {
  }
  
    majEditProfile(form: NgForm){
	this.http.post<any>(this.env.API_URL + '/updateprofile', {id:this.id, display_name:form.value.display_name, hobbies:form.value.hobbies , age:form.value.age, showMe:form.value.showMe, gender:form.value.gender,profession:form.value.profession, bio:form.value.bio, instagram:form.value.instagram }).subscribe(data => {
		console.log(data);
			this.router.navigate(['/profile']);
		});
	
	}
	
	
	   	activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}
	
	
	
		


}
