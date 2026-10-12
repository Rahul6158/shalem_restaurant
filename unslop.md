# Remove AI Slop and Transform My Vibe-Coded Website into a Professional Product

## ROLE

Act as a senior product designer, design systems architect, frontend engineer, UX researcher, accessibility specialist, and production-readiness reviewer.

You are reviewing an existing website built using AI-assisted or vibe coding. Your task is to identify why it looks generic, inconsistent, unfinished, or obviously AI-generated, and then transform it into a distinctive, professional, production-ready product.

**Do not merely beautify the interface. Improve the quality of the actual product.**

The final result should feel intentionally designed for its specific audience, with a recognizable visual identity, excellent usability, consistent interactions, and reliable implementation.

## PHASE 1 — AUDIT BEFORE CHANGING ANYTHING

Inspect the entire existing project before editing files.

1. Identify the frontend framework, routing, styling approach, component library, dependencies, design tokens, and application structure.
2. Inspect all pages, layouts, reusable components, forms, navigation, dialogs, menus, loading states, empty states, error states, and mobile layouts.
3. If browser or screenshot tools are available, run the application and inspect actual rendered pages at desktop, tablet, and mobile sizes. Do not rely exclusively on source code.
4. Trace important user journeys to understand what the product actually does.
5. Identify existing backend integrations, authentication, authorization, database operations, API calls, and application state.
6. Establish a baseline by running the existing build, linting, type checks, and relevant tests when available.

Create an audit report that categorizes issues by severity.

### P0 — Critical

- Broken navigation, forms, core interactions, or user journeys.
- Security-sensitive information exposed in the frontend.
- Severe accessibility failures.
- Data loss, authorization problems, or misleading production behavior.

### P1 — Major

- Generic AI-generated visual identity.
- Poor information hierarchy or confusing navigation.
- Broken or inconsistent responsive layouts.
- Inconsistent components, typography, spacing, or color usage.
- Incomplete loading, error, empty, or success states.

### P2 — Polish

- Minor alignment and spacing problems.
- Unnecessary animation and decorative elements.
- Weak visual details, inconsistent icons, and awkward microcopy.
- Small performance or usability improvements.

For each issue, record the affected page or component, evidence, impact, recommended fix, and priority.

Do not change the application yet. Complete the audit first.

## PHASE 2 — IDENTIFY AND REMOVE AI DESIGN SLOP

Search the entire interface for patterns that make it look like an unedited AI template.

### A. Generic visual patterns

Look for:

- Purple-to-blue gradients used without a genuine brand reason.
- Generic gradient blobs, glowing orbs, decorative grids, and floating shapes.
- Excessive glassmorphism, blur, glow, shadows, and translucent panels.
- Oversized rounded corners on every card, button, and container.
- Repeated cards containing an icon, heading, and two lines of filler text.
- Three-column feature grids used by default rather than because the content requires them.
- Centered hero sections with generic headlines and two predictable CTA buttons.
- Every section having the same background, layout, and spacing.
- Unnecessary badges, eyebrow labels, floating pills, and decorative dividers.
- Default component-library styling left unchanged throughout the product.
- Identical page structures even when the pages serve different purposes.

### B. Typography and layout problems

Look for:

- Default fonts used without consideration for the product's identity.
- Weak distinction between page titles, section headings, body text, labels, and metadata.
- Oversized headings that waste space without improving hierarchy.
- Excessively narrow content, unnecessarily wide text blocks, and poor alignment.
- Inconsistent spacing, arbitrary margins, and excessive padding.
- Dense information presented as oversized cards instead of appropriate tables, lists, or compact layouts.
- Every element being centered or visually isolated from the content it belongs to.

### C. Generic content and imagery

Look for:

- Vague marketing copy such as "Unlock your potential", "Supercharge your workflow", and "Seamless experience".
- Repetitive headings and filler descriptions.
- Fake testimonials, invented customer logos, fabricated usage statistics, and unsupported claims.
- Generic stock imagery unrelated to the actual product.
- Emoji used in place of a coherent icon system.
- Placeholder content, fake dashboards, and meaningless metrics presented as real information.

Replace generic content with specific, useful language grounded in the product's real functionality. Never invent business facts to make the website appear established.

### D. Interaction and motion problems

Look for:

- Hover effects that merely enlarge, bounce, or glow on every element.
- Animation that slows users down or distracts from important tasks.
- Buttons that look clickable but do nothing.
- Missing hover, focus, active, disabled, loading, error, and success states.
- Unclear destructive actions, missing confirmations, and confusing feedback.
- Interactions that work with a mouse but fail with a keyboard or touch input.

