import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { Home } from './home/home';
import { Cart } from './pages/cart/cart';
import { ProductDetails } from './pages/product-details/product-details';
import { Order } from './pages/order/order';
import { Checkout } from './pages/checkout/checkout';
import { Contact } from './pages/contact/contact';
import { authGuard } from './auth.guard';
export const routes: Routes = [
   //{path: '', redirectTo: 'home', pathMatch: 'full'},
   { path: '', component: Home },
   { path: 'home', component: Home },

   { path: 'signup', component: Signup },
   { path: 'login', component: Login },
   { path: 'cart', component: Cart },
   { path: 'checkout', component: Checkout, canActivate: [authGuard] },
   { path: 'order', component: Order, canActivate: [authGuard] },

   { path: 'product/:id', component: ProductDetails },
   { path: 'contact', component: Contact },
   { path: 'order', component: Order },
   { path: '**', redirectTo: '' }
];
