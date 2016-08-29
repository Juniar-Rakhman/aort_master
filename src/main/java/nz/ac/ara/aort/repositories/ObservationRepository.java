package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.Observation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface ObservationRepository extends JpaRepository<Observation, Long> {
    List<Observation> findByStaffId(@Param("staffId") String staffId, Pageable pageable);
    List<Observation> findByDateBetween(@Param("after") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date after, @Param("before") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date before, Pageable pageable);
    List<Observation> findByObserverPrimaryId(@Param("observerPrimaryId") String observerPrimaryId, Pageable pageable);
    List<Observation> findByObserverSecondaryId(@Param("observerSecondaryId") String observerSecondaryId, Pageable pageable);
    List<Observation> findByLineManagerId(@Param("lineManagerId") String lineManagerId, Pageable pageable);
    List<Observation> findByHodId(@Param("hodId") String hodId, Pageable pageable);
    List<Observation> findByModeratorId(@Param("moderatorId") String moderatorId, Pageable pageable);
    List<Observation> findByLearningCoachId(@Param("learningCoachId") String learningCoachId, Pageable pageable);

    @Query("SELECT o FROM Observation o WHERE o.courseName like %:courseName%")
    List<Observation> findByCourseName(@Param("courseName") String courseName, Pageable pageable);
}
