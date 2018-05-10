import { Routes } from "@angular/router";
import { FeaturesComponent } from "./features.component";


export const featureRoutes: Routes = [
    {
        path: '',
        redirectTo: 'features/categories',
        pathMatch: 'prefix'
    }, {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    }, {
        path: 'management',
        loadChildren: './management/management.module#ManagementModule'
    }, {
        path: 'features',
        component: FeaturesComponent,
        children: [
            { path: '', redirectTo: 'categories', pathMatch: 'full' },
            // { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' },
            { path: 'detail-post', loadChildren: './detail-post/detail-post.module#DetailPostModule' },
            { path: 'top-follow', loadChildren: './top-follow/top-follow.module#TopFollowModule' },
            { path: 'user-info', loadChildren: './user-info/user-info.module#UserInfoModule' },
            { path: 'create-edit-question', loadChildren: './create-edit-question/create-edit-question.module#CreateEditQuestionModule' },
        ]
    }, {
        path: '**',
        redirectTo: 'features/no-content'
    }
]
