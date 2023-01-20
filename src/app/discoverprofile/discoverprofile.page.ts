import { Component, OnInit } from '@angular/core';
import { SharePage } from '../modals/share/share.page';
import { ReportuserPage } from '../modals/reportuser/reportuser.page';
import { ModalController, AlertController} from '@ionic/angular';
import {ComponentProps, ModalOptions} from '@ionic/core';
import { ActionSheetController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../services/env.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { PhotoService } from '../services/photo.service';
import { MatchedPage } from '../modals/matched/matched.page';
import { ProfiledescriptionPage } from '../modals/profiledescription/profiledescription.page';

@Component({
  selector: 'app-discoverprofile',
  templateUrl: './discoverprofile.page.html',
  styleUrls: ['./discoverprofile.page.scss'],
})
export class DiscoverprofilePage implements OnInit {
	allimages = [];
	user = [];
	photos = [];
	id:string='';
	discoverUserId:string='';
	userId:string='';
	dataReturned: any;
	profiledata: Observable<any>;
	photodata: Observable<any>;
	matched: boolean = false;
	ifMatch: boolean = false;
	choice: boolean = false;
	like: boolean = false;
	profileId : string = '';

	
	//choice:any;

	
  constructor(public modalController: ModalController,public actionSheetController: ActionSheetController, private photoService: PhotoService, private env: EnvService,private router: Router,private route: ActivatedRoute, private photoservice: PhotoService, private http: HttpClient) {
	/* this.allimages = [
	{
        'imagespath' : '../../assets/images/girl.png'
    }, {
        'imagespath' : '../../assets/images/boy.png'
    },{
        'imagespath' : '../../assets/images/girl.png'
    }
	];
	console.log(this.allimages); */
	
	
		this.id = this.route.snapshot.paramMap.get('id');
		this.profiledata = this.photoservice.profileData(this.id);
		this.profiledata.subscribe(res => {
			console.log(res);		
			this.user = res['results'];
			this.ifMatch = res['matched'];
			console.log(this.ifMatch);
		});
		
		
		this.photodata = this.photoService.imageData(this.id);
		this.photodata.subscribe(res => {
			console.log(res);
			this.photos = res
			
		});

  }
  
    ionViewWillEnter(){
	   
	this.activeStatus();
	this.presentModal(this.id);
	  
  }
  
  
   ionViewWillLeave(){
	   
	 this.closeModal();
  }
  

   slideOpts = {
    initialSlide: 1,
    speed: 400,
slidesPerView: 1,

  };

  ngOnInit() {
  }
  
  async open_Share() {
    const modal = await this.modalController.create({
      component: SharePage,
	  backdropDismiss:true,
	  cssClass: 'share-modal',
	 
    });
	


    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
 }
 
   async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Share',
        handler: () => {
			this.open_Share()
        }
      },
		{
        text: 'Report',
        handler: () => {
          this.open_reportUser()
        }
      }	  
	  
	  
	  
	  ],
	  
    });
    await actionSheet.present();
	}
 

       async open_reportUser() {
    const modal = await this.modalController.create({
      component: ReportuserPage,
	  cssClass: 'reportuser-modal',
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
 
 
   	activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}
	
	

  
  clicked(event){
	  
	//this.choice =  event.srcElement.id;	
	if(event.srcElement.id == 1)
	{
		this.choice = true;
	}	
	else{
		this.choice = false;
		
	}	
    console.log(this.choice)
	
	this.id = this.route.snapshot.paramMap.get('id');
	console.log(this.id);
	this.http.post<any>(this.env.API_URL + '/storelike', {discoverUserId:this.id, like:this.choice, userId:this.env.APP_USER_ID}).subscribe(data => {
	console.log(data);
	this.matched = data.match;
	console.log(this.matched);
	
	if(this.matched == true){		
		this.open_matched();
	}

	//this.router.navigate(['/home']);
	
	
	});

  }
  
  
  
        async open_matched() {
    const modal = await this.modalController.create({
      component: MatchedPage,
	  cssClass: 'matched-modal',
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
 
 
    /*async open_description() {
    const modal = await this.modalController.create({
      component: ProfiledescriptionPage,
	  cssClass: 'profiledescription--modal',
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
 }*/
 
 
	 async presentModal(profileId) {
	  const modal = await this.modalController.create({
		component: ProfiledescriptionPage,
		cssClass: 'profiledesc-modal',
		backdropDismiss:false,
		showBackdrop:false,
		//initialBreakpoint: 0.5,
		//breakpoints: [0.4, 0.5, 0.8],
		componentProps: {
		"profileId": profileId
	  }
	  });
	  return await modal.present();
	  
	  
	}
 
 
    closeModal() {  
    this.modalController.dismiss(); 
	}
 
 


}
