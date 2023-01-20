import { Component, OnInit } from '@angular/core';
import { MatchedPage } from '../modals/matched/matched.page';
import { ModalController, AlertController } from '@ionic/angular';
import { EnvService } from '../services/env.service';
import { PhotoService } from '../services/photo.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 
dataReturned: any;
  

	cards = [];
	discoverprofile: Observable<any>;
	profileCount: number = 0;
	matched: boolean = false;
	

  constructor(private http: HttpClient, private env: EnvService, private photoservice: PhotoService, public modalController: ModalController) {

    //this.cards = [];
	//this.loadTinderCards();
  }

  ionViewWillEnter(){
	  
	 this.loadTinderCards();
	  this.activeStatus();
	  
  }

  /*loadTinderCards() {
    this.cards = [
      {
        img: "../../../assets/images/avi-richards-cq5f6ZTMaYQ-unsplash.png",
        title: "Eliza Willliams",
		age:"23",
        designation: "Art Manager",
        distance: "10 miles",
        description: "Feminist Cats. Other stuff that's mildly interesting."
      },
      {
        img: "../../../assets/images/brooke-cagle-pJqfhKUpCh-1.png",
        title: "Eliza Willliams",
		age:"23",
        designation: "Art Manager",
        distance: "10 miles",
        description: "Feminist Cats. Other stuff that's mildly interesting."
      },
      {
        img: "../../../assets/images/court-cook-TSZo17r3m0s-unsplash.png",
        title: "Eliza Willliams",
		age:"23",
        designation: "Art Manager",
        distance: "10 miles",
        description: "Feminist Cats. Other stuff that's mildly interesting."
      },
      {
        img: "../../../assets/images/joshua-rawson-harris-5.png",
        title: "Eliza Willliams",
		age:"23",
        designation: "Art Manager",
        distance: "10 miles",
        description: "Feminist Cats. Other stuff that's mildly interesting."
      },
      {
        img: "../../../assets/images/mark-adriane-V-5.png",
        title: "Eliza Willliams",
		age:"23",
        designation: "Art Manager",
        distance: "10 miles",
        description: "Feminist Cats. Other stuff that's mildly interesting."
      }
    ]
  };*/

  logChoice(choice) {
    
	console.log(this.env.APP_USER_ID);
	this.http.post<any>(this.env.API_URL + '/storelike', {discoverUserId:choice['payload']['id'],like:choice['choice'],userId:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		this.matched = data.match;
		console.log(this.matched);
		
		if(this.matched == true){		
			this.open_matched();
		}	
		
		
		});
		

		
	
  }
  ngOnInit() {
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
 
 
   /*	loadTinderCards() 
	{
		this.reloadprofile = this.photoservice.reloadProfile(this.env.APP_USER_ID);
		console.log(this.reloadprofile);
		this.reloadprofile.subscribe(res => {
			console.log(res);		
			this.cards = res;
		});
		
	}*/
	
	
	loadTinderCards() 
	{
		//alert(this.env.APP_USER_ID);
		this.discoverprofile = this.photoservice.discoverProfile(this.env.APP_USER_ID);
		console.log(this.discoverprofile);
		this.discoverprofile.subscribe(res => {
			console.log(res);		
			this.profileCount = res.length;	
			this.cards = res;
		});
		
	}
	
		activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}

}