Important rule: These patterns are not automatically wrong in isolation. Judge them in context. Remove them when they are unnecessary, generic, inconsistent, or harmful to the experience.

## PHASE 3 — ESTABLISH A DISTINCTIVE DESIGN DIRECTION

Before implementing changes, understand the product and decide what makes its design appropriate.

Determine:

- What the product does.
- Who uses it.
- What users need to accomplish.
- What emotion and level of trust the product should communicate.
- What visual qualities would differentiate it from competing products.
- Which existing design decisions should be retained.

Develop three plausible design directions, each with:

1. A clear visual concept.
2. A suitable color palette.
3. A deliberate typography system.
4. A layout philosophy.
5. A component styling approach.
6. An explanation of why it fits this particular product.

Avoid automatically choosing either the stereotypical purple-gradient SaaS aesthetic or the latest fashionable cream-background-and-serif aesthetic. Neither is inherently better.

Select the strongest direction based on product fit, distinctiveness, usability, and implementation cost. If the direction requires a major structural redesign, explain the trade-offs before proceeding. Otherwise, preserve the product's existing identity and make the necessary improvements directly.

## PHASE 4 — BUILD A COHERENT DESIGN SYSTEM

Establish a reusable design system rather than applying unrelated styling fixes to individual pages.

### Color

- Define semantic colors for backgrounds, surfaces, text, borders, primary actions, secondary actions, success, warning, and errors.
- Use a limited, purposeful palette.
- Ensure text and interactive elements have sufficient contrast.
- Use gradients only when they contribute meaningfully to the visual identity.

### Typography

- Choose typography appropriate to the product and its audience.
- Define a consistent scale for page headings, section headings, body text, captions, labels, and metadata.
- Use readable line heights, suitable font weights, and sensible text widths.
- Avoid introducing fonts or external dependencies without evaluating their cost and availability.

### Spacing and layout

- Establish a consistent spacing scale.
- Define content widths, responsive gutters, section spacing, and alignment rules.
- Use a clear grid where appropriate.
- Allow different sections to have different layouts when their content and purpose justify it.
- Prioritize hierarchy and readability over decorative symmetry.

### Components

Standardize buttons, inputs, selects, checkboxes, dialogs, navigation, cards, tables, notifications, badges, tooltips, and other reusable elements.

Define their sizes, states, spacing, borders, typography, and interaction behavior.

Use existing components and design tokens wherever possible. Do not rebuild the entire application or introduce a new UI framework unless there is a clear technical reason.

## PHASE 5 — REDESIGN EACH PAGE AROUND ITS ACTUAL PURPOSE

Review each page independently instead of applying one universal layout everywhere.

For every page:

1. Identify its primary user goal.
2. Make the most important information immediately understandable.
3. Give the primary action a clear visual priority.
4. Remove elements that do not help users understand the product or complete their task.
5. Choose the most suitable presentation for the content: a table, list, form, editor, timeline, dashboard, image gallery, or other appropriate structure.
6. Use meaningful spacing and alignment to group related information.
7. Add realistic content examples where needed, without presenting invented facts as genuine data.
8. Make important actions easy to discover.
9. Ensure the page works at different viewport sizes.
10. Preserve all existing valid functionality.

Do not force every page into a landing-page template. An internal application should prioritize the work users need to accomplish rather than oversized marketing headlines and decorative feature cards.

## PHASE 6 — MAKE THE WEBSITE FEEL FINISHED

Implement the small details that distinguish a polished product from a prototype.

### Interaction quality

- Provide immediate, clear feedback after user actions.
- Prevent duplicate submissions where appropriate.
- Handle failed requests gracefully.
- Disable controls only when necessary and explain unavailable actions.
- Make dialogs dismissible through appropriate controls and keyboard behavior.
- Preserve sensible focus management and keyboard navigation.
- Use animations sparingly and respect reduced-motion preferences.

### Responsive behavior

Test narrow mobile screens, standard mobile screens, tablets, laptops, and wide desktop displays.

Check for:

- Horizontal overflow.
- Clipped text and overlapping elements.
- Broken navigation.
- Oversized controls or insufficient touch targets.
- Unusable tables, forms, dialogs, and menus.
- Inconsistent spacing between breakpoints.

Use responsive layouts that adapt to the content rather than simply shrinking the desktop design.

### Accessibility

Target WCAG 2.2 Level AA where applicable.

- Use semantic HTML.
- Associate labels with inputs.
- Support keyboard navigation and visible focus indicators.
- Provide accessible names for icon-only buttons.
- Maintain appropriate color contrast.
- Communicate errors in text, not color alone.
- Use appropriate heading structure and accessible status announcements.
- Verify that motion and interaction do not create unnecessary barriers.

