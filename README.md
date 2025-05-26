# react-annotate

A lightweight, headless React library for inline text highlighting and
annotation. Perfect for blogs, docs, learning platforms—anywhere you want
readers to jot down notes directly on your content.

## 🚀 Features

- **Zero-infra**: Local persistence out of the box (via `localStorage`),
  pluggable to any backend
- **Headless API**: Hooks + Context provider; completely unstyled, so you build
  your own look
- **Deep-linking & share**: URL fragments to link directly to highlights
  (future)
- **Threaded & private**: Support public vs. personal notes (future)
- **Tiny footprint**: \~3 KB gzipped, React-only, no external CSS

---

## 📦 Installation

```bash
npm install react-annotate uuid
yarn add react-annotate uuid
```

Make sure you have React 17+ / React-DOM 17+ as a peer dependency.

---

## 🔨 Quick Start

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AnnotationProvider } from 'react-annotate';

ReactDOM.render(
	<AnnotationProvider>
		<App />
	</AnnotationProvider>,
	document.getElementById('root')
);
```

```tsx
// App.tsx
import React, { useEffect } from 'react';
import { useHighlighter, Sidebar, useAnnotations } from 'react-annotate';

export default function App() {
	const { annotations, update } = useAnnotations();
	const highlighter = useHighlighter(anchor => {
		console.log('new highlight', anchor);
	});

	useEffect(() => {
		document.addEventListener('mouseup', highlighter);
		return () => document.removeEventListener('mouseup', highlighter);
	}, [highlighter]);

	return (
		<div style={{ display: 'flex' }}>
			<article style={{ flex: 1, padding: 16 }}>
				<h1>My Article</h1>
				<p>Highlight any text to leave a note…</p>
				{/* your content */}
			</article>
			<Sidebar
				annotations={annotations}
				onUpdate={(id, note) => update(id, note)}
			/>
		</div>
	);
}
```

---

## 📍 API

### `<AnnotationProvider>`

Context provider. Wrap your app at the root.

```tsx
<AnnotationProvider>{/* your site */}</AnnotationProvider>
```

### `useAnnotations()`

Hook to read & modify all annotations.

```ts
const { annotations, add, update, remove } = useAnnotations();
```

- **annotations**: `Array<Annotation>`
- **add(anchor: Anchor)**: add a new highlight anchor
- **update(id: string, note: string)**: set/update the note text
- **remove(id: string)**: delete an annotation

#### Types

```ts
type Anchor = {
	id: string;
	text: string;
	startPath: number[];
	startOffset: number;
	endPath: number[];
	endOffset: number;
};

type Annotation = Anchor & {
	note?: string;
};
```

---

### `useHighlighter(onCreate: (anchor: Anchor) => void)`

Detects text selection + mouseup and calls your callback with a serialized
anchor.

- **onCreate** `(anchor) => void`
- Returns a `() => void` callback you attach to `document.mouseup`.

---

### `<Sidebar>`

Unstyled sidebar UI to list annotations and edit notes.

```tsx
<Sidebar
	annotations={annotations}
	onUpdate={(id: string, note: string) => update(id, note)}
	onRemove={id => remove(id)}
	className='my-sidebar'
/>
```

| Prop          | Type                                 | Description                  |
| ------------- | ------------------------------------ | ---------------------------- |
| `annotations` | `Annotation[]`                       | List from `useAnnotations()` |
| `onUpdate`    | `(id: string, note: string) => void` | Called when a note changes   |
| `onRemove?`   | `(id: string) => void`               | Optional delete handler      |
| `className?`  | `string`                             | Add custom wrapper class     |

---

## 🔧 Configuration & Extensibility

- **Storage adapter**: swap `localStorage` for IndexedDB, REST, Firebase… just
  wrap `add`, `update`, `remove` in your own functions.
- **Theming**: use your own CSS/utility classes. All components are unstyled.
- **Advanced anchoring**: replace the built-in XPath serializer with a more
  robust library (e.g. `dom-anchor-text-quote`).

---

## 🛣️ Roadmap

- [ ] React 18 Suspense support
- [ ] Shareable highlight links (URL fragments)
- [ ] Threaded replies & public vs private modes
- [ ] Plugin hooks (analytics, moderation, custom renderers)

---

## 📄 License

MIT © Sibasish Mohanty
