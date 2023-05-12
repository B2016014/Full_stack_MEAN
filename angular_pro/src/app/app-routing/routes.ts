import { Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { MenuComponent } from '../menu/menu.component';
import { DishDetailsComponent } from '../dish-details/dish-details.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FavoritesComponent } from '../favorites/favorites.component';

export const routes: Routes = [
  
  { path: 'menu',     component: MenuComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'favorites',     component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contact',     component: ContactComponent },
  { path: 'About',     component: AboutComponent},
  { path: 'dishdetail/:id',     component: DishDetailsComponent }
];