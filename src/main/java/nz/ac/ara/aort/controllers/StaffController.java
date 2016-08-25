package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.master.Staff;
import nz.ac.ara.aort.repositories.master.PositionRepository;
import nz.ac.ara.aort.repositories.master.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
@RestController
public class StaffController {

    @Autowired
    StaffRepository staffRepo;
    
    @Autowired
    PositionRepository positionRepo;

//    //TODO: Retrieve position   
//    @RequestMapping(value = "/api/staffs/{id}", method = RequestMethod.GET)
//    public ResponseEntity<Staff> staffFindOne(@PathVariable("id") String staffId) {
//        Staff staff = staffRepo.findOne(staffId);
//        return new ResponseEntity<>(staff, HttpStatus.OK);
//    }
}
