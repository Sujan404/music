<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['address','number','zip']);
            $table->string('unit')->nullable();
            $table->string('street_number')->nullable();
            $table->string('street_name')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['unit','street_number','street_name','postal_code','state','country']);
            $table->string('address');
            $table->string('number');
            $table->string('zip');
        });
    }
};
