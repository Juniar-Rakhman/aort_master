package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.Observation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface ObservationRepository extends JpaRepository<Observation, Long> {
    
}
