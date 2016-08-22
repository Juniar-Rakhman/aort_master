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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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

    @RequestMapping(value = "/api/observation_add", method = RequestMethod.POST)
    public ResponseEntity<Observation> observationAdd(@RequestBody Observation observation) {
        try {
            observationRepo.save(observation);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(observation, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/observations/{id}", method = RequestMethod.GET)
    public ResponseEntity<Observation> observations(@PathVariable("id") String obsId) {

        Observation observation = observationRepo.findOne(Long.valueOf(obsId));

        Staff moderator = staffRepo.findOne(observation.getModeratorId());
        observation.setModerator(moderator);

        Staff staff = staffRepo.findOne(observation.getStaffId());
        observation.setStaff(staff);

        Staff observerPrimary = staffRepo.findOne(observation.getObserverPrimaryId());
        observation.setObserverPrimary(observerPrimary);

        Staff observerSecondary = staffRepo.findOne(observation.getObserverSecondaryId());
        observation.setObserverSecondary(observerSecondary);

        Staff lineManager = staffRepo.findOne(observation.getLineManagerId());
        observation.setLineManager(lineManager);

        Staff learningCoach = staffRepo.findOne(observation.getLearningCoachId());
        observation.setLearningCoach(learningCoach);

        Staff hod = staffRepo.findOne(observation.getHodId());
        observation.setHOD(hod);

        RatingReference ratingReference = ratingRefRepo.findOne(Long.valueOf(observation.getRatingReferenceId()));
        observation.setRatingReference(ratingReference);

        for (StrengthImprovement strengthImprovement : observation.getStrengthImprovements()) {
            strengthImprovement.setStrengthImprovementReference(strImpRefRepo.findOne(strengthImprovement.getId()));
        }

        return new ResponseEntity<>(observation, HttpStatus.OK);
    }
}
