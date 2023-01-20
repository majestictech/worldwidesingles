import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { EnvService } from '../services/env.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
	ionicForm: FormGroup;
	authForm: FormGroup;
	display_name: string = '';
	age: string = '';
	requiredFields: boolean = false;
	

  constructor(public formBuilder: FormBuilder, private router: Router,private env: EnvService,private http: HttpClient, private route: ActivatedRoute) { 
	
  }

  ngOnInit() {
	  
  }
  
    checkRequired(ev: any, type) {
	
	
	if(type == "display_name")
		this.display_name = ev.target.value;

	if(type == "age")
		this.age = ev.target.value;
	
	if(this.display_name != '' && this.age != '')
		this.requiredFields = true;
	else
		this.requiredFields = false;
  }
  
  
  

	majStoreProfile(form: NgForm){		

	this.http.post<any>(this.env.API_URL+ '/storeprofile' , {id:this.env.APP_USER_ID, display_name:form.value.display_name, age:form.value.age, showMe:form.value.showMe, gender:form.value.gender,profession:form.value.profession, bio:form.value.bio}).subscribe(data => {
		console.log(data);
		this.router.navigate(['/rules']);
	});	
	}

}
