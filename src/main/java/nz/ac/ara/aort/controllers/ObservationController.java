package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.RatingReference;
import nz.ac.ara.aort.entities.StrengthImprovement;
import nz.ac.ara.aort.entities.master.Staff;
import nz.ac.ara.aort.repositories.ObservationRepository;
import nz.ac.ara.aort.repositories.RatingReferenceRepository;
import nz.ac.ara.aort.repositories.StrengthImprovementReferenceRepository;
import nz.ac.ara.aort.repositories.StrengthImprovementRepository;
import nz.ac.ara.aort.repositories.master.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
@RestController
public class ObservationController {

    @Autowired
    StaffRepository staffRepo;

    @Autowired
    RatingReferenceRepository ratingRefRepo;

    @Autowired
    StrengthImprovementRepository strImprovRepo;

    @Autowired
    ObservationRepository observationRepo;
    
    @Autowired
    StrengthImprovementReferenceRepository strImpRefRepo;

    @RequestMapping(value = "/api/observations", method = RequestMethod.POST)
    public ResponseEntity<Observation> observationAdd(@RequestBody Observation observation) {
        try {
            observationRepo.save(observation);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(observation, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/observations", method = RequestMethod.PUT)
    public ResponseEntity<Observation> observationModify(@RequestBody Observation observation) {
        try {
            observationRepo.save(observation);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(observation, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/observations", method = RequestMethod.GET)
    public ResponseEntity<List<Observation>> observationFindAll() {
        return new ResponseEntity<>(observationSearch(0,1000), HttpStatus.OK);
    }
    
    public List<Observation> observationSearch(int page, int size) {
        
        Pageable pageRequest = new PageRequest(page, size);
        List<Observation> observationList = new ArrayList<>();

        for (Observation observation : observationRepo.findAll(pageRequest)) {
            if (!observation.getStaffId().isEmpty()) {
                observation.setStaffName(staffRepo.findOne(observation.getStaffId()).getFirstName() + " " + staffRepo.findOne(observation.getStaffId()).getLastName());
            }
            if (!observation.getModeratorId().isEmpty()) {
                observation.setModeratorName(staffRepo.findOne(observation.getModeratorId()).getFirstName() + " " + staffRepo.findOne(observation.getModeratorId()).getLastName());
            }
            if (!observation.getObserverPrimaryId().isEmpty()) {
                observation.setObserverPrimaryName(staffRepo.findOne(observation.getObserverPrimaryId()).getFirstName() + " " + staffRepo.findOne(observation.getObserverPrimaryId()).getLastName());
            }
            if (!observation.getObserverSecondaryId().isEmpty()) {
                observation.setObserverSecondaryName(staffRepo.findOne(observation.getObserverSecondaryId()).getFirstName() + " " + staffRepo.findOne(observation.getObserverSecondaryId()).getLastName());
            }
            if (!observation.getLearningCoachId().isEmpty()) {
                observation.setLearningCoachName(staffRepo.findOne(observation.getLearningCoachId()).getFirstName() + " " + staffRepo.findOne(observation.getLearningCoachId()).getLastName());
            }
            if (!observation.getLineManagerId().isEmpty()) {
                observation.setLineManagerName(staffRepo.findOne(observation.getLineManagerId()).getFirstName() + " " + staffRepo.findOne(observation.getLineManagerId()).getLastName());
            }
            if (!observation.getHodId().isEmpty()) {
                observation.setHodName(staffRepo.findOne(observation.getHodId()).getFirstName() + " " + staffRepo.findOne(observation.getHodId()).getLastName());
            }
            observationList.add(observation);
        }

        return observationList;
    }
    
    @RequestMapping(value = "/api/observations/{id}", method = RequestMethod.GET)
    public ResponseEntity<Observation> observations(@PathVariable("id") String obsId) {

        Observation observation = observationRepo.findOne(Long.valueOf(obsId));
        
        if (!observation.getStaffId().isEmpty()) {
            Staff moderator = staffRepo.findOne(observation.getModeratorId());
            observation.setModerator(moderator);
        }
        
        if (!observation.getModeratorId().isEmpty()) {
            Staff staff = staffRepo.findOne(observation.getStaffId());
            observation.setStaff(staff);
        }
        
        if (!observation.getObserverPrimaryId().isEmpty()) {
            Staff observerPrimary = staffRepo.findOne(observation.getObserverPrimaryId());
            observation.setObserverPrimary(observerPrimary);
        }
        
        if (!observation.getObserverSecondaryId().isEmpty()) {
            Staff observerSecondary = staffRepo.findOne(observation.getObserverSecondaryId());
            observation.setObserverSecondary(observerSecondary);
        }
        
        if (!observation.getLineManagerId().isEmpty()) {
            Staff lineManager = staffRepo.findOne(observation.getLineManagerId());
            observation.setLineManager(lineManager);
        }
        
        if (!observation.getLearningCoachId().isEmpty()) {
            Staff learningCoach = staffRepo.findOne(observation.getLearningCoachId());
            observation.setLearningCoach(learningCoach);
        }
        
        if (!observation.getHodId().isEmpty()) {
            Staff hod = staffRepo.findOne(observation.getHodId());
            observation.setHOD(hod);
        }

        if (!observation.getRatingReferenceId().isEmpty()) {
            RatingReference ratingReference = ratingRefRepo.findOne(Long.valueOf(observation.getRatingReferenceId()));
            observation.setRatingReference(ratingReference);
        }

        for (StrengthImprovement strengthImprovement : observation.getStrengthImprovements()) {
            strengthImprovement.setStrengthImprovementReference(strImpRefRepo.findOne(Long.valueOf(strengthImprovement.getStrengthImprovementReferenceId())));
        }

        return new ResponseEntity<>(observation, HttpStatus.OK);
    }
}
