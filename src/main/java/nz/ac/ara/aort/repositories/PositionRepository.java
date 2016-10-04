package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.Position;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface PositionRepository extends CrudRepository<Position, String> {

    @Query("SELECT p FROM Position p WHERE p.title LIKE %:title%")
    List<Position> findByTitle(@Param("title") String title);
    
}
