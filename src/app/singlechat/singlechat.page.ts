import { Component, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../services/env.service';
import { PhotoService } from '../services/photo.service';
import { Observable } from 'rxjs';
import { LoadingController, IonInfiniteScroll, IonSearchbar} from '@ionic/angular';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { IonContent } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-singlechat',
  templateUrl: './singlechat.page.html',
  styleUrls: ['./singlechat.page.scss'],
})

export class SinglechatPage implements OnInit {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('inputId', {
    static: false
 }) ionInput: {
    setFocus: () => void;
 };
 @ViewChild('content') content: any;
  users=[];
	chatday= '';
	chatdayDisplay= true;
	currentFocus = '';
	ionicForm: FormGroup;
	id= '';
	authForm: FormGroup;
	message = '';
	userId ='';
	senderId: any;
	receiverId: any;
	display_name = '';
	image = '';
	lastMessage = '';
	showmessages: any;
	//user = [];
	totalPages: number;
	currentPage = 1;
	chatCount = 0;
	profiledata: Observable<any>;

	//
	//@ViewChild(IonContent, {static: true}) content: IonContent;
	user: any;
	chat: string;
	unsubscribe: any;
	messages = [];
	chatKeys = [];
	session: any;
	loader = true;
	private lastScrollTop= 0;
	private direction= '';
	chatDate : any;

  constructor(public formBuilder: FormBuilder,private router: Router,private env: EnvService, private photoservice: PhotoService,
	private http: HttpClient,private route: ActivatedRoute,private api: ApiService) {


	this.id = this.route.snapshot.paramMap.get('id');
     this.user = {id:this.id};
	this.profiledata = this.photoservice.profileData(this.id);
	this.profiledata.subscribe(res => {
	console.log('---- profiledata--');
	console.log(res);
	console.log('---- profiledata ends--');
		});
		/*this.showmessages = this.photoservice.showMessages(this.id);
		this.showmessages.subscribe(res => {
		console.log(res)
		this.message = res.message;
		this.image = res.image;
		this.display_name = res.age;
	}
	);*/

	//this.loadData('firstload','');
  this.route.queryParamMap.subscribe(snap => {
    //this.user = snap['params'];
    this.getChat();
  });
  //this.session = localStorage.getItem('loggedIn');
  this.session = 'arvind_mit_t2';
	  }

	setFocusOnInput() {
	   this.ionInput.setFocus();
	}





  ngOnInit() {

  }

    loadData(type, event)
	{

		if(type === 'firstload' || type === 'refresh')
		{
			this.currentPage = 1;
			this.users = [];
		}

		this.showmessages = this.photoservice.showMessages(this.id,this.currentPage);
		console.log(this.showmessages);
		this.showmessages.subscribe(res => {
			console.log(res);
			if(type !== 'firstload'){
        event.target.complete();
      }
			this.totalPages = res.last_page;

			//console.log(res);
			//console.log(this.id);
			//this.users = res;
			console.log('users Original');
			console.log(this.totalPages);


			for (let i = 0; i < res['data'].length; i++){
			  this.users.unshift(res['data'][i]);
      }

      /*
			if (this.currentPage === this.totalPages) {
				//event.target.disabled = true;
				this.infiniteScroll.disabled = true;
			}
			else {
				this.infiniteScroll.disabled = false;
			}
    */
			this.currentPage++;
			console.log(this.currentPage);
		});
	}

	ionViewWillEnter(){

	this.activeStatus();

	}



	majStoreChat(form: NgForm){
		this.http.post<any>(this.env.API_URL + '/storechat', {message:form.value.message, senderId:this.env.APP_USER_ID, receiverId:this.id}).subscribe(data => {
			console.log(data);
			this.router.navigate(['/singlechat/',this.id]);
			this.loadData('firstload',"");
			this.message = '';
			});

	}



  setChatDay(date) {
	if(this.chatday != date) {
		this.chatday = date;
		this.chatdayDisplay = true;
	}
	else {
		this.chatdayDisplay = false;
	}
  }


   	activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}
	sendChat() {
	//	this.chat ? console.log(this.chat) : '';
	//alert('this.user.id='+this.user.id+'this.session='+this.session)

		if(this.chat){
		  this.api.sendMsg(this.user.id, this.user.id, this.session, this.chat);
		}

		this.chat = '';

		this.content.scrollToBottom();
	  }

	  getChat() {
		// retrieve as receiver message
    //alert('this.session='+this.session);
		this.api.db.collection("chatRoom")
		  .where('id', 'array-contains',this.session)
		  .onSnapshot((querySnapshot)=> {
			this.loader = false;
			querySnapshot.forEach((doc)=> {
				// doc.data() is never undefined for query doc snapshots
				let data = doc.data();
				console.log(data);
				//this.messages.push(data);
				console.log(this.user.id);
				if ((data.from == this.user.id && data.to == this.session) ||
					(data.from == this.session && data.to == this.user.id)) {
				  /*if(this.chatKeys.indexOf(data.key) < 0){
					this.messages.push(data);
					this.chatKeys.push(data.key);
				  };*/
				  this.messages.push(data);
				};
			});
			console.log(this.messages);
			this.messages.sort(this.sortDate);
		  });
		  console.log(this.messages);
	  }
	sortDate(a, b) {
		let dateA = new Date();
		let dateB = new Date();
		if(a){
		dateA = new Date(a.timestamp.toDate());
		}
		if(b){
			dateB = new Date(b.timestamp.toDate());
		}

		return dateA > dateB ? 1 : -1;
	};
	formatDate(message: any) {
		let date = message['timestamp'] ? message['timestamp'].toDate() : new Date();
		return this.api.formatAMPM(date);
	}
	formatDay(message: any){
		//let date = message['timestamp']
		this.chatDate = new Date(message['timestamp'].seconds*1000);
		console.log(this.chatDate);
	}
	

}
