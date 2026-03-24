package com.example.customerapi.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

/**
 * Application configuration and startup logging.
 * Provides a clear signal in the logs when the context is fully wired,
 * useful for demo verification and future config bean registration.
 */
@Configuration
public class AppConfig {

    private static final Logger log = LoggerFactory.getLogger(AppConfig.class);

    @EventListener(ContextRefreshedEvent.class)
    public void onStartup() {
        log.info("==============================================");
        log.info("  Customer API started — generated from intent");
        log.info("  Endpoints:");
        log.info("    GET /api/customers");
        log.info("    GET /api/customers/{id}");
        log.info("==============================================");
    }
}
