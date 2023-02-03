import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function customValidator(prevValue: String, inputName : String, templateId? : Number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currValue = control.value.toString();
    if(templateId !== 1 && inputName === "reward type")
      return null;
    if(inputName === "reward amount"){
      if(templateId ===1)
      {
        if(Number(currValue) === 0){
            return { isInvalid: true, message: `${inputName} should be greater than 0` };
        }
        if(Number(currValue) % 100){
            return { isInvalid: true, message: `${inputName} should be multiple of 100` };
        }
      }
      return null;
    }
    if (currValue != null && currValue == '') {
        return { isInvalid: true, message: `${inputName} is reuired` };
    }
    if (currValue.toLowerCase() === prevValue.toLowerCase()) {
      return { isInvalid: true, message: `Please edit ${inputName} field` };
    }
    return null;
  };
}
