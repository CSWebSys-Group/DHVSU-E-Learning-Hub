<?php

namespace App\Http\Controllers;

use App\Models\ActivityDeadline;
use App\Http\Requests\StoreActivityDeadlineRequest;
use App\Http\Requests\UpdateActivityDeadlineRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ActivityDeadlineController extends Controller implements HasMiddleware
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
        return response()->json(ActivityDeadline::all(), 200);
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
    public function store(StoreActivityDeadlineRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ActivityDeadline $activityDeadline)
    {
        return ['activity_deadline' => $activityDeadline];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActivityDeadline $activityDeadline)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivityDeadlineRequest $request, ActivityDeadline $activityDeadline)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActivityDeadline $activityDeadline)
    {
        //
    }

    public function getActivityDeadline(Request $request)
    {
        $request->validate(['id' => 'required|integer']);

        $activityDeadline = ActivityDeadline::where('id', $request->id)->first();

        if (!$activityDeadline) {
            return response()->json(['message' => 'Cannot find the deadline']);
        }

        return ['activity_deadline' => $activityDeadline];
    }
}
