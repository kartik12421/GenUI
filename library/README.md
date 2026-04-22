# genui-library

A lightweight and customizable React UI component library.

## Included Components

- `Button`
- `Card`
- `ProfileCard`

More components will be added over time.

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
import { Button, Card, ProfileCard } from "genui-library";

export default function App() {
  return (
    <div>
      <Button label="Click Me" />
      <Card title="Welcome" description="Reusable UI card component" />
      <ProfileCard name="Aman Sharma" role="Backend Engineer" />
    </div>
  );
}
```

## Components

### Button

Flexible button component with multiple styles, colors, and states.

#### Example

```jsx
<Button label="Primary" />
<Button label="Danger" color="danger" />
<Button label="Outline" variant="outline" />
<Button label="Ghost" variant="ghost" />
<Button label="Soft" variant="soft" />
<Button label="Large" size="lg" />
<Button label="Loading" loading />
<Button label="Full Width" fullWidth />
```

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Click Me"` | Button text |
| `onClick` | `function` | `() => {}` | Click handler |
| `variant` | `string` | `"solid"` | `solid`, `outline`, `ghost`, `soft` |
| `color` | `string` | `"primary"` | `primary`, `danger`, `success`, `warning`, `neutral` |
| `size` | `string` | `"md"` | `sm`, `md`, `lg` |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows loading state |
| `fullWidth` | `boolean` | `false` | Expands button width to 100% |
| `icon` | `ReactNode` | `null` | Optional icon before label |

### Card

Basic content card with variants, color themes, selection support, and optional action buttons.

#### Example

```jsx
<Card />
<Card variant="filled" color="blue" />
<Card variant="outlined" color="red" />
<Card variant="elevated" title="Featured Card" />
<Card tag="New" showActions />
<Card selectable onSelect={(selected) => console.log(selected)} />
```

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `subtitle` | `string` | `"Subtitle"` | Small text above the title |
| `title` | `string` | `"Card Title"` | Main heading |
| `description` | `string` | `"Description"` | Card body text |
| `tag` | `string \| null` | `null` | Optional badge/tag text |
| `disabled` | `boolean` | `false` | Reduces opacity and disables interaction |
| `selectable` | `boolean` | `false` | Enables selection behavior |
| `onSelect` | `function` | `() => {}` | Called when selection changes |
| `showActions` | `boolean` | `false` | Shows bookmark and like actions |
| `variant` | `string` | `"default"` | `default`, `outlined`, `elevated`, `ghost`, `filled` |
| `color` | `string` | `"blue"` | `blue`, `red`, `green`, `yellow`, `gray` |
| `size` | `string` | `"md"` | `sm`, `md`, `lg` |
| `width` | `number` | `260` | Card width in pixels |

### ProfileCard

Customizable profile card component for user and team member UI.

#### Example

```jsx
<ProfileCard
  name="Aman Sharma"
  role="Backend Engineer"
  variant="filled"
  color="danger"
/>

<ProfileCard
  size="lg"
  cover="https://picsum.photos/400/200"
/>

<ProfileCard selectable onSelect={(selected) => console.log(selected)} />

<ProfileCard
  variant="outlined"
  color="success"
  style={{ width: 350, borderRadius: 30 }}
/>
```

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | `"John Doe"` | User name |
| `role` | `string` | `"Web Developer"` | User role/title |
| `bio` | `string` | `"Building modern Websites"` | Short profile description |
| `avatar` | `string` | `https://i.pravatar.cc/150?img=12` | Avatar image URL |
| `cover` | `string \| null` | `null` | Optional cover image URL |
| `stats` | `Array<{ label: string, value: string \| number }>` | Preset stats | Stats section content |
| `variant` | `string` | `"elevated"` | `default`, `outlined`, `elevated`, `filled` |
| `color` | `string` | `"primary"` | `primary`, `danger`, `success`, `warning`, `neutral` |
| `size` | `string` | `"md"` | `sm`, `md`, `lg` |
| `selectable` | `boolean` | `false` | Enables card selection |
| `onSelect` | `function` | `() => {}` | Called when selection changes |
| `style` | `object` | `{}` | Inline style overrides |
| `className` | `string` | `""` | Optional custom class name |

## Limitations

- Limited component set at the moment
- No theming system yet
- Accessibility is not fully documented or guaranteed
- No dark mode support yet

## Roadmap

- Input components such as `TextField` and `Select`
- Modal / Dialog
- Toast / Notification
- Grid / Layout system
- Theme provider
- Dark mode

## License

ISC
