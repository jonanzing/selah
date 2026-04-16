# Google Apps Script Waitlist Backend

Follow these steps to set up your waitlist backend using Google Sheets and Google Apps Script.

## 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.new).
2. Rename the sheet to `Waitlist`.
3. In the first row, add the following headers:
   - **A1**: Timestamp
   - **B1**: Name
   - **C1**: Email
   - **D1**: Platform

## 2. Open Script Editor
1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any existing code and paste the code below.

## 3. The Code

```javascript
/**
 * Google Apps Script for Bible App Waitlist
 * Handles POST requests from the website, stores data in Sheets, 
 * and sends confirmation emails.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const timestamp = new Date();
    const name = data.name || "N/A";
    const email = data.email;
    const platform = data.platform || "iOS";
    
    // 1. Append to Google Sheet
    sheet.appendRow([timestamp, name, email, platform]);
    
    // 2. Send Admin Notification
    const adminEmail = Session.getEffectiveUser().getEmail();
    MailApp.sendEmail({
      to: adminEmail,
      subject: "New Waitlist Signup: " + email,
      body: `New signup details:\n\nName: ${name}\nEmail: ${email}\nPlatform: ${platform}\nTime: ${timestamp}`
    });
    
    // 3. Send User Confirmation
    MailApp.sendEmail({
      to: email,
      subject: "You're on the Early Access List",
      body: `Hi ${name === "N/A" ? "there" : name},\n\nThank you for joining the Selah early access list! We're excited to have you.\n\nWe'll notify you as soon as the app is ready for your ${platform} device.\n\nStay tuned!\n\nThe Selah Team`
    });
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 4. Deploy as Web App
1. Click the **Deploy** button > **New deployment**.
2. Select type: **Web app**.
3. Description: `Waitlist API`.
4. Execute as: **Me**.
5. Who has access: **Anyone**.
6. Click **Deploy**.
7. **Copy the Web App URL**.

## 5. Connect to Website
1. Go to your project settings in AI Studio.
2. Add a new secret/environment variable:
   - Key: `VITE_GOOGLE_SCRIPT_URL`
   - Value: `[PASTE_YOUR_URL_HERE]`
3. Restart the dev server or redeploy your app.
