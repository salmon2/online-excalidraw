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
    @SendTo("/topic/test")
    public String testMessage(@Payload String msg){
        log.info("test = {}", msg);
        return msg;
    }


    /** ------실시간 관련-------- **/
    @MessageMapping("/send/add/{roomId}")
    @SendTo("/topic/add/{roomId}")
    public CanvasElementList sendAddMessage(@Payload CanvasElementList canvasElementList) {
        log.info("add canvasElementList = {}", canvasElementList);
        return canvasElementList;
    }

    @MessageMapping("/send/remove/{roomId}")
    @SendTo("/topic/remove/{roomId}")
    public CanvasElementList sendRemoveMessage(@Payload CanvasElementList canvasElementList) {
        log.info("remove canvasElementList = {}", canvasElementList);
        return canvasElementList;
    }
    @MessageMapping("/send/move/{roomId}")
    @SendTo("/topic/move/{roomId}")
    public CanvasElementList sendMoveMessage(@Payload CanvasElementList canvasElementList) {
        log.info("move canvasElementList = {}", canvasElementList);
        return canvasElementList;
    }
}
