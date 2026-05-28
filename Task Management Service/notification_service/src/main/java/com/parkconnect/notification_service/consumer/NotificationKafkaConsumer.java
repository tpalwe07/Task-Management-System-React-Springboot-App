package com.parkconnect.notification_service.consumer;

import com.parkconnect.notification_service.model.NotificationEvent;
import com.parkconnect.notification_service.sink.NotificationSink;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationKafkaConsumer {

    private static final Logger log = LoggerFactory.getLogger(NotificationKafkaConsumer.class);
    private final NotificationSink notificationSink;

    // Add this — runs on startup to confirm bean is created
    @PostConstruct
    public void init() {
        log.info("NotificationKafkaConsumer initialized and listening on project-events and task-events");
    }

    @KafkaListener(
            topics = "project-events",
            groupId = "notification-group"
//            containerFactory = "kafkaListenerContainerFactory"  // ← explicitly reference our factory
    )
    public void consumeProjectEvent(NotificationEvent event) {
        log.info("========== KAFKA EVENT RECEIVED ==========");
        log.info("Consumed project event: type={}, entityId={}",
                event.getEventType(), event.getEntityId());
        notificationSink.emit(event);
    }

    @KafkaListener(
            topics = "task-events",
            groupId = "notification-group"
//            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consumeTaskEvent(NotificationEvent event) {
        log.info("Consumed task event: type={}, entityId={}",
                event.getEventType(), event.getEntityId());
        notificationSink.emit(event);
    }
}
