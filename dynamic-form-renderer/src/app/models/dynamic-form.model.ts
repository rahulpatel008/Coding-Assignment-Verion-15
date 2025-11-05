

export interface FieldValidation {
  pattern?: string;   // regex string
  message?: string;   // validation message to show if pattern fails
}

export type FieldType = 'text' | 'textarea' | 'date' | 'dropdown' | 'multiselect' | 'checkbox';

export interface FieldSchema {
  label: string;
  name: string;
  type: FieldType;
  required?: boolean;
  validation?: FieldValidation;
  options?: string[]; // for dropdown / multiselect
  placeholder?: string;
  value?: any;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export interface FormSchema {
  title?: string;
  fields: FieldSchema[];
}
