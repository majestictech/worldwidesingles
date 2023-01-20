import { Component } from '@angular/core';
import { EnvService } from '../services/env.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	selectedTab: string;
	id = ''; 
  constructor(public env: EnvService) {}
	selectTab(checkTab) 
	{
		//alert("called");
		this.selectedTab = checkTab;
		console.log(this.selectedTab );
	}
	
	ionViewDidEnter(){ 
		this.id = this.env.APP_USER_ID; 
	}
}
