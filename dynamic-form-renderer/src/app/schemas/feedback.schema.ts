import { FormSchema } from '../components/dynamic-form/dynamic-form.model';

export const feedbackSchema: FormSchema = {
  title: 'Feedback Form',
  fields: [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'text' },
    {
      label: 'Rating',
      name: 'rating',
      type: 'dropdown',
      options: ['1', '2', '3', '4', '5'],
      required: true
    },
    {
      label: 'Comments',
      name: 'comments',
      type: 'textarea'
    }
  ]
};
