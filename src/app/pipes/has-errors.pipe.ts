import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Pipe({  name: 'hasErrors'})
export class HasErrorsPipe implements PipeTransform {

  transform(errors:( ValidationErrors | null), controlName:string): any {
    if(!errors){
      return false;
    }
    return !!Object.keys(errors as []).length ;
  }

}
