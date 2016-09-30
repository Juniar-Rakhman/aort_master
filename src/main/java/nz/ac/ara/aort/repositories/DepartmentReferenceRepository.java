package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.DepartmentReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by Galih_P on 9/21/2016.
 */
public interface DepartmentReferenceRepository extends CrudRepository<DepartmentReference, Long> {

    @Query("SELECT d FROM DepartmentReference d WHERE d.department LIKE %:department%")
    Page<DepartmentReference> findByDepartment(@Param("department") String department, Pageable pageable);

    @Query("SELECT d FROM DepartmentReference d WHERE d.active = :active")
    List<DepartmentReference> findByActive(@Param("active") boolean active);
}
