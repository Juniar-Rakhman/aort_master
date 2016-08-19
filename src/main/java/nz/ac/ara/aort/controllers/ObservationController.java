package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.StrengthImprovement;
import nz.ac.ara.aort.repositories.ObservationRepository;
import nz.ac.ara.aort.repositories.RatingReferenceRepository;
import nz.ac.ara.aort.repositories.StrengthImprovementRepository;
import nz.ac.ara.aort.repositories.master.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
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

    @RequestMapping(value = "/api/observation_add", method = RequestMethod.POST)
    public ResponseEntity<Observation> observationAdd(@RequestBody Observation observation) {
        try {
            observation.setStaff(staffRepo.findOne(observation.getStrStaffId()));
            observation.setModerator(staffRepo.findOne(observation.getStrModeratorId()));
            observation.setObserverPrimary(staffRepo.findOne(observation.getStrPrimaryObserverId()));
            observation.setObserverSecondary(staffRepo.findOne(observation.getStrSecondaryObserverId()));
            observation.setRatingReference(ratingRefRepo.findOne(Long.valueOf(observation.getStrRatingRefId())));
            observation.setLearningCoach(staffRepo.findOne(observation.getStrLearningCoachId()));
            observation.setLineManager(staffRepo.findOne(observation.getStrLineManagerId()));
            observation.setHOD(staffRepo.findOne(observation.getStrHodId()));

            observationRepo.save(observation);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(observation, HttpStatus.OK);
    }
}
