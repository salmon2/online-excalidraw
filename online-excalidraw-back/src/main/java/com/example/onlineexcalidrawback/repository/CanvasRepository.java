package com.example.onlineexcalidrawback.repository;


import com.example.onlineexcalidrawback.domain.CanvasElementList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CanvasRepository extends JpaRepository<CanvasElementList, Long> {


}
