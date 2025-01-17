package com.example.backend.repositories;

import com.example.backend.entities.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<Class,Integer> {
    @Query("SELECT c FROM classes c JOIN c.students s WHERE s.id = :userId")
    List<Class> findTop5ByUserId(@Param("userId") Integer userId);

    @Query("SELECT c FROM classes c JOIN c.students s WHERE c.owner = :userId")
    List<Class> findTop5ByOwner(@Param("userId") Integer userId);

    @Query("SELECT c FROM classes c JOIN c.students s WHERE s.id = :userId")
    List<Class> findClassesByUserId(@Param("userId") Integer userId);

    @Query("SELECT c FROM classes c JOIN c.books b WHERE b.id = :bookId")
    Class findClassByBookId(@Param("bookId") Integer bookId);

    Class findClassByCode(String code);

    List<Class> findClassesByOwner(int userId);
}
