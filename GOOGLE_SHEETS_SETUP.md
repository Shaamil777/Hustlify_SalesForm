# Google Sheets Integration Setup

## Quick Start Guide

Your form is now ready to submit data to Google Sheets! Follow these steps:

### 1. Deploy the Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/108jB3t5fZjENtiJ9SVnObJ5NC-KNZ6uG85YNSPBgEtQ/edit
2. Go to **Extensions** → **Apps Script**
3. Copy the code from `google-apps-script/Code.gs`
4. Paste it into the Apps Script editor
5. Save the project (give it a name like "Form Handler")
6. Click **Deploy** → **New deployment**
7. Select type: **Web app**
8. Set "Who has access" to: **Anyone**
9. Click **Deploy** and authorize the script
10. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`)

### 2. Configure Your Environment

1. Open the `.env` file in your project root
2. Paste your Web App URL:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Save the file

### 3. Restart Your Dev Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

### 4. Test It Out!

1. Fill out your form with test data
2. Click Submit
3. Check your Google Sheet - you should see the data appear!

## What Gets Saved

Each form submission creates a new row with:
- Timestamp
- First Name
- Last Name
- Email
- Country Code
- Phone Number
- Sales Experience
- Educational Qualification
- About You

## Troubleshooting

**Form submits but no data appears:**
- Check the Apps Script execution logs (Extensions → Apps Script → Executions)
- Verify the Web App URL is correct in `.env`
- Make sure you restarted your dev server

**CORS errors:**
- Ensure deployment is set to "Anyone" access
- The form uses `no-cors` mode which is required for Google Apps Script

**Need to update the script:**
- Edit in Apps Script editor
- Deploy → Manage deployments → Edit → New version → Deploy
- URL stays the same, no need to update `.env`

## Detailed Instructions

For step-by-step instructions with screenshots, see:
`google-apps-script/DEPLOYMENT_INSTRUCTIONS.md`
