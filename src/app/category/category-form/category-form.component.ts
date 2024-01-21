import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit{
  
  formGroup = new FormGroup({
    uuid: new FormControl<string | null>(null),
    name: new FormControl<string>('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]),
    description: new FormControl<string>('', [Validators.required, Validators.maxLength(2000), Validators.minLength(3)])
  });

  get nameErrors(): ValidationErrors | null {
    return this.formGroup.controls.name.errors;
  }

  get descriptioErrors(): ValidationErrors | null {
    return this.formGroup.controls.description.errors;
  }

  constructor(private categoryServicio: CategoryService ){}
  ngOnInit(): void {
  }

  save() {
    if (!this.formGroup.valid) {
      this.formGroup.updateValueAndValidity();
      return;
    }
    
    const categoryFormValue = this.formGroup.value;
    this.categoryServicio.save(categoryFormValue as Category)
        .subscribe((category)=>{
          console.log(category);
          this.categoryServicio.saveCategory.emit(category);
        })
  }


}
