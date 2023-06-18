package com.example.onlineexcalidrawback.domain;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class CanvasElementList {
    @Id @GeneratedValue
    private Long roomId;
    private String element;
}
