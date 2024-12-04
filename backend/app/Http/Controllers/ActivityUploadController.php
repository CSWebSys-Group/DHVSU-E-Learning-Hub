<?php

namespace App\Http\Controllers;

use App\Models\ActivityUpload;
use App\Http\Requests\StoreActivityUploadRequest;
use App\Http\Requests\UpdateActivityUploadRequest;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ActivityUploadController extends Controller implements HasMiddleware
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
        return response()->json(ActivityUpload::all(), 200);
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
    public function store(StoreActivityUploadRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ActivityUpload $activityUpload)
    {
        return ['activity_upload' => $activityUpload];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActivityUpload $activityUpload)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivityUploadRequest $request, ActivityUpload $activityUpload)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActivityUpload $activityUpload)
    {
        //
    }
}
