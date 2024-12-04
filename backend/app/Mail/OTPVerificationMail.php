<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OTPVerificationMail extends Mailable
{
    use SerializesModels;

    public $otp;
    public $fullName;

    // Constructor to pass OTP
    public function __construct($otp, $fullName)
    {
        $this->otp = $otp;
        $this->fullName = $fullName;
    }

    public function build()
    {
        return $this->subject('Your OTP Code')
            ->view('emails.otp_verification'); // Assuming you create a view called otp_verification.blade.php
    }
}
