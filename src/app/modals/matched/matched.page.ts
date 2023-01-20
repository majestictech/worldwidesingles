import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { EnvService } from '../../services/env.service';
import { PhotoService } from '../../services/photo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-matched',
  templateUrl: './matched.page.html',
  styleUrls: ['./matched.page.scss'],
})
export class MatchedPage implements OnInit {
	
	seconduser = [];
	showmatched: Observable<any>;
	profiledata: Observable<any>;
	firstuser = [];

  constructor(public modalCtrl: ModalController,private env: EnvService, private photoservice: PhotoService) {
	  
	  		this.profiledata = this.photoservice.profileData(this.env.APP_USER_ID);
			this.profiledata.subscribe(res => {
			console.log(res);		
			this.firstuser = res['results'];
			});
	  

	this.loadData();
	  }

  ngOnInit() {
  }
  
        closeModal() {  
    this.modalCtrl.dismiss(); 
	}



   	loadData() 
	{
		this.showmatched = this.photoservice.showMatched(this.env.APP_USER_ID);
		console.log(this.showmatched);
		this.showmatched.subscribe(res => {
			console.log(res);		
			this.seconduser = res;
		});
		
	}

}
