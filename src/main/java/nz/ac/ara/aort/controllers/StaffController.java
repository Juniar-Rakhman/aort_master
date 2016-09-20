package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.repositories.PositionRepository;
import nz.ac.ara.aort.repositories.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

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
