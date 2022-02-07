import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { HomeComponent } from "./home/home.component";
import { RegisterEmployeeComponent } from "./register-employee/register-employee.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    {
        path: '', component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'registerEmployee', component: RegisterEmployeeComponent },
            { path: 'employeeList', component: EmployeeListComponent },
            // { path: 'employee-details/:id', component: EmployeeDetailsComponent },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }