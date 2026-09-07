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
        Schema::create('document_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_id')->constrained()->cascadeOnDelete();
            $table->foreignId('from_station_id')->constrained('stations')->restrictOnDelete();
            $table->foreignId('to_station_id')->constrained('stations')->restrictOnDelete();
            $table->foreignId('released_by')->constrained('employees')->restrictOnDelete();
            $table->foreignId('received_by')->nullable()->constrained('employees')->restrictOnDelete();
            $table->timestamp('released_at');
            $table->timestamp('received_at')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();

            $table->index(['to_station_id', 'received_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_movements');
    }
};
