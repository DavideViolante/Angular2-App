import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {HomeComponent} from './home.component';
import {LoginComponent} from './account/login.component';
import {LogoutComponent} from './account/logout.component';
import {RegisterComponent} from './account/register.component';
import {UploadComponent} from './upload/upload.component';
import {AddUserComponent} from './upload/add-user.component';
import {AddFileComponent} from './upload/add-file.component';
import {CategoriesComponent} from './categories.component';
import {CategoryComponent} from './category.component';
import {FileComponent} from './file.component';

@Component({
    selector: 'app',
    templateUrl: 'app/template/app.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/account/login', name: 'Login', component: LoginComponent },
    { path: '/account/logout', name: 'Logout', component: LogoutComponent },
    { path: '/account/register', name: 'Register', component: RegisterComponent },
    { path: '/upload', name: 'Upload', component: UploadComponent },
	{ path: '/upload/addFile', name: 'AddFile', component: AddFileComponent },
	{ path: '/upload/addUser', name: 'AddUser', component: AddUserComponent },
    { path: '/category', name: 'Categories', component: CategoriesComponent },
    { path: '/category/:catname', name: 'Category', component: CategoryComponent },
    { path: '/category/:catname/:fileid/:filename', name: 'File', component: FileComponent }
])

export class AppComponent {

/*    private loggedIn = false;
    private admin = false;

    constructor(private service: MongoAPIService) {

        this.isLoggedIn();
        this.isAdmin();
 
    }

    isLoggedIn() {
        if ((localStorage.getItem("id") && localStorage.getItem("session")) !== null)
            this.loggedIn = true;
        else this.loggedIn = false;
        console.log(this.loggedIn);
    }

    isAdmin() {
        if (this.isLoggedIn()) {
            this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(
                data => data[0].role === "admin" ? this.setAdmin(true) : this.setAdmin(false)
            );
            console.log(this.admin);
        } else
            this.admin = false;
    }

    setAdmin(admin) {
        this.admin = admin;
    }
    setLoggedIn(loggedIn) {
        this.loggedIn = loggedIn;
    }*/

}
