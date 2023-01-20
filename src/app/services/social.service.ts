import { Injectable } from '@angular/core';
import { ToastController, Platform} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

   constructor(private socialSharing: SocialSharing,
                    private platform: Platform,
                    private toastCtrl: ToastController) {
      }

      share(packageName: string,
            appName: string,
            social: string,
            message: string,
            subject: string,
            image: string,
            url:string) {
          this.platform.ready().then(() => {
            if (social === "facebook") {
              this.socialSharing
                .canShareVia(
                  packageName,
                  message,
                  subject,
                  image,
                  url
                )
                .then(() => {
					//alert('From service');
					//alert('message= '+message);
					//alert('image= '+image);
					//alert('url= '+url);
                  this.socialSharing
                    .shareViaFacebook(message, image, url)
                    .catch(err => {
                      this.showSuccesToast(
                        "There was a problem please try later"
                      );
                    });
                })
                .catch(err => {
                  this.showFailToast(appName);
                });
            } else if (social === "whatsapp") {
              this.socialSharing
                .canShareVia(
                  packageName,
                  message,
                  subject,
                  image,
                  url
                )
                .then(() => {
                  this.socialSharing
                    .shareViaWhatsApp(message, image, url)
                    .catch(err => {
                      this.showSuccesToast(
                        "There was a problem please try later"
                      );
                    });
                })
                .catch(err => {
                  this.showFailToast(appName);
                });
            } else if (social === "instagram") {
              this.socialSharing
                .canShareVia(
                  packageName,
                  message,
                  subject,
                  image,
                  url
                )
                .then(() => {
                  this.socialSharing
                    .shareViaInstagram(message, image)
                    .catch(err => {
                      this.showSuccesToast(
                        "There was a problem please try later"
                      );
                    });
                })
                .catch(err => {
                  this.showFailToast(appName);
                });
            } else if (social === "twitter") {
              this.socialSharing
                .canShareVia(
                  packageName,
                  message,
                  subject,
                  image,
                  url
                )
                .then(() => {
                  this.socialSharing
                    .shareViaTwitter(message, image, url)
                    .catch(err => {
                      this.showSuccesToast(
                        "There was a problem please try later"
                      );
                    });
                })
                .catch(err => {
                  this.showFailToast(appName);
                });
            } else {
              this.socialSharing
                .share(message, subject, image, url)
                .catch(err => {
                  this.showSuccesToast("There was a problem please try later");
                });
            }
          });
        }

        async showSuccesToast(message: string) {
          const toast = await this.toastCtrl.create({
            message: message,
            duration: 5000,
            position: 'bottom'
            //showCloseButton: true
          });
          toast.present();
        }

        async showFailToast(appName: string) {
          const toast = await this.toastCtrl.create({
            message: `${appName} is not installed on your device`,
            duration: 5000,
            position: 'top'
          });
           toast.present();
        }

}