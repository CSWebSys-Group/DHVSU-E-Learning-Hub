<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OTPVerificationMail extends Mailable
{
    use SerializesModels;

    public $otp;

    // Constructor to pass OTP
    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    public function build()
    {
        return $this->subject('Your OTP Code')
            ->view('emails.otp_verification'); // Assuming you create a view called otp_verification.blade.php
    }
}
