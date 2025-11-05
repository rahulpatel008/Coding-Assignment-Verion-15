import { Component, OnInit } from '@angular/core';
import { SchemaService } from './services/schema.service';
import { FormSchema } from './models/dynamic-form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentSchema: FormSchema | null = null;
  lastOutput: any = null;
  loading = false;
  errorMessage = '';

  constructor(private schemaService: SchemaService) { }

  ngOnInit(): void {
    this.loadSchema('user-registration');
  }

  loadSchema(name: string) {
    this.loading = true;
    this.errorMessage = '';
    this.schemaService.getSchema(name).subscribe({
      next: (schema) => {
        this.currentSchema = schema;
        this.loading = false;
        this.lastOutput = null;
      },
      error: (err) => {
        console.error('Failed to load schema', err);
        this.errorMessage = 'Failed to load form schema.';
        this.loading = false;
      }
    });
  }

  onFormSubmit(value: any) {
    this.lastOutput = value;
    console.log('Form submitted:', value);
  }
}
