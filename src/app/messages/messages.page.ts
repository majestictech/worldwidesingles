import { EnvService } from '../services/env.service';
import { PhotoService } from '../services/photo.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { LoadingController, IonInfiniteScroll, IonSearchbar} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import {_} from 'underscore/underscore';


import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
//import { ApiService } from '../services/api.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('searchInventory', { static: false }) searchbar: IonSearchbar;
  @ViewChild(IonContent, {static: true}) content: IonContent;

  allchats: Observable<any>;
  initialUsers=[];
  users=[];
  profileCount = 0;
  totalPages: number;
  currentPage = 1;
  searchText = '';
  searchFilter = false;
  isUserAvailable = false;
  // vars from API
  session: any;
  usersList: any;
  availableList: any;
  now: Date = new Date();

  //user: any;
  chat: string;
  unsubscribe: any;
  messages: any = [];
  chatKeys: any = [];
  usersFriends: any = [];
  //session: any;
  loader = true;

  constructor(private env: EnvService,
     private photoservice: PhotoService,
      private http: HttpClient,
      private api: ApiService,
      private router: Router
      ) {
    //this.session = localStorage.getItem('loggedIn');
	this.session = 'arvind_mit_t2';
    
  }

  ngOnInit() {
	
  }
  ionViewWillEnter()
  {
	//this.getUsersList();
  }
  
  ionViewDidEnter (){
	this.getUsersList();
  }
  getUsersList() {
    console.log('getUsersList');
    console.log(this.session);
    // will be fcm_id of user on fcm, its saved while registration
    //if(this.session=='')
    //alert('this.session='+this.session);
    // example to find user from array
    let usersFriends = [];
    let toFind = '';
	//alert(this.session);
    if(this.session === 'arvind_mit_t2'){
       usersFriends = [{
        'fcm_id':'arvind_mit_t1',
        'name': 'arvind_mit_t1'
      }
    ];
    toFind = 'arvind_mit_t1';
    }else{
      usersFriends = [{
        'fcm_id': 'arvind_mit_t2',
        'name': 'arvind_mit_t2'
      }
    ];
    toFind = 'arvind_mit_t1';
    }
	
this.usersFriends = usersFriends;
let userFind = _.findWhere(this.usersFriends, {fcm_id: toFind});
// end example //
//alert('userFind'+JSON.stringify(userFind));

//let userFindByMsg = _.find(result.data(), {lastMSG:{to: 'arvind1'}});

     this.users = [];

      this.api.db.collection('users')
      .onSnapshot((querySnapshot)=> {
        this.usersList     = [];
        this.availableList = [];
        console.log('querySnapshot');
      console.log(querySnapshot);

        querySnapshot.forEach((doc) =>{
          const userData = doc.data();
          console.log(doc);
          console.log(userData);

          this.availableList.push(userData);
		  //alert(userData.id);
          this.api.db.collection('chatRoom')
            .where('id', 'array-contains', userData.id)
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot((querySnapshot)=> {
                querySnapshot.forEach((result) => {

                /*let userFindByMsg = _.find(result.data(), {lastMSG:{to: 'arvind1'}});

                console.log('userFindByMsg');
                console.log('userFindByMsg = '+userFindByMsg);
                console.log)('result .data');
                */
               const msgResults = result.data();
				console.log(msgResults);
               //let userFindByMsg = _.find(msgResults, {to: 'arvind1'});
               console.log(JSON.stringify(msgResults) );
               // && msgResults.user.id !== 'arvind1'
               if(msgResults.to===this.session || msgResults.from===this.session ){
                 console.log('Arvind');
                 this.usersList.push({
                  user: userData,
                  lastMSG: result.data()
                });

                this.users.push({
                  user: userData,
                  lastMSG: result.data()
                });
               }

                console.log(result.data());
			   // console.log('------------------------');
				//console.log('userFindByMsg = '+result.data().lastMSG);
				console.log(this.usersList);
				console.log(this.users);
				console.log(this.availableList);


                });
            });
        });
      });
    }


  loadData(type, event)
  {
	this.totalPages =0;
	 if(type === 'firstload' || type === 'refresh')
	 {
		//this.currentPage = 1;
		this.users = [];
	 }

	this.allchats = this.photoservice.allChats(this.currentPage);
	this.allchats.subscribe(res => {

	console.log('this.allchats = '+res);
	if(type !== 'firstload'){
    	event.target.complete();
  }
		console.log('res.last_page ='+res.last_page);
		if(res.last_page){
			this.totalPages = res.last_page;
			console.log('users Original');
			console.log(this.totalPages);
		}


		for (let i = 0; i < res.length; i++) {
          this.users.push(res[i]);
        }
		this.initialUsers = this.users;


		//this.hideLoader();
	});

	}
	getItems(ev: any) {
		console.log('Get users called...');
		//this.users = [];
		this.isUserAvailable = false;
		const val = ev.target.value;
		console.log(val);
		console.log(this.users);
		if(val === '') {
			this.users = this.initialUsers;
		}

		if(this.users){
			console.log(this.users);
		}

	}

	 activeStatus(){
	this.http.post<any>(this.env.API_URL + '/getcurrenttime', {id:this.env.APP_USER_ID}).subscribe(data => {
		console.log(data);
		});
	}

  openChat(usr: any){
    this.router.navigate(['/singlechat'], { queryParams: usr, skipLocationChange: false });
  }

  chatTime(message: any) {
    return this.api.formatAMPM(message.toDate());
  }






}
