import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Income } from '../_models/income';

@Injectable()
export class CoreService {

    private jsonUrl = 'assets/data.json';

    constructor(
        private http: HttpClient
    ) {
            
    }

    getData(): Observable<Income> {
        return this.http.get(this.jsonUrl);
    }

}


