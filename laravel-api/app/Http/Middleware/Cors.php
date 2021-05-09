<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Origin: Content-type, X-Auth-Token, Authorization, Origin');
        // header('Access-Control-Allow-Origin: Origin');
        // header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, X-Auth-Token');
        
        
        return $next($request);
    }
}
