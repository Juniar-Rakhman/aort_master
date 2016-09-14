package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.RatingReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by a9jr5626 on 8/17/16.
 */
public interface RatingReferenceRepository extends CrudRepository<RatingReference, Long> {

    @Query("SELECT r FROM RatingReference r WHERE r.rating LIKE %:rating%")
    Page<RatingReference> findByRating(@Param("rating") String rating, Pageable pageable);
}
