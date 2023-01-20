import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
	  {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },

	  {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
	  
	  {
        path: 'messages',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule)
      },

	  {
        path: 'wholikesyou',
        loadChildren: () => import('../wholikesyou/wholikesyou.module').then(m => m.WholikesyouPageModule)
      },

	  {
        path: 'discoverprofile',
        loadChildren: () => import('../discoverprofile/discoverprofile.module').then(m => m.DiscoverprofilePageModule)
      },
	  
	  {
        path: 'myphotos',
        loadChildren: () => import('../myphotos/myphotos.module').then(m => m.MyphotosPageModule)
      },
      {
        path: '',
        redirectTo: '/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
