<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LoginController extends Controller
{
    
    /**
     * Validates and Authenticates login
     * 
     * @param Request 
     * @return JsonResponse with autenticaded user
     */
    public function login(Request $request) {
        
        // Validating login parameters
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Get User login of Database
        $user = User::where('email', $data['email'])->first();

        // Checking credentials
        if (!$user || !Hash::check( $data['password'], $user->password ) ) {
            return response()->json( ['message' => 'Credenciais inválidas'], 401 );
        }

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ],
        ]);
    }
}
