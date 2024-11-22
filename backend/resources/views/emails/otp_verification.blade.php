<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f7fc; padding: 20px; }
        .email-container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; padding: 20px; }
        .header { text-align: center; font-size: 24px; color: #da6b3f; font-weight: bold; }
        .content { text-align: center; font-size: 18px; padding-top: 10px; color: #333; }
        .otp { font-size: 30px; font-weight: bold; color: #da6b3f; }
        .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Your OTP Code</div>
        <div class="content">
            <p>Hello, Your One-Time Password (OTP) is:</p>
            <p class="otp">{{ $otp }}</p>
            <p>This OTP is valid for the next 5 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
