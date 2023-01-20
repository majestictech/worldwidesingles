import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams ,ToastController  } from '@ionic/angular';
import { EnvService } from '../../services/env.service';
import { Observable } from 'rxjs';
import { PhotoService } from '../../services/photo.service';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-profiledescription',
  templateUrl: './profiledescription.page.html',
  styleUrls: ['./profiledescription.page.scss'],
})
export class ProfiledescriptionPage implements OnInit {
	
	profiledata: Observable<any>;
	user = [];
	id:string='';
	ifMatch: boolean = false;
	public profileId = this.navParams.get('profileId');
  constructor(private navParams: NavParams, public modalCtrl: ModalController, public toastController: ToastController, private photoService: PhotoService, private env: EnvService,private photoservice: PhotoService,private router: Router,private route: ActivatedRoute, private http: HttpClient) {
		this.profiledata = this.photoservice.profileData(this.profileId);
		this.profiledata.subscribe(res => {
			console.log(res);		
			this.user = res['results'];
			this.ifMatch = res['matched'];
			console.log(this.ifMatch);
		});

	  }

  ngOnInit() {
  }
  
  


}
