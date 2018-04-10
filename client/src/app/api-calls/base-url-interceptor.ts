import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const BASE_URL = 'http://localhost:5000';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({

      url: req.url.startsWith('http') ? req.url : `${BASE_URL}${req.url}`
    });
    return handler.handle(req).map((event: HttpEvent<any>) => {
      return event;
    })
  }

}
