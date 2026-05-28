package com.parkconnect.notification_service.controller;

import com.parkconnect.notification_service.model.NotificationEvent;
import com.parkconnect.notification_service.sink.NotificationSink;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@Slf4j
@RestController
@RequestMapping("/v1/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationSink notificationSink;

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<NotificationEvent>> streamNotifications(
            @RequestHeader(value = "X-User-Id", required = false) String userId) {

        log.info("SSE client connected: userId={}", userId);

        return notificationSink.asFlux()
                .doOnCancel(() -> log.info("SSE client disconnected: userId={}", userId))
                .map(event -> ServerSentEvent.<NotificationEvent>builder()
                        .id(event.getEventId())
                        .event(event.getEventType())
                        .data(event)
                        .build());
    }

    @GetMapping("/health")
    public String health() {
        return "Notification service is running";
    }
}
