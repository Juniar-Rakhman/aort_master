package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.CampusReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by Galih_P on 9/21/2016.
 */
public interface CampusReferenceRepository extends CrudRepository<CampusReference, Long> {

    @Query("SELECT c FROM CampusReference c WHERE c.campus LIKE %:campus%")
    Page<CampusReference> findByCampus(@Param("campus") String campus, Pageable pageable);

    @Query("SELECT c FROM CampusReference c WHERE c.active = :active")
    List<CampusReference> findByActive(@Param("active") boolean active);
}
