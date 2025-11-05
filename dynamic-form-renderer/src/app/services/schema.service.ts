import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormSchema } from '../models/dynamic-form.model';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  // private basePath = 'assets/schemas/user-registration.json';
  private basePath = 'assets/schemas';

  constructor(private http: HttpClient) { }

  getSchema(schemaName: string): Observable<FormSchema> {
    const url = `${this.basePath}/${schemaName}.json`;
    console.log('url :', url);
    return this.http.get<FormSchema>(url);
  }
}
