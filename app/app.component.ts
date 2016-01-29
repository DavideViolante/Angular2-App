import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from './home.component';
import {CategoriesComponent} from './categories.component';
import {CategoryComponent} from './category.component';
import {FileComponent} from './file.component';

@Component({
    selector: 'app',
    templateUrl: 'app/view/app.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/category', name: 'Categories', component: CategoriesComponent },
    { path: '/category/:catname', name: 'Category', component: CategoryComponent },
    { path: '/category/:catname/:fileid/:filename', name: 'File', component: FileComponent }
])

export class AppComponent { }
