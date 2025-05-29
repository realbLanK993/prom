# Gmail Setup Instructions for Celestial Ball Registration

## Prerequisites
- A Gmail account
- 2-Factor Authentication enabled on your Google account

## Step-by-Step Setup

### 1. Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to enable 2FA if not already enabled

### 2. Generate App Password
1. In Google Account Settings → Security
2. Under "Signing in to Google", click on "App passwords"
3. You may need to sign in again
4. Select "Mail" from the dropdown
5. Select "Other (Custom name)" and enter "Celestial Ball Registration"
6. Click "Generate"
7. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### 3. Environment Variables
Add these to your `.env.local` file:

\`\`\`env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
\`\`\`

**Important Notes:**
- Use your full Gmail address for `GMAIL_USER`
- Use the 16-character app password (with or without spaces) for `GMAIL_APP_PASSWORD`
- Never use your regular Gmail password
- Keep these credentials secure and never commit them to version control

### 4. Test the Configuration
1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/email-test`
3. Click "Test Email Connection"
4. You should see a success message if everything is configured correctly

### 5. Troubleshooting

**"Invalid login" error:**
- Double-check your Gmail address
- Ensure you're using the app password, not your regular password
- Make sure 2FA is enabled

**"Less secure app access" error:**
- This shouldn't happen with app passwords, but if it does:
- Go to Google Account Settings → Security
- Enable "Less secure app access" (not recommended)
- Better solution: Use app passwords as described above

**Connection timeout:**
- Check your internet connection
- Verify Gmail service is not down
- Try again after a few minutes

### 6. Email Limits
Gmail has sending limits:
- **Free Gmail accounts**: 500 emails per day
- **Google Workspace**: 2000 emails per day

For a college prom, this should be sufficient. If you need higher limits, consider:
- Using multiple Gmail accounts
- Upgrading to Google Workspace
- Using a dedicated email service like SendGrid or Mailgun

### 7. Security Best Practices
- Regularly rotate your app passwords
- Monitor your Gmail account for unusual activity
- Use environment variables for credentials
- Never hardcode credentials in your source code
- Consider using a dedicated email account for the application

## Testing Email Templates
Once configured, you can test the email system by:
1. Registering a test student with your own email as the partner
2. Check that the invitation email arrives with proper formatting
3. Complete the partner registration to test confirmation emails

## Production Deployment
When deploying to production:
1. Set the environment variables in your hosting platform
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Test the email functionality in production
4. Monitor email delivery and bounce rates
