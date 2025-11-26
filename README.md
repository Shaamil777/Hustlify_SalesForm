# Hustlify Sales Form

A modern, responsive sales application form built with React, TypeScript, and Tailwind CSS. Form submissions are automatically saved to Google Sheets and users are redirected to a Telegram group upon successful submission.

## Features

- ✨ Modern, animated UI with gradient backgrounds
- 📱 Fully responsive design
- ✅ Real-time form validation with visual feedback
- 🔒 Input sanitization and security measures
- 📊 Automatic data submission to Google Sheets
- 🔔 Toast notifications for success/error feedback
- 📲 Automatic redirect to Telegram group after submission
- 🎨 Beautiful gradient animations and transitions

## Form Fields

- First Name & Last Name (required)
- Email Address (required)
- Phone Number with Country Code (required)
- Sales Experience (Fresher/Experienced) (required)
- Educational Qualification (required)
- About You (optional)

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Notifications:** React Toastify
- **Backend:** Google Apps Script
- **Data Storage:** Google Sheets

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shaamil777/Hustlify_SalesForm.git
cd Hustlify_SalesForm
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Google Sheets Integration

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Copy the code from `google-apps-script/Code.gs`
4. Paste it into the Apps Script editor and save
5. Deploy as Web App:
   - Click **Deploy** → **New deployment**
   - Select type: **Web app**
   - Set "Who has access" to: **Anyone**
   - Click **Deploy** and copy the Web App URL

### 4. Set Up Environment Variables

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

2. Add your Google Apps Script Web App URL:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
Hustlify_SalesForm/
├── src/
│   ├── components/
│   │   └── Form.tsx           # Main form component
│   ├── pages/
│   │   └── FormPage.tsx       # Form page with layout
│   ├── App.tsx
│   └── main.tsx
├── google-apps-script/
│   ├── Code.gs                # Google Apps Script code
│   └── DEPLOYMENT_INSTRUCTIONS.md
├── .env.example               # Environment variables template
├── .gitignore
└── README.md
```

## Environment Variables

- `VITE_GOOGLE_SCRIPT_URL` - Your Google Apps Script Web App URL

**Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Deployment

You can deploy this app to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Remember to add your environment variables in your hosting platform's settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Contact

For questions or support, contact: careers@company.com

---

Built with ❤️ for Hustlify Sales School
