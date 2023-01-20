import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../services/env.service';
import { PhotoService } from '../services/photo.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {
	ionicForm: FormGroup;
	authForm: FormGroup;
	email: string = '';
	user = [];
	profiledata: Observable<any>;

  constructor(private env: EnvService,public formBuilder: FormBuilder, private router: Router, private photoservice: PhotoService, private http: HttpClient) { this.loadData();}

  ngOnInit() {
  }
  
      majEmail(form: NgForm){
	//this.showAutoHideLoader();
	
	const postData = new FormData();
	postData.append('email', form.value.email);
		this.router.navigate(['/email']);
	
	}
	
	ionViewWillEnter(){
	   
	this.activeStatus();
	  
	}
	
	
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
