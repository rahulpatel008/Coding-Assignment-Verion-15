import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FieldSchema, FormSchema } from './dynamic-form.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
  @Input() schema!: FormSchema;
  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;
  visibleFields: FieldSchema[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['schema']) {
      this.buildForm();
    }
  }

  private buildForm() {
    const group: { [key: string]: any } = {};
    this.visibleFields = [];

    for (const field of this.schema.fields) {
      this.visibleFields.push(field);

      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.validation?.pattern) {
        validators.push(Validators.pattern(new RegExp(field.validation.pattern)));
      }

      // default value for checkbox is false, for multiselect []
      let defaultValue: any = null;
      if (field.type === 'checkbox') defaultValue = false;
      if (field.type === 'multiselect') defaultValue = [];

      const control = new FormControl({ value: defaultValue, disabled: !!field.disabled }, validators);
      if (field.readonly) control.disable();

      group[field.name] = control;
    }

    this.form = this.fb.group(group);
  }

  getErrorMessage(field: FieldSchema) {
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

    const value = this.form.getRawValue();
    this.submitted.emit(value);
  }

  // convenience for template
  asArray(o: any) {
    return Array.isArray(o) ? o : [];
  }
}
