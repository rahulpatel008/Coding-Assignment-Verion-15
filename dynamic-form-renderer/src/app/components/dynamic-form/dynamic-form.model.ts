export interface FieldValidation {
  pattern?: string;
  message?: string;
}

export interface FieldSchema {
  label: string;
  name: string;
  type: 'text' | 'textarea' | 'date' | 'dropdown' | 'multiselect' | 'checkbox';
  required?: boolean;
  validation?: FieldValidation;
  options?: string[];
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export interface FormSchema {
  title?: string;
  fields: FieldSchema[];
}