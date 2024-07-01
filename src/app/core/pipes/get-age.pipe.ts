import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAge',
  standalone: true,
})
export class GetAgePipe implements PipeTransform {
  public transform(date: string): number {
    return this.getAge(new Date(date));
  }

  public getAge(birthDate: Date) {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();

    // Handle cases where the birth month hasn't passed yet in the current year
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }

    return years;
  }
}
