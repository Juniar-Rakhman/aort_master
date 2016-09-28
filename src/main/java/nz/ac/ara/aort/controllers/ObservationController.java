package nz.ac.ara.aort.controllers;

import com.mysema.query.BooleanBuilder;
import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPAQuery;
import net.minidev.json.JSONObject;
import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.QObservation;
import nz.ac.ara.aort.entities.RatingReference;
import nz.ac.ara.aort.entities.SearchFilter;
import nz.ac.ara.aort.entities.StrengthImprovement;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.entities.Staff;
import nz.ac.ara.aort.repositories.CampusReferenceRepository;
import nz.ac.ara.aort.repositories.DepartmentReferenceRepository;
import nz.ac.ara.aort.repositories.ObservationRepository;
import nz.ac.ara.aort.repositories.RatingReferenceRepository;
import nz.ac.ara.aort.repositories.SessionReferenceRepository;
import nz.ac.ara.aort.repositories.StaffRepository;
import nz.ac.ara.aort.repositories.StrengthImprovementReferenceRepository;
import nz.ac.ara.aort.repositories.StrengthImprovementRepository;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import nz.ac.ara.aort.utilities.EmailUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import org.supercsv.io.CsvListWriter;
import org.supercsv.io.ICsvListWriter;
import org.supercsv.prefs.CsvPreference;

