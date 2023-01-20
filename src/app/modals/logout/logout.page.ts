import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public modalCtrl: ModalController, private api: ApiService, private router: Router) { }

  ngOnInit() {
  }
  
	closeModal(type) {
		this.modalCtrl.dismiss();
		
		if(type == 'logout') {
			this.api.signOut();
			this.router.navigate(['/login']);
		}
	}
}