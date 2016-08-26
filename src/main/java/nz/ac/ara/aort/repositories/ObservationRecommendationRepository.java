package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.ObservationRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by Galih_P on 8/25/2016.
 */
public interface ObservationRecommendationRepository extends JpaRepository<ObservationRecommendation, Long> {
}
