interface PartnerInvitationEmailProps {
  studentName: string
  partnerName?: string
  confirmationUrl: string
}

export function getPartnerInvitationEmailTemplate({
  studentName,
  confirmationUrl,
}: PartnerInvitationEmailProps) {
  return {
    subject: "🎭 You're Invited to the Celestial Ball!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Celestial Ball Invitation</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              line-height: 1.6;
              color: #333;
              background: linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%);
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(255, 255, 255, 0.95);
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #ffd43b, #ffbe0b);
              padding: 40px 30px;
              text-align: center;
              color: #1e293b;
            }
            .header h1 {
              margin: 0;
              font-size: 2.5em;
              font-weight: bold;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            }
            .content {
              padding: 40px 30px;
              background: #fff;
            }
            .invitation-text {
              font-size: 1.2em;
              margin-bottom: 30px;
              text-align: center;
              color: #4a5568;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #ffd43b, #ffbe0b);
              color: #1e293b;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              font-size: 1.1em;
              margin: 20px 0;
              box-shadow: 0 4px 15px rgba(255, 212, 59, 0.4);
              transition: transform 0.2s;
            }
            .cta-button:hover {
              transform: translateY(-2px);
            }
            .details {
              background: #f7fafc;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #ffd43b;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #718096;
              font-size: 0.9em;
              background: #f7fafc;
            }
            .stars {
              color: #ffd43b;
              font-size: 1.2em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="stars">✨ 🎭 ✨</div>
              <h1>Celestial Ball</h1>
              <p style="margin: 10px 0 0 0; font-size: 1.2em;">An Evening of Enchantment & Mystery</p>
            </div>
            
            <div class="content">
              <div class="invitation-text">
                <p><strong>${studentName}</strong> has invited you to be their partner for the most magical night of the year!</p>
                <p>You're cordially invited to join the <strong>Celestial Ball</strong> - an evening of elegance, mystery, and unforgettable memories.</p>
              </div>
              
              <div style="text-align: center;">
                <a href="${confirmationUrl}" class="cta-button">
                  🎭 Accept Your Invitation
                </a>
              </div>
              
              <div class="details">
                <h3 style="margin-top: 0; color: #2d3748;">What to Expect:</h3>
                <ul style="color: #4a5568;">
                  <li>🌟 Elegant masquerade ball atmosphere</li>
                  <li>🍽️ Exquisite dinner and refreshments</li>
                  <li>💃 Dancing under the stars</li>
                  <li>📸 Professional photography</li>
                  <li>🎁 Memorable keepsakes</li>
                </ul>
              </div>
              
              <p style="color: #718096; font-size: 0.95em; text-align: center;">
                <strong>Important:</strong> This invitation link is unique to you and expires in 7 days. 
                Please complete your registration as soon as possible to secure your spot.
              </p>
            </div>
            
            <div class="footer">
              <p>Questions? Contact us at events@college.edu</p>
              <div class="stars">✨ ⭐ ✨</div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      🎭 You're Invited to the Celestial Ball!
      
      ${studentName} has invited you to be their partner for the most magical night of the year!
      
      You're cordially invited to join the Celestial Ball - an evening of elegance, mystery, and unforgettable memories.
      
      Accept your invitation: ${confirmationUrl}
      
      What to Expect:
      - Elegant masquerade ball atmosphere
      - Exquisite dinner and refreshments  
      - Dancing under the stars
      - Professional photography
      - Memorable keepsakes
      
      This invitation link is unique to you and expires in 7 days. Please complete your registration as soon as possible.
      
      Questions? Contact us at events@college.edu
    `,
  }
}

interface RegistrationConfirmationEmailProps {
  studentName: string
  partnerName: string
  registrationId: string
}

export function getRegistrationConfirmationEmailTemplate({
  studentName,
  partnerName,
  registrationId,
}: RegistrationConfirmationEmailProps) {
  return {
    subject: "🎉 Celestial Ball Registration Confirmed!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Confirmed</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              line-height: 1.6;
              color: #333;
              background: linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%);
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(255, 255, 255, 0.95);
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #10b981, #059669);
              padding: 40px 30px;
              text-align: center;
              color: white;
            }
            .content {
              padding: 40px 30px;
              background: #fff;
            }
            .confirmation-box {
              background: #f0fdf4;
              border: 2px solid #10b981;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .details {
              background: #f7fafc;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Registration Confirmed!</h1>
              <p>Welcome to the Celestial Ball</p>
            </div>
            
            <div class="content">
              <div class="confirmation-box">
                <h2 style="color: #059669; margin-top: 0;">You're All Set!</h2>
                <p><strong>${studentName}</strong> and <strong>${partnerName}</strong></p>
                <p>Registration ID: <code>${registrationId}</code></p>
              </div>
              
              <div class="details">
                <h3>Event Details:</h3>
                <ul>
                  <li><strong>Date:</strong> [Event Date]</li>
                  <li><strong>Time:</strong> [Event Time]</li>
                  <li><strong>Venue:</strong> [Event Venue]</li>
                  <li><strong>Dress Code:</strong> Formal/Semi-Formal with Masquerade Masks</li>
                </ul>
              </div>
              
              <p>More details including venue directions, parking information, and event schedule will be sent closer to the date.</p>
              
              <p style="text-align: center; color: #718096;">
                We can't wait to see you at the Celestial Ball! ✨
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  }
}
