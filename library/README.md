# genui-library

🌐 **Website:** [https://genui-1-tkei.onrender.com](https://genui-1-tkei.onrender.com)

A lightweight React UI component library for GenUI.

## Included Components

- `Button`
- `NavBar`
- `AuthForm`
- `Loader`
- `Dashboard`
- `ContactForm`
- `HeroSection`
- `PricingSection`
- `FeatureSections`
- `TestimonialsCarousel`
- `FAQSection`
- `AIChat`
- `CommandPalette`
- `KanbanBoard`
- `EventCalendar`
- `FileUpload`
- `ProductPage`
- `UserProfileSettings`
- `NotificationCenter`

More components are coming soon.

## Installation

```bash
npm install genui-library
```

## Peer Dependency

This package requires React 18 or later.

```bash
npm install react
```

## Usage

```jsx
import {
  Button,
  NavBar,
  AuthForm,
  Loader,
  HeroSection,
} from "genui-library";

export default function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Button label="Click Me" />
      <Loader />
      <AuthForm />
    </div>
  );
}
```

## Button

Flexible button component with multiple styles, colors, and states.

```jsx
<Button label="Primary" />
<Button label="Danger" color="danger" />
<Button label="Outline" variant="outline" />
<Button label="Loading" loading />
```

## Documentation

For full usage details, examples, and API reference, visit the official documentation:

https://genui-1-tkei.onrender.com

## License

ISC
