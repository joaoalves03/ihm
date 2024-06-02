import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {NavbarPage} from "./pages/navbar/navbar.page"
import {AuthGuard} from "./guards/auth.guard"

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'register-complete',
    loadChildren: () => import('./pages/register-complete/register-complete.module').then( m => m.RegisterCompletePageModule)
  },
  {
    path: '',
    component: NavbarPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'favorites',
        loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
    ]
  },
  {
    path: 'restaurant-details/:id',
    loadChildren: () => import('./pages/restaurant-details/restaurant-details.module').then( m => m.RestaurantDetailsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'navbar',
    loadChildren: () => import('./pages/navbar/navbar.module').then( m => m.NavbarPageModule)
  },
  {
    path: 'reviews/:id',
    loadChildren: () => import('./pages/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'userreview',
    loadChildren: () => import('./pages/userreview/userreview.module').then( m => m.UserreviewPageModule)
  },
  {
    path: 'restaurant-location',
    loadChildren: () => import('./pages/restaurant-location/restaurant-location.module').then( m => m.RestaurantLocationPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
