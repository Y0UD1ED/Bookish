package com.example.backend.repositories;

import com.example.backend.entities.Shelf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShelfRepository extends JpaRepository<Shelf,Integer> {
    List<Shelf> findTop5ByOwner(int owner);
    List<Shelf> findShelfsByOwner(int owner);
}
