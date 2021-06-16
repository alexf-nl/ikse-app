import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}                                                                                                                                                                                                                                              
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean | Observable<boolean> | Promise<boolean> {
        const isAdmin = this.authService.getAdmin();
        console.log(isAdmin);
        if(isAdmin) {
            this.router.navigate(['/products'])
        }
        return isAdmin;
    }
    
}