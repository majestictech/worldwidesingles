import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-paypal-mobile',
  templateUrl: 'paypal-mobile.page.html',
  styleUrls: ['paypal-mobile.page.scss'],
})
export class PaypalMobilePage {
  paymentAmount= '0.01';
  currency = 'USD';
  currencyIcon = '$';

  constructor(private payPal: PayPal) { }


  payWithPaypal() {
    alert('payWithPaypal clicked');
    this.payPal.init({
      PayPalEnvironmentProduction: 'EHjTImqkB2h8TCn4hhO58LzUIMchR5uL4Ib6JYh07lnNI3k7-JxnFr67SIiHLFeYZKvN53YG4YRwfAvd',
      PayPalEnvironmentSandbox: 'AZw5ekuT2DAij4iOPxrSBUMfhzvEFK8GK-tNNEffjeCjQONtG0eGOPK6VyOheGh1878OOtWflLEn7c-R'
      //PayPalEnvironmentSandbox: 'AWh7zmR6hDiOLgnXcPfjQmlCm8HJh_qEd5ucZvFaEEHmEOLtF4oJG374Kgf1WQNoz_Xuim_tRDr0Pwi1'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        alert('this.paymentAmount = '+this.paymentAmount);
        alert('this.currency = '+this.currency);

        const payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          //alert(JSON.stringify(res, null, 1));
          console.log(res);
          alert('Payment success full');
          // Successfully paid
        }, (msg) => {
          alert(msg);
          alert('dialog closed without being successful');
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
        alert('Error in configuration');
      });
    }, () => {
      alert('Error in initialization');
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}
