<?php

namespace App\Http\Livewire;

use App\Models\User;
use Illuminate\Contracts\Container\Container;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Livewire\Component;

class Profile extends Component
{
    
    public User $user;
    public $showSavedAlert = false;
    public $showDemoNotification = false;


    public function __construct()
    {
        $this->user = auth()->user();
    }
    public function rules() {

        return [
            'user.first_name' => 'max:15',
            'user.last_name' => 'max:20',
            'user.email' => 'email',
            'user.gender' => [ Rule::in(['Male', 'Female', 'Other'])],
            'user.unit' => 'string',
            'user.street_number' => 'string',
            'user.street_name' => 'string',
            'user.postal_code' => 'string',
            'user.city' => 'string',
            'user.country' => 'string',
            'user.state' => 'string'
        ];
    }

    public function mount() {
    
        $this->user = auth()->user();
    dd($this->user); }

    public function save()
    {
        if(env('IS_DEMO')) {
            $this->showDemoNotification = true;
        }
        else {
        $this->validate();

        $this->user->save();

        $this->showSavedAlert = true;
        }
    }

    public function render()
    {
        return view('livewire.profile');
    }
    public function update(Request $request){
        $this->validate();

        $this->user->save();
    }
}
