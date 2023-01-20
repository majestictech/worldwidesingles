import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },

  /*
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },*/
  {
    path: 'settings/:id',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'myphotos',
    loadChildren: () => import('./myphotos/myphotos.module').then( m => m.MyphotosPageModule)
  },
  {
    path: 'welcomescreen',
    loadChildren: () => import('./pages/auth/welcomescreen/welcomescreen.module').then( m => m.WelcomescreenPageModule)
  },
  {
    path: 'addmedia',
    loadChildren: () => import('./modals/addmedia/addmedia.module').then( m => m.AddmediaPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'singlechat/:id',
    loadChildren: () => import('./singlechat/singlechat.module').then( m => m.SinglechatPageModule)
  },
  {
    path: 'upgradeplans',
    loadChildren: () => import('./modals/upgradeplans/upgradeplans.module').then( m => m.UpgradeplansPageModule)
  },
  {
    path: 'editprofile/:id',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'wholikesyou',
    loadChildren: () => import('./wholikesyou/wholikesyou.module').then( m => m.WholikesyouPageModule)
  },
  {
    path: 'discoverprofile/:id',
    loadChildren: () => import('./discoverprofile/discoverprofile.module').then( m => m.DiscoverprofilePageModule)
  },
  {
    path: 'matched',
    loadChildren: () => import('./modals/matched/matched.module').then( m => m.MatchedPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./modals/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then( m => m.PersonalPageModule)
  },
  {
    path: 'rules',
    loadChildren: () => import('./rules/rules.module').then( m => m.RulesPageModule)
  },

  {
    path: 'username',
    loadChildren: () => import('./username/username.module').then( m => m.UsernamePageModule)
  },
  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'termsandcondition',
    loadChildren: () => import('./termsandcondition/termsandcondition.module').then( m => m.TermsandconditionPageModule)
  },
  {
    path: 'reportuser',
    loadChildren: () => import('./modals/reportuser/reportuser.module').then( m => m.ReportuserPageModule)
  },
  {
    path: 'share',
    loadChildren: () => import('./modals/share/share.module').then( m => m.SharePageModule)
  },
  {
    path: 'connectionlost',
    loadChildren: () => import('./connectionlost/connectionlost.module').then( m => m.ConnectionlostPageModule)
  },
  {
    path: 'phonenumber/:id',
    loadChildren: () => import('./phonenumber/phonenumber.module').then( m => m.PhonenumberPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'profiledescription',
    loadChildren: () => import('./modals/profiledescription/profiledescription.module').then( m => m.ProfiledescriptionPageModule)
  },
  {
    path: 'paypal-mobile',
    loadChildren: () => import('./paypal-mobile/paypal-mobile.module').then( m => m.PaypalMobilePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules , useHash: false})
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule {}
