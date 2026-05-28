package com.parkconnect.notification_service.sink;

import com.parkconnect.notification_service.model.NotificationEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Slf4j
@Component
public class NotificationSink {

    private final Sinks.Many<NotificationEvent> sink = Sinks.many()
            .multicast()
            .onBackpressureBuffer();

    public void emit(NotificationEvent event) {
        Sinks.EmitResult result = sink.tryEmitNext(event);
        if (result.isFailure()) {
            log.warn("Failed to emit notification event: {}, result: {}",
                    event.getEventType(), result);
        } else {
            log.debug("Emitted event to sink: {}", event.getEventType());
        }
    }

    public Flux<NotificationEvent> asFlux() {
        return sink.asFlux();
    }
}
