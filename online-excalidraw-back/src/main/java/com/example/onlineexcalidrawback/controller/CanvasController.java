package com.example.onlineexcalidrawback.controller;

import com.example.onlineexcalidrawback.domain.CanvasElementList;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CanvasController {


    /** ------실시간 관련-------- **/
    @MessageMapping("/send/{roomId}")
    @SendTo("/topic/{roomId}")
    public CanvasElementList sendMessage(@Payload CanvasElementList canvasElementList) {
        return canvasElementList;
    }

    @MessageMapping("/send/delete/{roomId}")
    @SendTo("/topic/delete/{roomId}")
    public CanvasElementList deleteMessage(@Payload CanvasElementList canvasElementList) {
        return canvasElementList;
    }

}
