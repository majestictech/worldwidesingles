import { Component, OnInit } from '@angular/core';
import { UpgradeplansPage } from '../modals/upgradeplans/upgradeplans.page';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from '../services/env.service';
import { PhotoService } from '../services/photo.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	dataReturned: any;
	user = [];
	id:string='';
	displayprofile: Observable<any>;
	distance: string = '';
	birthday: string = '';
	display_name: string = '';
	bio: string = '';
	profession: string = '';
	gender: string = '';
	showMe: string = '';
	age:any;
	plusMember:string='';
	image:any;
	lastActive:string='';
	
	profiledata: Observable<any>;
	
	viewEntered = false;
	
  constructor(private env: EnvService,private router: Router, private http: HttpClient, private photoservice: PhotoService, public modalController: ModalController,private route: ActivatedRoute) { 
  
  	/*this.id = this.route.snapshot.paramMap.get('id');
	this.displayprofile = this.photoservice.displayProfile(this.id);
	  this.displayprofile.subscribe(res => {
			console.log(res)
			this.bio = res.bio;
			this.display_name = res.display_name;
			this.age = res.age;
			this.profession = res.profession;
			this.gender = res.gender;
			this.showMe = res.showMe;
			this.image = res.image;
			
		}
	);*/
  
  
  this.loadData();
  
  }
  
  
  ionViewWillEnter(){
	  
	 this.loadData(); 
	 
	 this.activeStatus();
	 
	 this.viewEntered = true;
  }
  
  slideOptsOne = {
 initialSlide: 0,
 slidesPerView: 1,
 autoplay:true
};
  

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
		//alert('testing');
		this.profiledata = this.photoservice.profileData(this.env.APP_USER_ID);
		this.profiledata.subscribe(res => {
			console.log(res);		
			this.user = res['results'];
			this.plusMember=res.plusMember;
			this.lastActive = res.lastActive;
		});
	}
	
	activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}

}
