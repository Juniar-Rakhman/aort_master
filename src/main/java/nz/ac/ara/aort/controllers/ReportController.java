package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.Report;
import nz.ac.ara.aort.repositories.ReportRepository;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import nz.ac.ara.aort.repositories.master.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Juniar_R on 9/13/2016.
 */
@RestController
public class ReportController {

    @Autowired
    ReportRepository reportRepo;
    
    @Autowired
    UserRoleRepository userRoleRepo;
    
    @RequestMapping(value = "/api/reports/execute", method = RequestMethod.POST)
    public ResponseEntity<Report> observationAdd(@RequestBody Report report) {
        try {
            //TODO: Check report exist
            reportRepo.findOne(report.getId());

            //TODO: Check user access based on roles
            userRoleRepo.findOne(report.getUserId());            
            
            //TODO: Send redirect url to report server
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(report, HttpStatus.OK);
    }
}
