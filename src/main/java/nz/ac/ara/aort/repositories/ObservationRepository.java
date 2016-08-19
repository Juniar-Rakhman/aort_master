package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.Observation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface ObservationRepository extends JpaRepository<Observation, Long> {
    List<Observation> findByStaff(@Param("staff") String staff);
    List<Observation> findByDateBetween(@Param("after") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date after, @Param("before") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date before);
    List<Observation> findByObserverPrimary(@Param("observerPrimary") String observerPrimary);
}
