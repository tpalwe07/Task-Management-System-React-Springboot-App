package com.parkconnect.project_service.event;

import java.time.Instant;

public record NotificationEvent(
        String eventId,        // UUID
        String eventType,      // PROJECT_CREATED, TASK_UPDATED, etc.
        String entityId,       // projectId or taskId
        String entityType,     // PROJECT or TASK
        String triggeredBy,    // userId from X-User-Id header
        Object payload,        // the full DTO
        Instant timestamp
) {}
