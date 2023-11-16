import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,

    url_api: 'http://localhost:8080/sgai',
    url_front: 'http//localhost:4200',

    httpOptions: {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      'X-Content-Type-Options' :  'nosniff',
      'Content-Security-Policy' : 'frame-src https://* ; img-src *' }) 
    }
};