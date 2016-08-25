package nz.ac.ara.aort.repositories.master;

import nz.ac.ara.aort.entities.master.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface StaffRepository extends CrudRepository<Staff, String> {
    
    @Query(value = "SELECT s FROM Staff s WHERE s.lastName like '%name%' or s.firstName = '%name%'")
    List<Staff> findByStaffName(@Param("staffName") String name);
    
    Staff findByUsername(@Param("username") String username);
}
