# Chord Implementation Engineer Take-Home Assignment

This take home assignment is designed to assess your technical skills in implementing analytics tracking in a React application using the Chord Analytics SDK.

---

## Background

You've joined a team that maintains a React-based e-commerce store. The Chord Analytics SDK has already been integrated with basic event tracking (page views, product views, add to cart, etc.).

Your task is to implement two new custom tracking events that will help the business understand user engagement:

1. **Home Page Scroll Depth**
2. **Checkout Form Abandonment Tracking**

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+

### Installation

```bash
# install deps
npm install

# start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

The `.env` file is pre-configured with test credentials.

```
VITE_CHORD_CDP_DOMAIN=https://staging.cdp.ingest.chord.co
VITE_CHORD_CDP_WRITE_KEY=your-write-key
```

---

## Your Tasks

### Task 1: Home Page Scroll Depth Tracking

**Goal:** On the Home Page only, fire an event when the user has scrolled the page to 90% of it's height

**Requirements:**

- The scroll depth event should only fire once per page
- Use the Chord Analytics `track()` method with a custom event name and properties object

**Suggested Event Schema:**

```typescript
chord.track("Nintey Percent Scroll Depth Reached", {
  page_path: string,
});
```

---

### Task 2: Form Abandonment Tracking

**Goal:** Track when users start filling out the checkout form but navigate away without completing their purchase.

**Requirements:**

- Detect when a user has started entering data into any form field
- Track abandonment when the user navigates away from the checkout page (component unmounts)
- Only fire the abandonment event if the form was interacted with but NOT submitted
- Optional: Include which fields were filled in (without capturing sensitive data values)

**Suggested Event Schema:**

```typescript
chord.track("Checkout Form Abandoned", {
  fields_started: string[], // e.g., ["email", "firstName", "address"]
});
```

---

## Evaluation Criteria

Your submission will be evaluated on:

1. **Correctness** - Does the implementation work as specified?
2. **Code Quality** - Is the code clean, readable, and well-organized?

---

## Deliverables

1. **Code Changes** - Your implementation in the specified files
2. **Brief Write-up**:

- Explain your approach for each task
- Describe any edge cases you considered
- Note any potential future improvements given more time

---

## Using the Chord Analytics SDK and Verifiying Network Requests in the Browser

The `useChord()` hook provides access to the Chord Analytics client:

```typescript
import { useChord } from "../hooks/useChord";

function MyComponent() {
  const chord = useChord();

  // Track a custom event
  chord?.track("Event Name", {
    property1: "value1",
    property2: "value2",
  });
}
```

You can verify events have been successfully sent to the Chord CDP by:

1. Opening the Network tab in your brower
2. Ensure requests are filtered by "All" and search for "ingest"
3. View track and Page Event Request payloads as events occur on the site

See the below screenshot for clarification
https://s.chord.co/GGuwd1z5

---

## Resources

- [Chord Analytics Event Tracking Documentation](https://docs.chord.co/chord-commerce-event-tracking)

---

## Submission

Please submit your completed assignment as either a link to a public GitHub repository
