package nz.ac.ara.aort.repositories.master;

import nz.ac.ara.aort.entities.master.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface StaffRepository extends JpaRepository<Staff, String> {

    @Query("SELECT s FROM Staff s WHERE (s.firstName + ' ' + s.lastName) like %:name% ORDER BY s.firstName, s.lastName")
    Page<Staff> findByStaffName(@Param("name") String name, Pageable pageable);
    Staff findByUsername(@Param("username") String username);
}
