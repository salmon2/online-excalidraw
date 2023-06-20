package com.example.onlineexcalidrawback.controller;

import com.example.onlineexcalidrawback.domain.CanvasElementList;
import com.example.onlineexcalidrawback.service.CanvasService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CanvasController {

    private final CanvasService canvasService;

    /** controller test  */
    @GetMapping("/test")
    public String testControll(@RequestParam String msg){
        log.info("test msg = {} ", msg);
        return msg;
    }

    /** socket test  */
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

    /**
     * CRUD
     */

    @PostMapping("/canvas")
    public CanvasElementList saveCanvas(@RequestBody CanvasElementList canvasElementList) {
        canvasService.saveCanvas(canvasElementList);


        return canvasElementList;

    }
}
