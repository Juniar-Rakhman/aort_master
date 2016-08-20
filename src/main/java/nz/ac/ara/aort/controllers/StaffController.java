package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by a9jr5626 on 8/12/16.
 */
@RestController
public class StaffController {
    
    @Autowired
    UserRoleRepository userRoleRepo;
    
    @RequestMapping(value = "/api/user_role_add", method = RequestMethod.POST)
    public ResponseEntity<UserRole> userRoleAdd(@RequestBody UserRole userRole) {
        try {
            userRoleRepo.save(userRole);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(userRole, HttpStatus.OK);
    }
    
}
