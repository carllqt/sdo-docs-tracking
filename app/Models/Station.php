<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Station extends Model
{
    /** @use HasFactory<\Database\Factories\StationFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'school_code',
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function originDocuments(): HasMany
    {
        return $this->hasMany(Document::class, 'origin_station_id');
    }

    public function currentDocuments(): HasMany
    {
        return $this->hasMany(Document::class, 'current_station_id');
    }

    public function outgoingMovements(): HasMany
    {
        return $this->hasMany(DocumentMovement::class, 'from_station_id');
    }

    public function incomingMovements(): HasMany
    {
        return $this->hasMany(DocumentMovement::class, 'to_station_id');
    }
}

