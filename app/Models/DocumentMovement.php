<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentMovement extends Model
{
    /** @use HasFactory<\Database\Factories\DocumentMovementFactory> */
    use HasFactory;

    protected $fillable = [
        'document_id',
        'from_station_id',
        'to_station_id',
        'released_by',
        'received_by',
        'released_at',
        'received_at',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'released_at' => 'datetime',
            'received_at' => 'datetime',
        ];
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function fromStation(): BelongsTo
    {
        return $this->belongsTo(Station::class, 'from_station_id');
    }

    public function toStation(): BelongsTo
    {
        return $this->belongsTo(Station::class, 'to_station_id');
    }

    public function releasedBy(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'released_by');
    }

    public function receivedBy(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'received_by');
    }
}

