import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AddmediaPage } from '../modals/addmedia/addmedia.page';
import { ModalController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { EnvService } from '../services/env.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { SortablejsModule } from 'ngx-sortablejs';

import { Router } from '@angular/router';


@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.page.html',
  styleUrls: ['./myphotos.page.scss'],
})
export class MyphotosPage implements OnInit {
	@ViewChild('userImage') userImageViewChild: ElementRef;
	
	dataReturned: any;
	image: string = '';
	imageData;
	id:string='';
	user = [];
	profiledata: Observable<any>;
	//photos_res: [] ;
	photoCount: number = 0;
	photos_res: Observable<any>;
	photos = [];
	blankPhotos = [];
	totalPhotos : number = 9;
	noPhotos :number = 0;
	
	photodata: Observable<any>;
	photo_res = [];
	photo_id = [];
	
    SERVER_URL = this.env.API_URL;
	fileToUpload: any;
	userId = null;
	avatarURL;
	processing:boolean;
    uploadImage: string;
    serverimage = 'https://majestictechnosoft.com/worldwide/api.php';
	animals : any;
	
  constructor(private httpClient: HttpClient, private file: File, private filePath: FilePath, public modalController: ModalController,public alertController: AlertController ,private photoService: PhotoService,private camera: Camera, private actionSheetController: ActionSheetController, private toastController: ToastController, private env: EnvService,private http: HttpClient,private router: Router) 
  {
	this.animals =
    [
        "1. Aardvark",
        "2. Albatross",
        "3. Alligator",
        "4. Alpaca",
        "5. Ant",
        "6. Donkey",
        "7. Baboon",
        "8. Badger",
        "9. Bat",
        "10. Bear",
        "11. Bee",
        "12. Butterfly",
        "13. Camel",
        "14. Chicken",
        "15. Cockroach",
        "16. Horse",
    ];
	 
  }
  
   
	/*this.animals = ['Bread',
            'Milk',
            'Cheese',
            'Snacks',
            'Apples',
            'Bananas',
            'Peanut Butter',
            'Chocolate',
            'Avocada',
            'Vegemite',
            'Muffins',
            'Paper towels'
        ];
  
  */
	
  ngOnInit() { }
  
  selectImage(userImage) 
  {
	userImage.click();
  }
    
   
  ionViewWillEnter()
  {
	this.loadData();
	this.activeStatus();
  }
  
  reorderItems(event)
  {
    console.log(event);
    console.log('Moving item from ${event.detail.from} to ${event.detail.to}');
    const itemMove = this.animals.splice(event.detail.from, 1)[0];
    console.log(itemMove);
    this.animals.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  }
  
  
  async open_addMedia() {
    const modal = await this.modalController.create({
      component: AddmediaPage,
	  cssClass: 'addmedia-modal',
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
 
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }	



  loadData() 
  {
	this.blankPhotos = [];
	this.photodata = this.photoService.imageData(this.env.APP_USER_ID);
	this.photodata.subscribe(res => this.photo_res = res);
	this.photodata.subscribe(res => {
		console.log(res);
		//this.id=res['res']['id'];
		//alert(this.id);
		this.photoCount = res.length;
		this.photos = res
		this.noPhotos =  this.totalPhotos - this.photoCount;
		console.log(this.noPhotos);		
	
		for(let count=0; count<this.noPhotos; count++) {
			this.blankPhotos.push(count);
		}
	});
  }
  
  
  
	

   attachFile(e){
    if (e.target.files.length == 0) {
      console.log("No file selected!");
      return
    }
	
    let file: File = e.target.files[0];
    this.fileToUpload = file;
	
	console.log(this.fileToUpload);
	console.log(this.fileToUpload.name);
	
	let formData = new FormData(); 
    
	formData.append('file', this.fileToUpload, this.fileToUpload.name); 
    formData.append('id', this.env.APP_USER_ID); 
	
	console.log(formData);
    
	this.httpClient.post(this.serverimage, formData).subscribe((res) => {
	
		console.log(res);
		if(res['status'] == 'true')
		{
			this.httpClient.post(this.SERVER_URL + '/storeimagedata', formData).subscribe((res) => {
				this.loadData();
				
				this.avatarURL = res['avatarURL'];
			});
		}
		else
		{
			this.presentToast(res['message']);
		}
    });
    
	return false;
   }
  
    showConfirm(photo) {
    this.alertController.create({
      header: 'Confirm Alert',
      subHeader: '',
      message: 'Are you sure you want to delete the image?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
			this.removePhoto(photo);
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Let me think');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  
 
  removePhoto(photo)
  {
    //alert(photo);
	this.http.post<any>(this.env.API_URL + '/deleteimagedata', {id:photo}).subscribe(data => {
		
		this.presentToast("Image deleted successfully");
		//this.blankPhotos = [];
		//this.photos = [];
		this.loadData();
	});	
	
  }
  
		activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}
  

}
