import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-addmedia',
  templateUrl: './addmedia.page.html',
  styleUrls: ['./addmedia.page.scss'],
})
export class AddmediaPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

    closeModal() {  
    this.modalCtrl.dismiss(); 
	}

}
