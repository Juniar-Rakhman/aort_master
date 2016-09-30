package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.SessionReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by Galih_P on 9/21/2016.
 */
public interface SessionReferenceRepository extends CrudRepository<SessionReference, Long> {

    @Query("SELECT s FROM SessionReference s WHERE s.session LIKE %:session%")
    Page<SessionReference> findBySession(@Param("session") String session, Pageable pageable);

    @Query("SELECT s FROM SessionReference s WHERE s.active = :active")
    List<SessionReference> findByActive(@Param("active") boolean active);
}
