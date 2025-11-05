import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldSchema, FormSchema } from '../../models/dynamic-form.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {

  @Input() schema!: FormSchema | null;


  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;
  visibleFields: FieldSchema[] = [];

  constructor(private fb: FormBuilder) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['schema']) {
      this.buildForm();
    }
  }


  private buildForm() {
    const group: { [key: string]: FormControl } = {};
    this.visibleFields = [];

    if (!this.schema || !Array.isArray(this.schema.fields)) {
      this.form = this.fb.group({});
      return;
    }

    for (const field of this.schema.fields) {

      this.visibleFields.push(field);

      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.validation?.pattern) validators.push(Validators.pattern(new RegExp(field.validation.pattern)));

      let defaultValue: any = field.value ?? '';
      if (field.type === 'checkbox') defaultValue = !!field.value;
      if (field.type === 'multiselect') defaultValue = field.value ?? [];


      const controlConfig: any = field.disabled ? { value: defaultValue, disabled: true } : defaultValue;
      const control = new FormControl(controlConfig, validators);


      if (field.readonly) { }

      group[field.name] = control;
    }

    this.form = this.fb.group(group);
  }


  getErrorMessage(field: FieldSchema): string | null {
    const control = this.form.get(field.name);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return `${field.label} is required`;
    if (control.errors['pattern']) return field.validation?.message || `${field.label} is invalid`;

    return 'Invalid value';
  }


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
