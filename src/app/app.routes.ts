import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { PasswordResetComponent } from './pages/authentication/password-reset/password-reset.component';
import { ChangePasswordComponent } from './pages/authentication/change-password/change-password.component';
import { NotFoundComponent } from './pages/authentication/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/authentication/unauthorized/unauthorized.component';
import { authGuard } from './core/guards/auth.guard';
import { MainComponent } from './pages/main/main.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { AccountComponent } from './pages/account/account.component';
import { PricingOverviewComponent } from './pages/pricing-overview/pricing-overview.component';
import { SubscriptionSuccessComponent } from './pages/subscription-success/subscription-success.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileLockComponent } from './pages/profile-lock/profile-lock.component';
import { profileLockGuard } from './core/guards/profile-lock.guard';
import { EmailVerificationComponent } from './pages/authentication/email-verification/email-verification.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'app/home', pathMatch: 'full' },
    {
        path: 'auth',
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
            { path: 'password-reset', component: PasswordResetComponent },
            { path: 'update-password', component: ChangePasswordComponent },
        ],
    },
    {
        path: 'verify-email',
        component: EmailVerificationComponent,
    },
    { 
        path: 'app', 
        component: MainComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [authGuard, profileLockGuard]
            },
            {
                path: 'user/:id/account',
                component: AccountComponent, 
                canActivate: [authGuard, profileLockGuard]
            },
            {
                path: 'pricing',
                component: PricingComponent,
                canActivate: [authGuard, profileLockGuard]
            },
            {
                path: 'pricing/:id/overview',
                component: PricingOverviewComponent,
                canActivate: [authGuard, profileLockGuard]
            },
            {
                path: 'subscription/success',
                component: SubscriptionSuccessComponent,
                canActivate: [authGuard, profileLockGuard]
            },
            {
                path: 'profile-lock',
                component: ProfileLockComponent,
                canActivate: [authGuard]
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        component: UserListComponent,
                        canActivate: [authGuard, profileLockGuard]
                    },
                    {
                        path: 'edit/:id',
                        component: UserEditComponent,
                        canActivate: [authGuard, profileLockGuard]
                    },
                    {
                        path: 'add',
                        component: UserEditComponent,
                        canActivate: [authGuard, profileLockGuard]
                    }
                ]
            }
        ],
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '401', component: UnauthorizedComponent },
    { path: '**', redirectTo: 'not-found' }
];
