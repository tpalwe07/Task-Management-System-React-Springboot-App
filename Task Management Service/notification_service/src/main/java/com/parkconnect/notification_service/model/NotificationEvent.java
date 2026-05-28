package com.parkconnect.notification_service.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)  // ✅ won't break if publisher adds new fields
public class NotificationEvent {
    private String eventId;
    private String eventType;
    private String entityId;
    private String entityType;
    private String triggeredBy;
    private Object payload;
    private Instant timestamp;
}