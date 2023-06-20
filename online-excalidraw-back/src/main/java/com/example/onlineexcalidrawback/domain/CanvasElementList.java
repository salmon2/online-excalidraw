package com.example.onlineexcalidrawback.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class CanvasElementList {
    @Id @GeneratedValue
    private Long roomId;
    @Column(length = 65535)
    private String element;
}
