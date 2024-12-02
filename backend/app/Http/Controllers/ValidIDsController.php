<?php

namespace App\Http\Controllers;

use App\Models\ValidIDs;
use App\Http\Requests\StoreValidIDsRequest;
use App\Http\Requests\UpdateValidIDsRequest;

class ValidIDsController extends Controller
{
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
    public function store(StoreValidIDsRequest $request)
    {
        //
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
