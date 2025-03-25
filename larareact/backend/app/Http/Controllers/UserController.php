<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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

        // Example calculation (sum of ASCII values of characters)
        $result = array_sum(array_map('ord', str_split($request->full_name)));

        $user = User::create([
            'full_name' => $request->full_name,
            'calculated_value' => $result,
        ]);

        return response()->json($user, Response::HTTP_CREATED);
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
