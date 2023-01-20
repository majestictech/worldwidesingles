import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { EnvService } from '../services/env.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(private env: EnvService, private http: HttpClient) { }

  ngOnInit() {
  }
  
    ionViewWillEnter(){
	   
	this.activeStatus();
	  
  }
  
  
  	activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}

}
