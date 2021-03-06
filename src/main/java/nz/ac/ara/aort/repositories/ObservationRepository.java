package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.Observation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface ObservationRepository extends CrudRepository<Observation, Long> {
    List<Observation> findByStaffId(@Param("staffId") String staffId);
    
    @Query("SELECT o FROM Observation o WHERE o.courseName like %:courseName%")
    List<Observation> findByCourseName(@Param("courseName") String courseName);
}
