package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.repositories.ObservationRepository;
import nz.ac.ara.aort.repositories.RatingReferenceRepository;
import nz.ac.ara.aort.repositories.StaffRepository;
import nz.ac.ara.aort.repositories.StrengthImprovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

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
    public void addMeeting(
            @RequestParam("date") String date,  //YYYY-MM-DD
            @RequestParam("time") String time,  //HH:MM
            @RequestParam("staff") String staffId,
            @RequestParam("primaryObserver") String priObsId,
            @RequestParam("secondaryObserver") String secObsId,
            @RequestParam("courseName") String courseName,
            @RequestParam("courseLevel") String courseLevel,
            @RequestParam("programme") String programme,
            @RequestParam("programmeLevel") String programmeLevel,
            @RequestParam("regNoLearners") String regNoLearners,
            @RequestParam("startNoLearners") String startNoLearners,
            @RequestParam("lateNoLearners") String lateNoLearners,
            @RequestParam("totalNoLearners") String totalNoLearners,
            @RequestParam("campusLocation") String campusLocation,
            @RequestParam("department") String department,
            @RequestParam("sessionContext") String sessionContext,
            @RequestParam("notes") String notes,
            @RequestParam("refRatingId") String refRatingId,
            @RequestParam("ratingSummEval") String ratingSummEval,
            @RequestParam("strengthToShare") String strengthToShare,
            @RequestParam("addComments") String addComments,
            @RequestParam("isModerated") String isModerated,
            @RequestParam("moderator") String moderatorId,
            @RequestParam("learningCoach") String learningCoachId,
            @RequestParam("lineManager") String lineManagerId,
            @RequestParam("hodStaff") String hodStaffId,
            @RequestParam("menu") String menu, HttpServletResponse response) {

        Observation observation = new Observation();

        DateFormat formatter = new SimpleDateFormat("HH:mm");

        try {
            observation.setDate(Date.valueOf(date));
            observation.setTime(new Time(formatter.parse(time).getTime()));
            observation.setStaff(staffRepo.findOne(staffId));
            observation.setObserverPrimary(staffRepo.findOne(priObsId));
            observation.setObserverSecondary(staffRepo.findOne(secObsId));
            observation.setCourseName(courseName);
            observation.setCourseLevel(Integer.valueOf(courseLevel));
            observation.setProgramme(programme);
            observation.setProgrammeLevel(Integer.valueOf(programmeLevel));
            observation.setRegisteredLearners(Integer.valueOf(regNoLearners));
            observation.setStartLearners(Integer.valueOf(startNoLearners));
            observation.setLateLearners(Integer.valueOf(lateNoLearners));
            observation.setTotalLearners(Integer.valueOf(totalNoLearners));
            observation.setLocation(campusLocation);
            observation.setDepartment(department);
            observation.setSessionContext(sessionContext);
            observation.setNotes(notes);
            observation.setRatingReference(ratingRefRepo.findOne(Long.valueOf(refRatingId)));
            observation.setRatingSummary(ratingSummEval);
            observation.setStrengthsShare(strengthToShare);
            observation.setAdditionalComments(addComments);
            observation.setModerated(Boolean.valueOf(isModerated));
            observation.setModerator(staffRepo.findOne(moderatorId));
            observation.setLearningCoach(staffRepo.findOne(learningCoachId));
            observation.setLineManager(staffRepo.findOne(lineManagerId));
            observation.setHOD(staffRepo.findOne(hodStaffId));

            observationRepo.save(observation);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
