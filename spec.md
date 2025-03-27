# `spec.md`

## 1. Overview

**Project Name**: ChatGPT Palm Reader  
**Description**: A fun, whimsical palm-reading web app using ChatGPT’s image analysis and text generation capabilities. Users’ palm photos are taken by a host, processed on the server, and displayed on a communal “post-it style” board. The participant sees only the final reading (via a QR code linking to the communal board).

## 2. User Flow

1. **Host-Driven Photo Capture**

   - A host (admin) interface takes the participant’s photo (or allows a file upload).
   - Optionally, the host enters the participant’s name/nickname.

2. **Backend AI Processing**

   - Photo is uploaded to **Vercel Blob Storage**, retrieving a unique URL.
   - Serverless function calls **ChatGPT (Vision)** to describe the palm image.
   - Resulting description is passed to **GPT-4** (or GPT-3.5) with a creative prompt to generate a whimsical prophecy.

3. **Board Display & QR Code**
   - The final “prophecy card”—with participant name, photo thumbnail, and AI-generated text—displays on a **communal board** page.
   - A static (or dynamically generated) QR code lets participants visit the communal board from their own device to see their reading (and others).

## 3. Architecture & Technical Stack

1. **Frontend**

   - **React** (hosted on Vercel).
   - **Admin/Host Page**:
     - Minimal UI for uploading an image, entering a name, and triggering the serverless function.
     - On success, it can either navigate to the board or simply show a success notification.
   - **Communal Board Page**:
     - Displays an array of “post-it” or “polaroid” style cards (each with an image thumbnail, name, prophecy text).
     - Cards can be styled to appear draggable or pinned, but MVP might just show them in a grid/list with the latest on top.

2. **Backend (Serverless Functions on Vercel)**

   - **Image Handling**:
     - Receives file data, uploads to **Vercel Blob Storage** for hosting.
     - Returns the blob’s URL.
   - **AI Processing**:
     - Calls **ChatGPT Vision** to get a textual description of the uploaded image.
     - Passes that description + a creative prompt to **GPT-4** for the final prophecy text.
   - **Data Persistence**:
     - Uses **Vercel KV** for storing submissions.
     - Example record shape:
       ```json
       {
         "imageUrl": "https://unique.blob.vercel.app/...",
         "participantName": "Alice",
         "prophecyText": "You have a bright future ahead...",
         "timestamp": 1680000000000
       }
       ```
     - Key could be a UUID or something similar.
     - The communal board fetches all keys from KV or keeps a stored list of IDs and loads them to display.

3. **Data Model**
   - Minimal fields:
     1. `participantName` (string)
     2. `imageUrl` (string)
     3. `prophecyText` (string)
     4. `timestamp` (number) for sorting or retrieving in chronological order.

## 4. Error Handling

1. **Image Upload**
   - If an upload fails (file too large/network error), show a simple “Upload Failed” notification.
2. **AI Calls**
   - If ChatGPT Vision or GPT-4 fails/times out, show an “Error generating prophecy. Please try again.”
3. **KV Storage**
   - If KV write/read fails, show an “Error saving data. Please try again.”
4. **User Experience**
   - Minimal weekend-friendly approach—just enough feedback so the host knows something went wrong.

## 5. Testing Strategy

- **Manual Testing**:
  - Upload a sample hand photo.
  - Verify the image successfully uploads to Vercel Blob Storage.
  - Confirm the AI responses appear in the communal board.
  - Scan the QR code from a phone to ensure the board is accessible.
- **No Formal Automated Tests** planned for MVP (to keep it quick and fun).

## 6. MVP Scope vs. Future Enhancements

- **MVP**:

  1. Host-driven single-page upload form (name + image).
  2. Serverless function that calls ChatGPT Vision + GPT-4 for prophecy.
  3. KV-based storage for reading records.
  4. Communal board page with all readings.
  5. QR code that links to the communal board.

- **Possible Future Features**:
  - Unique reading URLs (`/reading/:id`) for direct sharing.
  - Polaroid or post-it style drag-and-drop interface.
  - Authentication or admin control.
  - Enhanced error handling and analytics.
  - More robust database queries if needed (e.g., Vercel Postgres).
