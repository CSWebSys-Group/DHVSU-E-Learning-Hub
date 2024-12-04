<?php

namespace App\Http\Controllers;

use App\Models\ActivitySubmission;
use App\Http\Requests\StoreActivitySubmissionRequest;
use App\Http\Requests\UpdateActivitySubmissionRequest;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ActivitySubmissionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ActivitySubmission::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActivitySubmissionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ActivitySubmission $activitySubmission)
    {
        return ['activity_submission' => $activitySubmission];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActivitySubmission $activitySubmission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivitySubmissionRequest $request, ActivitySubmission $activitySubmission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActivitySubmission $activitySubmission)
    {
        //
    }
}
