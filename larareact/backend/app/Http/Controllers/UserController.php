<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;

class UserController extends Controller
{
    //
    public function index()
    {
        return response()->json(User::all(), Response::HTTP_OK);
    }

    // Store a new user and calculate result
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|regex:/^[a-zA-Z\s]+$/',
        ]);

        $user = User::create([
            'full_name' => $request->full_name,
            'calculated_value' => $request->calculated_value,
        ]);
        
        return response()->json(['message' => 'Successfully created', 'user' => $user], Response::HTTP_OK);
    }

    // Update user name (result stays the same)
    public function update(Request $request, $id)
    {
        $request->validate([
            'full_name' => 'required|string|regex:/^[a-zA-Z\s]+$/',
        ]);

        $user = User::findOrFail($id);
        $user->update(['full_name' => $request->full_name]);

        return response()->json($user, Response::HTTP_OK);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], Response::HTTP_OK);
    }
}
