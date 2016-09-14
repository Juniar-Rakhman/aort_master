package nz.ac.ara.aort.controllers;

import net.minidev.json.JSONObject;
import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.RatingReference;
import nz.ac.ara.aort.entities.StrengthImprovement;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.entities.master.Staff;
import nz.ac.ara.aort.repositories.*;
import nz.ac.ara.aort.repositories.master.StaffRepository;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @Autowired
    UserRoleRepository userRoleRepo;

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

    @RequestMapping(value = "/api/observations/search", method = RequestMethod.GET)
    public ResponseEntity<Page> observationFindFilter(@RequestParam("filter") String filter, @RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<Observation> observationList = new ArrayList<>();
        //TODO learn querydsl
        try {
            // filter can be staff
            for (Staff staff : staffRepo.findByStaffName(filter, null)) {
                observationList.addAll(observationRepo.findByStaffId(staff.getId()));
            }
            // or course name
            if (observationList.isEmpty()) {
                observationList.addAll(observationRepo.findByCourseName(filter));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        Page<Observation> observationPage = getObservationPage(observationList, pageRequest);
        return new ResponseEntity<>(observationPage, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/observations", method = RequestMethod.GET)
    public ResponseEntity<Page> observationFindAll(@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<Observation> observations = (List<Observation>)observationRepo.findAll();

        Page<Observation> observationPage = getObservationPage(observations, pageRequest);
        return new ResponseEntity<>(observationPage, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/observations/{id}/{staffId}", method = RequestMethod.GET)
    public ResponseEntity<Object> observationsFindIdStaff(@PathVariable("id") String obsId, @PathVariable("staffId") String staffId) {
        JSONObject entity = new JSONObject();
        try {
            entity.put("result", findObservation(obsId, staffId));
            entity.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            entity.put("result", e.getMessage());
            entity.put("success", false);
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    private Observation findObservation(String obsId, String staffId) throws Exception {

        Observation observation = observationRepo.findOne(Long.valueOf(obsId));

        //validation
        if (!StringUtils.isBlank(staffId)) {

            UserRole userRole = userRoleRepo.findByStaffId(staffId);

            if (observation.getHodId().equals(staffId)
                    || observation.getLineManagerId().equals(staffId)
                    || observation.getLearningCoachId().equals(staffId)) {
                observation.setAccess("view");
            }

            if (observation.getObserverPrimaryId().equals(staffId)
                    || observation.getObserverSecondaryId().equals(staffId)) {
                observation.setAccess("edit");
            }

            if (BooleanUtils.isTrue(userRole.getQualityAssurance())) {
                observation.setAccess("edit");
            }

            if (BooleanUtils.isTrue(userRole.getSystemAdmin())) {
                observation.setAccess("edit");
            }

            if (StringUtils.isEmpty(observation.getAccess())) {
                throw new Exception("You do not have access to this record.");
            }
        }

        if (!observation.getModeratorId().isEmpty()) {
            Staff moderator = staffRepo.findOne(observation.getModeratorId());
            observation.setModerator(moderator);
        }

        if (!observation.getStaffId().isEmpty()) {
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

        return observation;
    }

    private List<Observation> fetchStaffName(List<Observation> observations) {

        for (Observation observation : observations) {
            if (!observation.getStaffId().isEmpty()) {
                observation.setStaffFirstName(staffRepo.findOne(observation.getStaffId()).getFirstName());
                observation.setStaffLastName(staffRepo.findOne(observation.getStaffId()).getLastName());
            }
            if (!observation.getModeratorId().isEmpty()) {
                observation.setModeratorFirstName(staffRepo.findOne(observation.getModeratorId()).getFirstName());
                observation.setModeratorLastName(staffRepo.findOne(observation.getModeratorId()).getLastName());
            }
            if (!observation.getObserverPrimaryId().isEmpty()) {
                observation.setObserverPrimaryFirstName(staffRepo.findOne(observation.getObserverPrimaryId()).getFirstName());
                observation.setObserverPrimaryLastName(staffRepo.findOne(observation.getObserverPrimaryId()).getLastName());
            }
            if (!observation.getObserverSecondaryId().isEmpty()) {
                observation.setObserverSecondaryFirstName(staffRepo.findOne(observation.getObserverSecondaryId()).getFirstName());
                observation.setObserverSecondaryLastName(staffRepo.findOne(observation.getObserverSecondaryId()).getLastName());
            }
            if (!observation.getLearningCoachId().isEmpty()) {
                observation.setLearningCoachFirstName(staffRepo.findOne(observation.getLearningCoachId()).getFirstName());
                observation.setLearningCoachLastName(staffRepo.findOne(observation.getLearningCoachId()).getLastName());
            }
            if (!observation.getLineManagerId().isEmpty()) {
                observation.setLineManagerFirstName(staffRepo.findOne(observation.getLineManagerId()).getFirstName());
                observation.setLineManagerLastName(staffRepo.findOne(observation.getLineManagerId()).getLastName());
            }
            if (!observation.getHodId().isEmpty()) {
                observation.setHodFirstName(staffRepo.findOne(observation.getHodId()).getFirstName());
                observation.setHodLastName(staffRepo.findOne(observation.getHodId()).getLastName());
            }
        }

        return observations;
    }

    private Page<Observation> getObservationPage(List<Observation> observations, Pageable pageRequest) {
        PagedListHolder<Observation> pageList = new PagedListHolder<>(observations);
        pageList.setPage(pageRequest.getPageNumber());
        pageList.setPageSize(pageRequest.getPageSize());

        Page<Observation> observationPage = new PageImpl<>(fetchStaffName(pageList.getPageList()), pageRequest, observations.size());
        return observationPage;
    }
}
