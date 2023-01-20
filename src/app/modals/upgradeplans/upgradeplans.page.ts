import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams ,ToastController  } from '@ionic/angular';

@Component({
  selector: 'app-upgradeplans',
  templateUrl: './upgradeplans.page.html',
  styleUrls: ['./upgradeplans.page.scss'],
})
export class UpgradeplansPage implements OnInit {
	
	previousTab: string = 'plantwo';
    selectedTab: string = 'plantwo';
	viewEntered = false;


  constructor(public modalCtrl: ModalController, public toastController: ToastController) { }
  
  
	async presentToast(message) {
	  const toast = await this.toastController.create({
		message: message,
		duration: 2000,
		position: 'top'
	  });
	  toast.present();
	}

  ngOnInit() {

  }
  
  ionViewWillEnter() {
    this.viewEntered = true;
}
  
	slideOptsOne = {
	 initialSlide: 0,
	 slidesPerView: 1,
	 autoplay:true
	};
  
  
      closeModal() {  
    this.modalCtrl.dismiss(); 
	}
	
	 completeModal() {  
    this.modalCtrl.dismiss(); 
	this.presentToast("Purchase Successful");
	}
	

  switchTab(tabValue) {
	console.log('selectedTab:: ' + this.selectedTab + ' previousTab:: ' + this.previousTab)
	this.previousTab = this.selectedTab;
	console.log('selectedTab:: ' + this.selectedTab + ' previousTab:: ' + this.previousTab)
	this.selectedTab = tabValue;
	console.log(this.selectedTab);
  }


}
