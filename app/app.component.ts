import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from './home.component';
import {LoginComponent} from './account/login.component';
import {LogoutComponent} from './account/logout.component';
import {RegisterComponent} from './account/register.component';
import {ProfileComponent} from './account/profile.component';
import {UploadComponent} from './upload/upload.component';
import {UserComponent} from './user.component';
import {CategoriesComponent} from './categories.component';
import {CategoryComponent} from './category.component';
import {FileComponent} from './file.component';

import {AuthenticationComponent} from './account/authentication.component';
import {MongoAPIService} from './service/mongoapi.service';

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/account', name: 'Profile', component: ProfileComponent },
    { path: '/account/login', name: 'Login', component: LoginComponent },
    { path: '/account/logout', name: 'Logout', component: LogoutComponent },
    { path: '/account/register', name: 'Register', component: RegisterComponent },
    { path: '/upload/...', name: 'Upload', component: UploadComponent },
    { path: '/user/:username', name: 'User', component: UserComponent },
    { path: '/category', name: 'Categories', component: CategoriesComponent },
    { path: '/category/:catname', name: 'Category', component: CategoryComponent },
    { path: '/category/:catname/:fileid/:filename', name: 'File', component: FileComponent },
])

export class AppComponent {

    private appReady = false;
    private refresh = false;
    private msgRefresh= "Refresh";
    private query = "";

    constructor(private auth: AuthenticationComponent,
                private router: Router,
                private db: MongoAPIService) {
        
        // Load the app when all necessary files from DB are loaded
        var interval = setInterval(() => {
            if(this.db.files.length > 0 && this.db.users.length > 0 && this.db.cats.length > 0) {
                this.appReady = true;
                clearInterval(interval);
                clearTimeout(timeout);
            }
        },500);

        // if the app is taking way too long to load
        var timeout = setTimeout(() => {
            this.refresh = true;
        },10000);
    }

    onSubmit(query) {
        this.router.navigate(["Home", { s: query }]);
    }

}