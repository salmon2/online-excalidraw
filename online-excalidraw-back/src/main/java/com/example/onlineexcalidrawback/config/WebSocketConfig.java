package com.example.onlineexcalidrawback.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // with Sock.js
        /*registry.addEndpoint("/ws.message").setAllowedOrigins("*").withSockJS();*/
        registry.addEndpoint("/ws-message").setAllowedOriginPatterns("*").withSockJS();

        log.info("Here is WebSocket Domain");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(160 * 64 * 1024); // default : 64 * 1024
        registration.setSendTimeLimit(100 * 10000); // default : 10 * 10000
        registration.setSendBufferSizeLimit(3* 512 * 1024); // default : 512 * 1024
    }
}
