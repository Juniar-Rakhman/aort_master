package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.Position;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface PositionRepository extends JpaRepository<Position, String> {

    @Query("SELECT p FROM Position p WHERE p.title LIKE %:title%")
    Page<Position> findByTitle(@Param("title") String title, Pageable pageable);
    
}