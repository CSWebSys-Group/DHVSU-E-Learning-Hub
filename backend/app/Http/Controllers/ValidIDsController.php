<?php

namespace App\Http\Controllers;

use App\Models\ValidIDs;
use App\Http\Requests\StoreValidIDsRequest;
use App\Http\Requests\UpdateValidIDsRequest;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class ValidIDsController extends Controller implements HasMiddleware
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
        return ValidIDs::all();
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
    public function store(Request $request)
    {
        $user = Auth::user();
        $teacher = Teacher::where('id', $user->id)->first();

        if (!$user || !$teacher || !$teacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 400);
        }

        $fields = $request->validate([
            'id' => 'required|integer|unique:valid_i_ds',
            'user_type' => 'required|string|in:S,T'
        ]);

        $validID = ValidIDs::create($fields);

        return ['validID' => $validID];
    }

    /**
     * Display the specified resource.
     */
    public function show(ValidIDs $validIDs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ValidIDs $validIDs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateValidIDsRequest $request, ValidIDs $validIDs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ValidIDs $validIDs)
    {
        //
    }
}
