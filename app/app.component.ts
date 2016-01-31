import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {UploadComponent} from './upload/upload.component';
import {AddFileComponent} from './upload/add-file.component';
import {EditFileComponent} from './upload/edit-file.component';
import {CategoriesComponent} from './categories.component';
import {CategoryComponent} from './category.component';
import {FileComponent} from './file.component';

@Component({
    selector: 'app',
    templateUrl: 'app/view/app.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', redirectTo: ['Categories'] },
    { path: '/upload', name: 'Upload', component: UploadComponent },
	{ path: '/upload/addFile', name: 'AddFile', component: AddFileComponent },
	{ path: '/upload/editFile', name: 'EditFile', component: EditFileComponent },
    { path: '/category', name: 'Categories', component: CategoriesComponent },
    { path: '/category/:catname', name: 'Category', component: CategoryComponent },
    { path: '/category/:catname/:fileid/:filename', name: 'File', component: FileComponent }
])

export class AppComponent { }
