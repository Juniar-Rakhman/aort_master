package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
    UserRole findByStaffId(@Param("staffId") String staffId);
}
