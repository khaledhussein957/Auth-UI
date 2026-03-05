export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>

<body style="margin:0; padding:20px; background:#ffffff; font-family:Arial, Helvetica, sans-serif; color:#000000; line-height:1.6;">

  <div style="max-width:600px; margin:0 auto;">

    <div style="background:#0ea5e9; padding:24px; text-align:center; border-radius:8px 8px 0 0;">
      <h1 style="margin:0; color:#ffffff; font-size:24px;">
        Verify Your Email
      </h1>
    </div>

    <div style="background:#f8fafc; padding:30px; border-radius:0 0 8px 8px; border:1px solid #e5e7eb;">

      <p>Hello,</p>

      <p>Thanks for signing up! Use the verification code below to confirm your email address.</p>

      <div style="text-align:center; margin:30px 0;">
        <span style="display:inline-block; background:#ffffff; border:2px dashed #0ea5e9; padding:16px 24px; font-size:32px; font-weight:bold; letter-spacing:6px; color:#0ea5e9; border-radius:6px; ">
          {verificationCode}
        </span>
      </div>

      <p style="text-align:center;">
        This code will expire in <strong>{expirationTime}</strong>.
      </p>

      <p>If you did not create an account, you can safely ignore this email.</p>

      <p style="margin-top:30px;">
        Best regards,<br>
        <strong>Your App Team</strong>
      </p>

    </div>

    <div style="text-align:center; margin-top:20px; font-size:12px; color:#6b7280;">
      <p>This is an automated message, please do not reply.</p>
    </div>

  </div>

</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>

<body style="margin:0; padding:20px; background:#ffffff; font-family:Arial, Helvetica, sans-serif; color:#000000; line-height:1.6;">
  <div style="max-width:600px; margin:0 auto;">
    <div style="background:#0ea5e9; padding:24px; text-align:center; border-radius:8px 8px 0 0;">
      <h1 style="margin:0; color:#ffffff;">Password Reset</h1>
    </div>
    <div style="background:#f8fafc; padding:30px; border-radius:0 0 8px 8px; border:1px solid #e5e7eb;">

      <p>Hello,</p>

      <p>We received a request to reset your password.</p>

      <p>Use the code below to reset your password:</p>

    <div style="text-align:center; margin:30px 0;">
      <span style="display:inline-block; background:#ffffff; border:2px dashed #0ea5e9; padding:16px 24px; font-size:32px; font-weight:bold; letter-spacing:6px; color:#0ea5e9; border-radius:6px; ">
        {resetCode}
      </span>
    </div>

    <p style="text-align:center;">
      This code will expire in <strong>{expirationTime}</strong>.
    </p>

    <p>If you didn't request a password reset, you can safely ignore this email.</p>
  
    <p style="margin-top:30px;">
      Best regards,<br>
      <strong>Your App Team</strong>
      </p>

  </div>

  <div style="text-align:center; margin-top:20px; font-size:12px; color:#6b7280;">
    <p>This is an automated message, please do not reply.</p>
  </div>

</div>

</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>

<body style="margin:0; padding:20px; background:#ffffff; font-family:Arial, Helvetica, sans-serif; color:#000000; line-height:1.6;">

  <div style="max-width:600px; margin:0 auto;">

    <div style="background:#0ea5e9; padding:24px; text-align:center; border-radius:8px 8px 0 0;">
      <h1 style="margin:0; color:#ffffff;">Password Reset Successful</h1>
    </div>

    <div style="background:#f8fafc; padding:30px; border-radius:0 0 8px 8px; border:1px solid #e5e7eb;">

      <p>Hello,</p>

      <p>Your password has been successfully reset.</p>

      <div style="text-align:center; margin:30px 0;">
        <div style=" background:#0ea5e9; color:white; width:60px; height:60px; line-height:60px; border-radius:50%; display:inline-block; font-size:30px; font-weight:bold; ">
          ✓
        </div>
      </div>

      <p>If you did not initiate this password reset, please contact support immediately.</p>

      <p>For better security we recommend:</p>

      <ul>
        <li>Use a strong unique password</li>
        <li>Enable two-factor authentication</li>
        <li>Avoid reusing passwords across sites</li>
      </ul>

      <p style="margin-top:30px;">
        Best regards,<br>
        <strong>Your App Team</strong>
      </p>

    </div>

    <div style="text-align:center; margin-top:20px; font-size:12px; color:#6b7280;">
      <p>This is an automated message, please do not reply.</p>
    </div>

  </div>

</body>
</html>
`;
