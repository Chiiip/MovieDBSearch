import { FormControl } from '../../node_modules/@angular/forms';

export function WhitespaceValidator(control: FormControl) {
    const isValid = control.value !== null && control.value !== undefined && control.value.replace(/\s/g, '').length > 0;
    return isValid ? null : {'whitespace': true};
}
