<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    /** @use HasFactory<\Database\Factories\EmployeeFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'station_id',
        'first_name',
        'middle_name',
        'last_name',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function station(): BelongsTo
    {
        return $this->belongsTo(Station::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'created_by');
    }

    public function completedDocuments(): HasMany
    {
        return $this->hasMany(Document::class, 'completed_by');
    }

    public function releasedMovements(): HasMany
    {
        return $this->hasMany(DocumentMovement::class, 'released_by');
    }

    public function receivedMovements(): HasMany
    {
        return $this->hasMany(DocumentMovement::class, 'received_by');
    }
}

