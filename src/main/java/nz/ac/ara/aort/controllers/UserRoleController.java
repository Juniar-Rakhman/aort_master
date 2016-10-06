package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
@RestController
public class UserRoleController {

    @Autowired
    UserRoleRepository userRoleRepo;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/api/userRoles", method = RequestMethod.GET)
    public ResponseEntity<List<UserRole>> userRoleFindAll() {
        List<UserRole> userRoles = (List<UserRole>)userRoleRepo.findAll();
        return new ResponseEntity<>(userRoles, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/userRoles", method = RequestMethod.POST)
    public ResponseEntity<UserRole> userRoleAdd(@RequestBody UserRole userRole) {
        try {
            userRoleRepo.save(userRole);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
        return new ResponseEntity<>(userRole, HttpStatus.OK);
    }
}