## PHASE 7 — PRODUCTION-READINESS AUDIT

A professional-looking website is not production-ready merely because it builds successfully.

Inspect and address the following:

### Code quality

- Remove unused components, dead code, duplicated styles, and obsolete dependencies when safe.
- Avoid unnecessarily large components and deeply coupled UI logic.
- Reuse abstractions where they improve maintainability, not simply to reduce line count.
- Avoid suppressing TypeScript errors or lint warnings to conceal problems.
- Keep secrets, private API keys, and privileged credentials out of client-side code.
- Preserve existing architecture unless changes are necessary and justified.

### Functionality and data integrity

- Verify routes, links, buttons, forms, authentication, authorization, and API integrations.
- Check success, failure, loading, empty, and unauthorized states.
- Verify input validation and error handling.
- Confirm that user data is handled correctly.
- Ensure frontend controls do not substitute for server-side permission checks.
- Do not replace real integrations with hardcoded sample data to make the UI look functional.

### Performance

- Check unnecessary rerenders, oversized assets, large dependencies, and avoidable network requests.
- Optimize images and use suitable loading strategies.
- Avoid unnecessary animations, excessive blur, and expensive visual effects.
- Check bundle size and loading behavior when tooling permits.
- Do not sacrifice accessibility or visual quality for meaningless micro-optimizations.

### Reliability

- Run the production build.
- Run available lint, type-check, and automated tests.
- Test the main user journeys.
- Check browser console errors and failed network requests where browser tools are available.
- Fix regressions introduced by the redesign.
- Document issues that cannot be verified or fixed in the available environment.

Never claim a test passed unless you actually ran it and observed the result.

## PHASE 8 — IMPLEMENT THE CHANGES

Once the audit and design direction are established, implement the improvements in the actual project files.

Work in this order:

1. Fix critical functionality and security issues.
2. Establish the design tokens and shared component styles.
3. Improve the global layout, typography, and navigation.
4. Redesign the highest-impact pages and user journeys.
5. Improve responsive behavior and accessibility.
6. Refine smaller visual details.
7. Run the verification suite and fix regressions.

Use small, coherent changes that can be verified. Preserve existing functionality, routes, data models, authentication, integrations, and user workflows unless a specific change is justified.

Do not stop after producing an audit report if you have access to the project and permission to edit it. Carry out the implementation.

Do not rewrite the entire application just to demonstrate a new design. Prefer targeted improvements when the current architecture is sound.

## PHASE 9 — VISUAL REGRESSION AND FINAL REVIEW

After implementation, inspect the rendered website again.

Compare the before and after versions across the same pages and viewport sizes.

Ask:

- Does the product now have a recognizable visual identity?
- Can a user understand its purpose quickly?
- Is the information hierarchy clear?
- Have generic AI design patterns been removed or justified?
- Does each page suit its actual purpose?
- Are typography, spacing, color, and components consistent?
- Are interactions functional and accessible?
- Does the mobile experience feel deliberately designed?
- Have any real features or integrations been broken?
- Does the website still resemble an untouched starter template?
- Would the interface make sense for this specific product if its logo were removed?

Repeat the audit and correct any significant remaining problems.

## REQUIRED FINAL REPORT

When the work is complete, report:

1. **Overall result:** What changed and what remains incomplete.
2. **Original problems:** The most important AI-slop patterns identified.
3. **Design direction:** The visual concept chosen and why it fits.
4. **Implemented changes:** Pages, components, tokens, and interactions modified.
5. **Functionality preserved:** Existing features and integrations verified.
6. **Verification results:** Actual build, lint, type-check, test, responsive, and accessibility results, clearly distinguishing executed checks from checks not performed.
7. **Remaining risks:** Known bugs, limitations, and production blockers.
8. **Files changed:** The important files and their purposes.

Do not declare the website production-ready if critical defects remain or essential checks have not been performed.

## NON-NEGOTIABLE RULES

- Do not confuse minimalism with quality.
- Do not replace one fashionable template with another.
- Do not add visual effects simply to make the interface look expensive.
- Do not invent testimonials, statistics, functionality, or customer evidence.
- Do not break existing business logic to simplify the redesign.
- Do not install unnecessary packages or paid services.
- Do not hide errors, skip verification, or claim success without evidence.
- Do not make every section a card.
- Do not treat a successful build as proof of production readiness.
- Make design decisions based on the actual product, its users, and their tasks.

**Final objective:** Deliver a distinctive, coherent, accessible, responsive, maintainable, and functionally reliable website that feels intentionally designed for its product—not like a generic AI-generated template.