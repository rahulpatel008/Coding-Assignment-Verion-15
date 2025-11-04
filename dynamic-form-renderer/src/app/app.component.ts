import { Component } from '@angular/core';
import { userRegistrationSchema } from './schemas/user-registration.schema';
import { feedbackSchema } from './schemas/feedback.schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dynamic Form Renderer';
  currentSchema = userRegistrationSchema;
  lastOutput: any;

  onFormSubmit(formData: any) {
    console.log('✅ Form Submitted:', formData);
    this.lastOutput = formData;  
  }

  switchSchema(type: string) {
    this.currentSchema = type === 'user' ? userRegistrationSchema : feedbackSchema;
  }
}
