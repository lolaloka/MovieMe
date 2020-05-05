import { FormControl, ValidationErrors } from '@angular/forms';

export const isLink = (fc: FormControl): ValidationErrors | null => {
    const value = fc.value as string;
    if (value == '') return null;

    if (!value.includes('http'))
      return { isNotLink: true }
    return null;
  }
