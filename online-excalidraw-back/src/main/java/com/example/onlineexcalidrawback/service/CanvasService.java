package com.example.onlineexcalidrawback.service;

import com.example.onlineexcalidrawback.domain.CanvasElementList;
import com.example.onlineexcalidrawback.repository.CanvasRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CanvasService {
    private final CanvasRepository canvasRepository;

    public CanvasElementList saveCanvas(CanvasElementList canvasElementList){
        CanvasElementList savedCanvasElementList = canvasRepository.save(canvasElementList);
        return savedCanvasElementList;
    }


    public CanvasElementList findCanvas(Long roomId) {
        CanvasElementList findCanvasElementList =
                canvasRepository.findById(roomId).orElseThrow(
                        () -> new IllegalArgumentException("no such data")
                );

        return findCanvasElementList;
    }
}
