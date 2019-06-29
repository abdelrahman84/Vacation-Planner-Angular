import {Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'

@Pipe({
    name: 'dateFormatPipe'
  })
export class formatDate implements PipeTransform {
  transform(value) {
   let d = JSON.parse(value);
   return moment(d).format('LL');
}
}
 