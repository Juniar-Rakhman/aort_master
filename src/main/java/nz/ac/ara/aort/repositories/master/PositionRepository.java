package nz.ac.ara.aort.repositories.master;

import nz.ac.ara.aort.entities.master.Position;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface PositionRepository extends JpaRepository<Position, String> {
    
}
