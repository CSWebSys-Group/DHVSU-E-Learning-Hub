<?php

namespace App\Http\Controllers;

use App\Models\ClassroomUpload;
use App\Http\Requests\StoreClassroomUploadRequest;
use App\Http\Requests\UpdateClassroomUploadRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class ClassroomUploadController extends Controller implements HasMiddleware
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
        return response()->json(ClassroomUpload::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::where('id', Auth::id())->first();

        if ($user->type !== 'T') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'type' => 'required|string|in:module,activity',
            'subject_id' => 'required|integer'
        ]);

        $classroomUpload = ClassroomUpload::create($fields);

        return ['classroom_upload' => $classroomUpload];
    }

    /**
     * Display the specified resource.
     */
    public function show(ClassroomUpload $classroomUpload)
    {
        return ['classroom_upload' => $classroomUpload];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ClassroomUpload $classroomUpload)
    {
        $user = User::where('id', Auth::id())->first();

        if ($user->type !== 'T') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'type' => 'required|string|in:module,activity',
            'subject_id' => 'required|integer'
        ]);

        $classroomUpload->update($fields);

        return ['classroom_upload' => $classroomUpload];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClassroomUpload $classroomUpload)
    {
        //
    }
}