import javax.mail.MessagingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Field;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
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
    
    @Autowired
    CampusReferenceRepository campusRepo;
    
    @Autowired
    DepartmentReferenceRepository departmentRepo;
    
    @Autowired
    SessionReferenceRepository sessionRepo;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("${spring.report.smtp.server}")
    private String smtpServer;
    
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
            Observation oldObservation = (Observation) observationRepo.findOne(observation.getId()).clone();
            observationRepo.save(observation);
            notifyChanges(oldObservation, observation);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(observation, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/observations/search", method = RequestMethod.POST)
    public ResponseEntity<Page> observationFindFilter(@RequestBody SearchFilter filter, @RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<Observation> observationList = new ArrayList<>();
        try {
            observationList = searchObservationByFilter(filter);
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

    @RequestMapping(value = "/api/observations/export", method = RequestMethod.GET)
    public void observationExport(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate, HttpServletResponse response) {
        try {
            SearchFilter sf = new SearchFilter();
            if (!StringUtils.isEmpty(startDate)) {
                sf.setStartDate(Date.valueOf(startDate));
            }
            if (!StringUtils.isEmpty(endDate)) {
                sf.setEndDate(Date.valueOf(endDate));
            }
            List<Observation> observationList = searchObservationByFilter(sf);

            response.setContentType("data:text/csv;charset=utf-8");
            String reportName = "Formal Observation Records <" + new Date(Calendar.getInstance().getTime().getTime()) + ">.csv";
            response.setHeader("Content-disposition", "attachment;filename=" + reportName);

            ICsvListWriter listWriter = new CsvListWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);

            ArrayList<String> header = new ArrayList<>();

            Field[] fields = Observation.class.getDeclaredFields();

            for (Field field : fields) {
                header.add(field.getName());
            }

            listWriter.writeHeader(header.toArray(new String[header.size()]));

            for (Observation observation : observationList) {
                
                String teachersEmail = staffRepo.findOne(observation.getStaffId()).getEmail();
                String teachersPhone = staffRepo.findOne(observation.getStaffId()).getOfficePhone();
                String teachersDept = staffRepo.findOne(observation.getStaffId()).getDepartment();
                String leadObserverEmail = staffRepo.findOne(observation.getObserverPrimaryId()).getEmail();
                String leadObserverPhone = staffRepo.findOne(observation.getObserverPrimaryId()).getOfficePhone();
                String peerObserverEmail = staffRepo.findOne(observation.getObserverSecondaryId()).getEmail();
                String peerObserverPhone = staffRepo.findOne(observation.getObserverSecondaryId()).getOfficePhone();

            }
            listWriter.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private List<Observation> searchObservationByFilter(SearchFilter filter) {
        JPQLQuery query = new JPAQuery(entityManager);
        QObservation observation = QObservation.observation;
        BooleanBuilder condition = new BooleanBuilder();

        if (!StringUtils.isEmpty(filter.getStaff())) {
            condition = condition.and(observation.staffId.eq(filter.getStaff()));
        }

        if (!StringUtils.isEmpty(filter.getLeadObserver())) {
            condition = condition.and(observation.observerPrimaryId.eq(filter.getLeadObserver()));
        }

        if (filter.getStartDate() != null) {
            condition = condition.and(observation.date.goe(filter.getStartDate()));
        }

        if (filter.getEndDate() != null) {
            condition = condition.and(observation.date.loe(filter.getEndDate()));
        }

        if (!StringUtils.isEmpty(filter.getCompleted())) {
            condition = condition.and(observation.completed.eq(BooleanUtils.toBoolean(filter.getCompleted())));
        }

        return query.from(observation).where(condition).list(observation);
    }
    
    private void notifyChanges(Observation oldObs, Observation newObs) throws MessagingException {
        Staff moderator = staffRepo.findOne(newObs.getModeratorId());
        Staff leadObserver = staffRepo.findOne(newObs.getObserverPrimaryId());
        Staff peerObserver = staffRepo.findOne(newObs.getObserverSecondaryId());
        Staff teacher = staffRepo.findOne(newObs.getStaffId());

        // Moderator/QA Ticks ‘Moderator Feedback Provided’ and click ‘Save’
        if (oldObs.getModerated() != newObs.getModerated()) {
            String subject = "Moderation Feedback Complete";
            String ccs[] = {peerObserver.getEmail()};
            
            String body = "Dear " + leadObserver.getFirstName() + " " + leadObserver.getLastName() + ",\n" +
                    "\n" +
                    "The initial moderation for the observation record for " + teacher.getFirstName() + " " + teacher.getLastName() + " on " + newObs.getDate() + ", has been complete.\n" +
                    "\n" +
                    "Please note the following areas were commented on:\n" +
                    "\n" +
                    "Observation Notes\n" +
                    newObs.getModeratorComment1() + "\n" +
                    "\n" +
                    "Strengths & Improvements\n" +
                    newObs.getModeratorComment2() + "\n" +
                    "\n" +
                    "Rating and General Comment\n" +
                    newObs.getModeratorComment3() + "\n" +
                    "\n" +
                    "Please log into the formal teaching observation tool, to respond to the feedback. Once you have completed this process, please make sure to tick ‘Record Updated with Moderator Feedback’ and then click ‘Save’.\n" +
                    "\n" +
                    "Regards\n" +
                    "\n" +
                    moderator.getFirstName() + " " + moderator.getLastName();

            EmailUtils.sendEmail(smtpServer, moderator.getEmail(), moderator.getEmail(), ccs, subject, body, true);
        }

        //Lead Observer Ticks ‘Record Updated with Moderator Feedback’ and click ‘Save’
        if (oldObs.getAppliedFeedback() != newObs.getAppliedFeedback()) {

            String subject = "Applied Feedback";

            String body = "Dear " + moderator.getFirstName() + " " + moderator.getLastName() + ",\n" +
                    "\n" +
                    "I have applied your feedback " +
                    "to the observation record for " + teacher.getFirstName() + " " + teacher.getLastName() + " " +
                    "on " + newObs.getDate() + ".\n" +
                    "Please review my latest changes.\n" +
                    "\n" +
                    "Regards\n" +
                    "\n" +
                    leadObserver.getFirstName() + " " + leadObserver.getLastName();

            EmailUtils.sendEmail(smtpServer, leadObserver.getEmail(), moderator.getEmail(), null, subject, body, true);
        }

        //Moderator clicks ‘Complete’ for an observation record
        if (oldObs.getCompleted() != newObs.getCompleted()) {

            String subject = "Observation Record Complete";

            String body = "Dear " + leadObserver.getFirstName() + " " + leadObserver.getLastName() + ", \n" +
                    "\n" +
                    "The observation record for " + teacher.getFirstName() + " " + teacher.getLastName() + " on " + newObs.getDate() + ", has now been completed.\n" +
                    "You can now arrange the professional conversation with this teacher.\n" +
                    "Regards\n" +
                    "\n" +
                    moderator.getFirstName() + " " + moderator.getLastName();

            EmailUtils.sendEmail(smtpServer, moderator.getEmail(), leadObserver.getEmail(), null, subject, body, true);
        }
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

        if (!StringUtils.isEmpty(observation.getLocationId())) {
            observation.setLocation(campusRepo.findOne(Long.valueOf(observation.getLocationId())));
        }
        
        if (!StringUtils.isEmpty(observation.getDepartmentId())) {
            observation.setDepartment(departmentRepo.findOne(Long.valueOf(observation.getDepartmentId())));
        }
        
        if (!StringUtils.isEmpty(observation.getSessionId())) {
            observation.setSession(sessionRepo.findOne(Long.valueOf(observation.getSessionId())));
        }
        
        if (!StringUtils.isEmpty(observation.getModeratorId())) {
            Staff moderator = staffRepo.findOne(observation.getModeratorId());
            observation.setModerator(moderator);
        }

        if (!StringUtils.isEmpty(observation.getStaffId())) {
            Staff staff = staffRepo.findOne(observation.getStaffId());
            observation.setStaff(staff);
        }

        if (!StringUtils.isEmpty(observation.getObserverPrimaryId())) {
            Staff observerPrimary = staffRepo.findOne(observation.getObserverPrimaryId());
            observation.setObserverPrimary(observerPrimary);
        }

        if (!StringUtils.isEmpty(observation.getObserverSecondaryId())) {
            Staff observerSecondary = staffRepo.findOne(observation.getObserverSecondaryId());
            observation.setObserverSecondary(observerSecondary);
        }

        if (!StringUtils.isEmpty(observation.getLineManagerId())) {
            Staff lineManager = staffRepo.findOne(observation.getLineManagerId());
            observation.setLineManager(lineManager);
        }

        if (!StringUtils.isEmpty(observation.getLearningCoachId())) {
            Staff learningCoach = staffRepo.findOne(observation.getLearningCoachId());
            observation.setLearningCoach(learningCoach);
        }

        if (!StringUtils.isEmpty(observation.getHodId())) {
            Staff hod = staffRepo.findOne(observation.getHodId());
            observation.setHOD(hod);
        }

        if (!StringUtils.isEmpty(observation.getRatingReferenceId())) {
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

        Collections.sort(observations);
        
        return observations;
    }

    private Page<Observation> getObservationPage(List<Observation> observations, Pageable pageRequest) {
        PagedListHolder<Observation> pageList = new PagedListHolder<>(observations);
        pageList.setPage(pageRequest.getPageNumber());
        pageList.setPageSize(pageRequest.getPageSize());

        return new PageImpl<>(fetchStaffName(pageList.getPageList()), pageRequest, observations.size());
    }
}
