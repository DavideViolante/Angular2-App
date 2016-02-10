import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {HomeComponent} from './home.component';
import {LoginComponent} from './account/login.component';
import {LogoutComponent} from './account/logout.component';
import {RegisterComponent} from './account/register.component';
import {UploadComponent} from './upload/upload.component';
import {CategoriesComponent} from './categories.component';
import {CategoryComponent} from './category.component';
import {FileComponent} from './file.component';

import {AuthenticationComponent} from './account/authentication.component';

@Component({
    selector: 'app',
    templateUrl: 'app/template/home.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/account/login', name: 'Login', component: LoginComponent },
    { path: '/account/logout', name: 'Logout', component: LogoutComponent },
    { path: '/account/register', name: 'Register', component: RegisterComponent },
    { path: '/upload/...', name: 'Upload', component: UploadComponent },
    { path: '/category', name: 'Categories', component: CategoriesComponent },
    { path: '/category/:catname', name: 'Category', component: CategoryComponent },
    { path: '/category/:catname/:fileid/:filename', name: 'File', component: FileComponent },
])

export class AppComponent {

    constructor(private auth: AuthenticationComponent) { }

}
/*    private isLoggedIn = false;
    private isAdmin = false;

    constructor(private service: MongoAPIService) {
        this.checkUser();
     }

    checkUser() {
        this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(
            data => {
                if (data.length > 0) {
                    (data[0].session === localStorage.getItem("session")) ? this.isLoggedIn = true : this.isLoggedIn = false;
                    (data[0].role === "admin") ? this.isAdmin = true : this.isAdmin = false;
                } else {
                    this.isLoggedIn = false;
                    this.isAdmin = false;
                }
            }
        );
    }*/


