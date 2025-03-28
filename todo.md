# `todo.md`

- [x] **Initialize the Project & Basic Setup**

  - [x] Create a new React project (e.g., using `create-react-app`, Next.js, or Vite).
  - [x] Verify it runs locally (e.g., on port 3000).

- [x] **Create the Communal Board Page (Front End Only, Mock Data)**

  - [x] Build a `Board` component displaying mock “prophecy cards.”
  - [x] Style the cards (e.g., polaroid/post-it style) in a scrollable container.
  - [x] Set up a route (e.g., `/board`) to render this component.

- [x] **Implement a Serverless API to Fetch Real Data from Vercel Redis**

  - [x] Install and configure `redis` using the Vercel Redis Add-on environment variables.
  - [x] Create a serverless function (e.g., `/api/getProphecies`) that retrieves prophecy records from Redis.
  - [x] Update the `Board` component to fetch real data from this endpoint instead of using mock data.

- [ ] **Implement Admin/Host Upload Page (UI + Minimal Backend)**

  - [ ] Build an `AdminUpload` page with a form (name input, file input, submit button).
  - [ ] Create an API endpoint (e.g., `/api/uploadImage`) to upload the file to Vercel Blob Storage.
  - [ ] Show success/error feedback in the UI.

- [ ] **Integrate AI: ChatGPT Vision + GPT-4**

  - [ ] Extend the upload endpoint (or create a new one) to call ChatGPT Vision and GPT-4.
  - [ ] Store the resulting “prophecy” in **Redis** along with the participant’s name and the image URL.
  - [ ] Return the final data to the client.

- [ ] **Final Integration & Automatic Board Refresh**

  - [ ] Ensure a newly created reading is visible on the `Board` immediately (e.g., re-fetch or navigate to `Board`).
  - [ ] Sort readings so the newest appears first.

- [ ] **QR Code Linking**

  - [ ] Generate or include a static QR code pointing to the `/board` page.
  - [ ] Make sure it’s prominently displayed (e.g., in the UI or printed out) for participants to scan.

- [ ] **Polishing & Styling**

  - [ ] Add basic error handling (upload issues, AI timeouts, Redis errors).
  - [ ] Refine the CSS (responsive design, polished “post-it” or “polaroid” aesthetic).

- [ ] **Manual Testing & Deployment**
  - [ ] Deploy the project to Vercel.
  - [ ] Manually test the entire flow (image upload → AI prophecy → communal board).
  - [ ] Address any bugs or final UI fixes.

---
