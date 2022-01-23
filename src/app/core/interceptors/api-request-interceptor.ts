import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackBarComponent } from 'src/app/utility/components/icon-snack-bar/icon-snack-bar.component';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {

    constructor(
        private matSnackBar: MatSnackBar,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = this.addKeyAndHost(request);

        let req: HttpRequest<any> = request;
        if (!request.headers) {
            req = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    const errorMessage = error.error.message ? error.error.message : error.error.messages ? error.error.messages?.[0] : error.error;
                    this.openCustomSnackBar(errorMessage, 'danger')
                    return next.handle(request.clone());
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private addKeyAndHost(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                'x-rapidapi-host': `wordsapiv1.p.rapidapi.com`,
                'x-rapidapi-key': environment.rapidAPIKey
            }
        });
    }

    private openCustomSnackBar(message: string, icon: string): void {
        this.matSnackBar.openFromComponent(IconSnackBarComponent, {
            data: {
                message: message,
                icon: icon,
            }
        });
    }
}
