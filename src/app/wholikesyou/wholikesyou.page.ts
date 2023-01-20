import { Component, OnInit } from '@angular/core';
import { UpgradeplansPage } from '../modals/upgradeplans/upgradeplans.page';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from '../services/env.service';
import { PhotoService } from '../services/photo.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-wholikesyou',
  templateUrl: './wholikesyou.page.html',
  styleUrls: ['./wholikesyou.page.scss'],
})
export class WholikesyouPage implements OnInit {
	dataReturned: any;
	showlikes: Observable<any>;
	users=[];
	loginUser=[];
	profiledata: Observable<any>;
	length:string='';
	plusMember:string='';
	
	
  constructor(public modalController: ModalController, private http: HttpClient, private env: EnvService, private photoservice: PhotoService) {
	  
		this.profiledata = this.photoservice.profileData(this.env.APP_USER_ID);
		this.profiledata.subscribe(res => {
		console.log(res);		
		this.loginUser = res['results'];
		this.plusMember=res['results']['plusMember'];
		console.log(this.plusMember);	
		});
	  
	  
	  
	this.loadData();

	  }
	  
	ionViewDidEnter(){
		
	this.loadData();

  }  
  
  
	ionViewWillEnter(){
	
	this.activeStatus();	
}
	  

  ngOnInit() {
  }
  
      async open_upgradePlans() {
    const modal = await this.modalController.create({
      component: UpgradeplansPage,
	  cssClass: 'upgradeplans-modal',
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
 
 
    	loadData() 
	{
		this.showlikes = this.photoservice.showLikes(this.env.APP_USER_ID);
		console.log(this.showlikes);
		this.showlikes.subscribe(res => {
			console.log(res);
			this.length=res.length;	
			this.users = res;
		});
		
	}
	
		activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}
	

}
