import { AbstractControl, ValidatorFn } from '@angular/forms';

export function MatchPassConfPass (c: AbstractControl):{[key: string]:boolean} | null {
    if(c.get("password").value !== c.get("confirmPassword").value){
        return{theyMatch: true}
    }
    return null;
}