import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountService } from "@app/services/account.service";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private accountService:AccountService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = req.url.startsWith(environment.apiUrl);

        if(isLoggedIn && isApiUrl) {
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${user.token}`
                }
            })
        }

        return next.handle(req)
    }

}