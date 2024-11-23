<?php

namespace App\Http\Controllers;

use App\Mail\OTPVerificationMail;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

class OTPController extends Controller
{
    // Method to generate and send OTP
    public function sendOtpSignup(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $emailExists = User::where('email', $request->email)->exists();

        if ($emailExists) {
            return response()->json(['errors' => [
                'email_exists' => ['Email is already used.']
            ]], 400);
        }

        $otp = Str::random(6); // Generate a random 6-digit OTP

        // Store OTP in database with expiration time (e.g., 5 minutes)
        $otpRecord = Otp::updateOrCreate(
            ['email' => $request->email],
            ['otp' => $otp, 'expires_at' => Carbon::now()->addMinutes(5)]
        );

        // Send OTP via email using Mailable
        Mail::to($request->email)->send(new OTPVerificationMail($otp));

        return response()->json([
            'message' => 'OTP sent successfully!',
        ], 200);
    }

    // Method to verify OTP
    public function verifyOTP(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
        ]);

        $otpRecord = Otp::where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$otpRecord) {
            return response()->json(['message' => 'Invalid OTP!'], 400);
        }

        // Check if OTP is expired
        if (Carbon::now()->gt($otpRecord->expires_at)) {
            return response()->json(['message' => 'OTP has expired!'], 400);
        }

        // OTP is valid and not expired, now delete the OTP record
        $otpRecord->delete(); // Delete OTP after successful verification

        return response()->json(['message' => 'OTP verified successfully!'], 200);
    }
}
