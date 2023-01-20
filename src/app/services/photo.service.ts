import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../services/env.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  constructor(private http: HttpClient, private env: EnvService) { }

  profileData(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/viewdiscoverprofile/' + id+'?userId=' +this.env.APP_USER_ID).pipe(
	  map(results => results)
	  );
  }

    discoverProfile(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/discoverprofile/' + id).pipe(
	  map(results => results['results'])
	);
  }

    getActiveStatus(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/getactivestatus/' + id).pipe(
	  map(results => results['user'])
	);
  }



      showMatched(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/matched/' + id).pipe(
	  map(results => results['results'])
	);
  }

      showLikes(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/showlikes/' + id).pipe(
	  map(results => results['results'])
	);
  }

    reloadProfile(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/reloadprofile/' + id).pipe(
	  map(results => results['results'])
	);
  }


    allChats(page): Observable<any> {
      console.log('allChats = '+this.env.API_URL+'/allchats/'+this.env.APP_USER_ID+'?page='+page);
	return this.http.get(this.env.API_URL+'/allchats/'+this.env.APP_USER_ID+'?page='+page).pipe(
	  map(results => results['results'])
	);
  }

  showMessages(messageId,page): Observable<any> {
	return this.http.get(this.env.API_URL+'/showmessages/'+this.env.APP_USER_ID+'?messageId=' + messageId + '&page='+page).pipe(
	  map(results => results['results'])
	);
  }


      displayProfile(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/displayprofile/' + id).pipe(
	  map(results => results['results'])
	);
  }

	  showProfile(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/showprofile/' + id).pipe(
	  map(results => results['results'])
	);
  }

  imageData(id): Observable<any> {
	return this.http.get(this.env.API_URL+'/imagedata/'  + id).pipe(
	  map(results => results['results'])
	);
  }

}
