# `prompt_plan.md`

## 1. Initialize the Project & Basic Setup

**Goal**: Create a basic React app on Vercel with minimal scaffolding.

### Steps & Potential Prompt

1. **Set up a new React project** (e.g., using `create-react-app`, Next.js, or a Vite React template).
2. **Add dependencies** that might be needed (e.g., any UI library, if desired, or just stick to basic React).

**Prompt Example**:

> **“Create a new React project named ‘chatgpt-palm-reader’. Set up the basic file structure and confirm it runs locally on port 3000.”**

---

## 2. Create the Communal Board Page (Front End Only, Mock Data)

**Goal**: Build the main display page (the “board”), using **mock data** to simulate prophecy entries.

### Steps & Potential Prompt

1. **Create a `Board` component** that displays a list of “cards” (each card has a mock `imageUrl`, `participantName`, `prophecyText`).
2. **Style** the cards in a “post-it” or “polaroid” manner, as you wish (simple CSS is fine).
3. Add a **main route** (e.g., `/board`) that shows this list of mock entries.

**Prompt Example**:

> **“Implement a `Board` component in React that displays an array of mock ‘prophecy cards’ with fields: imageUrl, participantName, prophecyText. Use minimal CSS to mimic a post-it note style. Place them in a scrollable container.”**

---

## 3. Implement a Serverless API to Fetch Real Data from Vercel KV

**Goal**: Replace mock data with real data from KV.

### Steps & Potential Prompt

1. **Create a serverless function** (e.g., in `api/getProphecies.js` or `pages/api/getProphecies.ts` if using Next.js) that:
   - Connects to **Vercel KV**.
   - Fetches **all** entries (or the stored IDs, then iterates to get each record).
   - Returns them as JSON.
2. In the frontend `Board` component, **fetch** from this new endpoint to display real data (initially, maybe we manually insert some test data in KV or do it via the console).

**Prompt Example**:

> **“Create a serverless function on Vercel named `getProphecies` that fetches all keys/values from Vercel KV and returns them as an array of { imageUrl, participantName, prophecyText, timestamp }. Update the `Board` component to call this endpoint and render the results.”**

---

## 4. Implement Admin/Host Upload Page (UI + Minimal Backend)

**Goal**: Provide a page for the host to enter a participant’s name, select an image, and submit.

### Steps & Potential Prompt

1. **Create an `AdminUpload` component** with a form:
   - Text input for participant’s name.
   - File input (or drag-and-drop) for the hand image.
   - “Submit” button.
2. **Serverless endpoint**: On submit, call an API function to:
   - Temporarily accept & store the image in **Vercel Blob**.
   - Return the blob URL.

(We’ll handle AI calls in the next step.)

**Prompt Example**:

> **“Build an `AdminUpload` page with a simple form: name input, file input, and a submit button. On submit, call an endpoint (`/api/uploadImage`) that uploads the file to Vercel Blob Storage and returns the blob URL. Display any success/error messages in the UI.”**

---

## 5. Integrate AI: ChatGPT Vision + GPT-4

**Goal**: Once the image is uploaded, call ChatGPT Vision to get a description, then pass that description to GPT-4 for the final prophecy.

### Steps & Potential Prompt

1. **Extend the serverless upload endpoint** (or create a new endpoint) that:
   - After uploading to Vercel Blob, calls **ChatGPT Vision** with the image URL.
   - Takes the returned description, feeds it + a creative prompt into **GPT-4** (or GPT-3.5).
   - Receives the final prophecy text.
2. **Store** the new record (`{ imageUrl, participantName, prophecyText, timestamp }`) in **Vercel KV**.
3. Return the final data to the frontend.

**Prompt Example**:

> **“Update the `uploadImage` API endpoint to call ChatGPT’s image analysis endpoint with the blob URL. Take the returned description, then call GPT-4 with a whimsical palm-reading prompt. Store the resulting prophecy in Vercel KV along with the participant’s name and imageUrl. Return the prophecy text to the client.”**

_(Note: You’d need the actual code or library calls for ChatGPT’s Vision and GPT-4. The specifics vary based on the API access method. You’ll also handle auth keys, environment variables, etc.)_

---

## 6. Final Integration & Automatic Board Refresh

**Goal**: Once the host completes a submission, ensure the new prophecy is visible on the communal board.

### Steps & Potential Prompt

1. In the `AdminUpload` UI, once the prophecy is created, either:
   - **Navigate** to the `Board` page, or
   - **Trigger** a refresh in the `Board` component (if you’re using some shared state or real-time approach).
2. Add **timestamp-based sorting** so the newest reading shows at the top.

**Prompt Example**:

> **“When the admin successfully uploads an image and the prophecy is generated, update the board in real-time or navigate to it so the newly created reading is visible at the top.”**

---

## 7. QR Code Linking

**Goal**: Provide a scannable QR code that points directly to the communal board.

### Steps & Potential Prompt

1. **Generate a static QR code** using any library or an online generator that encodes the URL of the communal board (e.g., `https://app-name.vercel.app/board`).
2. **Display/print** this QR code in a prominent place (or in the UI itself if you want the host to show it on-screen).
3. (Optional) If you want unique links for each prophecy, create a route like `/reading/:id`, but that’s an enhancement.

**Prompt Example**:

> **“Add a static QR code image in the `Board` page instructions so participants can scan it to view the board on their phones.”**

---

## 8. Polishing & Styling

**Goal**: Final pass for styling, basic error handling, and cleaning up.

### Steps & Potential Prompt

1. Add **basic error handling** in the UI for image upload or AI timeouts.
2. Implement **polaroid/post-it** CSS styles, fonts, or any final design tweaks.
3. Ensure the board layout is mobile-friendly so participants can easily view on their phones.

**Prompt Example**:

> **“Refine the CSS for `Board` and `AdminUpload`, making sure it’s responsive for mobile screens. Include a fallback ‘Error generating prophecy’ message if something goes wrong.”**

---

## 9. Manual Testing & Deployment

**Goal**: Deploy to Vercel, run through all steps as a user/host, and ensure it works.

### Steps & Potential Prompt

1. **Deploy** the app on Vercel.
2. **Manually test**:
   - Upload a sample palm image.
   - Confirm it appears on the board.
   - Check the QR code on a real phone.
3. **Fix** any bugs or polish any leftover UI issues.

**Prompt Example**:

> **“Deploy the project to Vercel. Test the entire flow manually with a real palm image, ensuring that the reading is generated and displayed in the communal board. Provide final fixes if any part breaks.”**
