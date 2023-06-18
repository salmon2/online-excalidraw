package com.example.onlineexcalidrawback.controller;

import com.example.onlineexcalidrawback.domain.CanvasElementList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class CanvasController {

    @GetMapping("/test")
    public String testControll(@RequestParam String msg){
        log.info("test msg = {} ", msg);
        return msg;
    }

    @MessageMapping("/send/test")
    @SendTo("topic/test")
    public String testMessage(@Payload String msg){
        log.info("test = {}", msg);
        return msg;
    }


    /** ------실시간 관련-------- **/
    @MessageMapping("/send/{roomId}")
    @SendTo("/topic/{roomId}")
    public CanvasElementList sendMessage(@Payload CanvasElementList canvasElementList) {
        log.info("canvasElementList = {}", canvasElementList);
        return canvasElementList;
    }

    @MessageMapping("/send/delete/{roomId}")
    @SendTo("/topic/delete/{roomId}")
    public CanvasElementList deleteMessage(@Payload CanvasElementList canvasElementList) {
        log.info("canvasElementList = {}", canvasElementList);
        return canvasElementList;
    }

}
