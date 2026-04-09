# Design System Strategy: The Artisanal Archive

## 1. Overview & Creative North Star
**Creative North Star: "The Artisanal Archive"**
This design system moves away from the clinical, grid-locked "bakery template" and instead adopts the persona of a premium, editorial lookbook. We are treating Alfaysal’s heritage not just as a business, but as a curated collection of culinary craft. 

To achieve a "High-End Editorial" experience, the layout prioritizes intentional asymmetry—placing high-quality photography off-center to create a sense of movement—and uses extreme typographic scales to establish an authoritative yet warm voice. We replace rigid containers with "soft zones" of color, allowing the brand's navy and red to act as sophisticated anchors against a sea of warm, organic cream tones.

## 2. Colors: Tonal Depth & Warmth
The palette is rooted in the "Bakery Feel," utilizing earth tones to soften the high-contrast brand colors.

*   **Primary (#141779) & Primary Container (#2D328F):** Used for navigation anchors and primary CTAs. This navy provides the "Professional" weight.
*   **Secondary (#BB0013) & Secondary Container (#E71520):** Reserved for "Freshness" highlights, sale badges, or urgent CTAs. Use sparingly to maintain a premium feel.
*   **Surface & Background (#FDF9F0):** The "Cream" base. This is the canvas that evokes parchment and flour.
*   **Tertiary (#402000):** The "Dark Chocolate" earth tone. Use this for body text to keep the reading experience warmer than pure black.

### The "No-Line" Rule
Prohibit 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. For instance, a Hero section on `surface` should transition into a "Featured Products" section using `surface-container-low`.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Layer 0:** `surface` (The main page background).
*   **Layer 1:** `surface-container-low` (Large structural sections).
*   **Layer 2:** `surface-container-highest` (Product cards or featured callouts).
By nesting a "Highest" container inside a "Low" section, you create a soft, natural lift that feels organic rather than digital.

### Signature Textures & Glass
Main CTAs should utilize a subtle linear gradient from `primary` to `primary_container`. For floating navigation bars, use **Glassmorphism**: a semi-transparent `surface` color with a `backdrop-blur` of 20px, allowing the vibrant food photography to peek through the UI.

## 3. Typography: The K2D Editorial Scale
We are using **K2D** exclusively. Its rounded terminals echo the "baked" nature of the products while its geometric structure maintains professionalism.

*   **Display (Display-LG/MD):** Use for product names and hero statements. Letter spacing should be slightly tight (-0.02em) to feel like a high-end magazine header.
*   **Headlines (Headline-LG/MD):** Used for story-telling sections ("Our Heritage").
*   **Body (Body-LG):** Set in `tertiary` (#402000) for a softer, more inviting reading experience than standard grey.
*   **Labels (Label-MD):** Used for snack categories (e.g., "Savory," "Sweet"). These should be all-caps with increased letter spacing (+0.05em) for a sophisticated "tag" look.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often too "heavy" for a bakery brand. We achieve depth through **Tonal Layering**.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-low` section. The slight shift in "creaminess" provides a sophisticated, tactile boundary.
*   **Ambient Shadows:** When an element must float (like a "Buy Now" button), use a diffused shadow: 
    *   *Y: 12px, Blur: 24px, Color: `on-surface` at 6% opacity.* 
    *   This mimics the soft, ambient light of a bakery storefront.
*   **The Ghost Border:** For input fields or cards where definition is required for accessibility, use a "Ghost Border": the `outline-variant` token at 15% opacity. Never use 100% opaque borders.

## 5. Components

### Buttons (The "Pill" Aesthetic)
*   **Primary:** Full rounded (`9999px`), `primary` background, `on-primary` text. Incorporate a subtle inner-glow on hover.
*   **Secondary:** `surface-container-highest` background with `primary` text. No border.
*   **Tertiary:** Transparent background, `primary` text, with a 2px `primary` underline that expands on hover.

### Food Photography Cards
*   **Shape:** `xl` (1.5rem) rounded corners.
*   **Constraint:** Forbid divider lines. Separate product titles from descriptions using 1rem of vertical whitespace.
*   **Treatment:** Images should have a subtle 0.5s zoom-in effect on hover to emphasize the "appetizing" nature of the snacks.

### Product Chips
*   **Style:** Selection chips should use `tertiary-fixed-dim` for a "toasted" earthy feel.
*   **Shape:** `md` (0.75rem) roundedness to contrast with the circular buttons.

### Input Fields
*   **Style:** `surface-container-highest` background. No border.
*   **Active State:** Transition to a "Ghost Border" using `primary` at 20% opacity.

### Featured "Snack" Carousel
*   Use asymmetrical card sizing (e.g., the center card is slightly larger than the flanking cards) to break the "standard grid" and create a rhythmic, curated feel.

## 6. Do's and Don'ts

### Do:
*   **Do** use "Breathing Room." High-end design lives in the whitespace. Ensure at least 80px-120px of padding between major sections.
*   **Do** use high-quality, warm-toned food photography. The photography *is* a UI element.
*   **Do** use `tertiary` (Earth tones) for secondary text to keep the "Bakery" vibe alive.

### Don't:
*   **Don't** use 1px solid black or dark grey borders. This immediately destroys the premium, organic feel.
*   **Don't** use sharp 90-degree corners. Everything should feel soft and "baked" (minimum `sm` roundedness).
*   **Don't** use standard "drop shadows" with high opacity. They create "dirty" layouts.
*   **Don't** overcrowd the screen. If a section feels busy, increase the background-color contrast between layers instead of adding lines.