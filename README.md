## JSON Schema Format

The form fields are generated based on a JSON schema stored in `src/assets/mock-data/form-design.json`. The schema follows this structure:

```typescript
interface IField {
  label: string; // Display label for the field
  name: string; // Form control name
  type: string; // Input type (text, textarea, dropdown, multiselect)
  required?: boolean; // Whether the field is mandatory
  options?: string[]; // Options for dropdown/multiselect
  validation?: {
    // Optional validation rules
    pattern?: string; // Regex pattern for validation
    message?: string; // Custom validation message
  };
}
```

## Technical Implementation Details

### Performance Optimizations

- **OnPush Change Detection**:
  - Implemented to optimize performance by reducing change detection cycles
  - Components update only when:
    - Input references change
    - Events occur within the component
    - Signal values update
    - Explicit change detection is triggered
  - Results in improved application performance, especially for complex forms
- **Memory Management**:
  - Proper subscription handling with automatic cleanup in ngOnDestroy
  - All HTTP subscriptions and event listeners are properly unsubscribed
  - Prevents memory leaks in long-running applications

### Enhanced User Experience

- **Shimmer UI Effect**:
  - Implemented sophisticated loading state visualization
  - Shows a shimmer animation while form data is loading
  - Benefits:
    - Reduces perceived loading time
    - Provides visual feedback during data fetching
    - Creates a smoother transition from loading to loaded state
    - More engaging than traditional loading spinners
    - Matches the form's layout, preventing layout shifts
  - Note: `setTimeout` is used in the demo solely to simulate network latency and showcase the Shimmer UI effect. In a production environment, this would be replaced with actual API calls.

## Example Form Output

When submitted, the form generates an object matching the schema structure:

```json
{
  "fullName": "Hemakshi Tank",
  "email": "ksmhmk01@gmail.com",
  "dob": "2025-11-05",
  "gender": "Female",
  "hobbies": ["Reading", "Sports", "Music", "Travel"],
  "subscribe": false,
  "about": "Sample Text"
}
```

## Test Coverage

The application includes comprehensive test coverage (only written for app.component.ts and app.service.ts):
Current overall test coverage metrics:

- 78.26% Statements 36/46
- 27.77% Branches 5/18
- 81.81% Functions 9/11
- 81.39% Lines 35/43

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
To generate a coverage report, run:

```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage` directory. Open `coverage/index.html` in your browser to view detailed coverage metrics.
