package com.parkconnect.project_service.publisher;

import com.parkconnect.project_service.dto.ProjectDto;
import com.parkconnect.project_service.event.EventType;
import com.parkconnect.project_service.event.NotificationEvent;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProjectEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(ProjectEventPublisher.class);
    private static final String TOPIC = "project-events";

    private final KafkaTemplate<String, NotificationEvent> kafkaTemplate;

    public void publishProjectCreated(ProjectDto project, String userId) {
        publish(EventType.PROJECT_CREATED, project.getProjectId().toString(), project, userId);
    }

    public void publishProjectUpdated(ProjectDto project, String userId) {
        publish(EventType.PROJECT_UPDATED, project.getProjectId().toString(), project, userId);
    }

    public void publishProjectDeleted(Integer projectId, String userId) {
        publish(EventType.PROJECT_DELETED, projectId.toString(), projectId, userId);
    }

    private void publish(String eventType, String entityId, Object payload, String userId) {
        NotificationEvent event = new NotificationEvent(
                UUID.randomUUID().toString(),
                eventType,
                entityId,
                "PROJECT",
                userId,
                payload,
                Instant.now()
        );
        kafkaTemplate.send(TOPIC, entityId, event);
        log.info("Published event: {} for entityId: {}", eventType, entityId);
    }
}
