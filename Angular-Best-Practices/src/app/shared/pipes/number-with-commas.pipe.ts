import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithCommas'
})
export class NumberWithCommasPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null || value == undefined) {
      return 0;
    }

    var result = this.numberWithCommas(value);
    return result;
  }

  numberWithCommas(value: any) {
    var splitString = value.toString().split(".");
    var numWithCommas = String(splitString[0]).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var result = splitString[1] ? numWithCommas + "." + splitString[1] : numWithCommas;
    return result.toString();
  }

}
