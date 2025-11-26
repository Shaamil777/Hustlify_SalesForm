# Google Apps Script Deployment Instructions

## Step 1: Open Your Google Sheet
1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/108jB3t5fZjENtiJ9SVnObJ5NC-KNZ6uG85YNSPBgEtQ/edit
2. Make sure you're on the sheet where you want the data to appear (default is Sheet1)

## Step 2: Open Apps Script Editor
1. In your Google Sheet, click on **Extensions** → **Apps Script**
2. This will open the Apps Script editor in a new tab

## Step 3: Add the Script
1. Delete any existing code in the editor
2. Copy the entire content from `Code.gs` file
3. Paste it into the Apps Script editor
4. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
5. Give your project a name (e.g., "Form Submission Handler")

## Step 4: Deploy as Web App
1. Click on **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the deployment settings:
   - **Description**: Form Submission API (optional)
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **IMPORTANT**: Copy the **Web app URL** that appears (it looks like: `https://script.google.com/macros/s/...../exec`)

## Step 5: Update Your React Form
1. Copy the Web app URL from step 4
2. Open your `.env` file (or create one if it doesn't exist)
3. Add this line:
   ```
   VITE_GOOGLE_SCRIPT_URL=YOUR_WEB_APP_URL_HERE
   ```
4. Replace `YOUR_WEB_APP_URL_HERE` with the actual URL you copied
5. Restart your development server

## Step 6: Test the Integration
1. Fill out your form with test data
2. Submit the form
3. Check your Google Sheet - you should see a new row with the submitted data

## Troubleshooting

### If you get CORS errors:
- Make sure you deployed with "Who has access: Anyone"
- Redeploy the script if needed

### If data isn't appearing:
- Check the Apps Script execution logs: **Executions** tab in Apps Script editor
- Make sure the Web app URL is correct in your .env file
- Verify you restarted your dev server after updating .env

### To update the script:
1. Make changes in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the edit icon (pencil) next to your deployment
4. Change version to **New version**
5. Click **Deploy**
6. The Web app URL remains the same

## Testing the Script Directly
You can test the script before connecting your form:
1. In Apps Script editor, select the `testDoPost` function from the dropdown
2. Click the **Run** button
3. Check your Google Sheet for a test entry
4. Check **Execution log** (View → Logs) for any errors
