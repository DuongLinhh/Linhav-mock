import {Injectable} from '@angular/core';
import { Income } from '../_models/income';
import { CoreService } from '../_helper/core.service';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

    incomeList?: Income[];

    constructor(
        private coreSevice: CoreService
    ) {}

    getAllData(): Observable<Income>  {
       return this.coreSevice.getData();
    }

}


