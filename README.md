# 🧩 Dynamic Form Renderer (Angular 15)

## ⚙️ Steps to Run the Application

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the application**
   ```bash
   ng serve
   ```
   Then open 👉 **http://localhost:4200**

3. **Run unit tests**
   ```bash
   ng test
   ```
   (Coverage report: `coverage/dynamic-form-renderer/index.html`)

---

## 🧠 JSON Schema Format

Each form is dynamically generated from a JSON schema file located in `src/assets/schemas/`.

### Example Schema Structure:
```json
{
  "title": "User Registration",
  "fields": [
    {
      "label": "Full Name",
      "name": "fullName",
      "type": "text",
      "required": true
    },
    {
      "label": "Email",
      "name": "email",
      "type": "text",
      "required": true,
      "validation": {
        "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
        "message": "Invalid email address"
      }
    },
    {
      "label": "Gender",
      "name": "gender",
      "type": "dropdown",
      "options": ["Male", "Female", "Other"]
    },
    {
      "label": "Subscribe",
      "name": "subscribe",
      "type": "checkbox"
    }
  ]
}
```

### Supported Field Types:
`text`, `textarea`, `date`, `dropdown`, `multiselect`, `checkbox`

### Common Attributes:
| Property | Description |
|-----------|--------------|
| `label` | Display name of the field |
| `name` | Unique field identifier |
| `type` | Input type (text, date, etc.) |
| `required` | Whether field is mandatory |
| `readonly` | View-only but editable in code |
| `disabled` | Greyed out and excluded from output |
| `hidden` | Not displayed but included in form model |
| `options` | Dropdown/multiselect items |
| `validation.pattern` | Regex validation |
| `validation.message` | Error message |

---

## 🧾 Example Output (Form Submission)

When a user submits the form, the output is shown on screen and logged in console:

```json
{
  "fullName": "Rahul Patel",
  "email": "rahulspatel008@yahoo.in",
  "gender": "Male",
  "subscribe": true
}
```

---

✅ **Summary:**  
This project renders reusable dynamic forms from JSON, supports validation, readonly/disabled/hidden fields, and uses Angular Reactive Forms with API-driven schemas.
