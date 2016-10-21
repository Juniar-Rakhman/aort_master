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
import nz.ac.ara.aort.utilities.CsvUtils;
import nz.ac.ara.aort.utilities.EmailUtils;
import nz.ac.ara.aort.utilities.ReportUtils;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.supercsv.io.CsvMapWriter;
import org.supercsv.io.ICsvMapWriter;
import org.supercsv.prefs.CsvPreference;

import javax.mail.MessagingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.*;

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

    @Value("${spring.report.smtp.port}")
    private String smptPort;

    @Value("${spring.report.url}")
    private String reportURL;

    @Value("${spring.report.auth.username}")
    private String username;

    @Value("${spring.report.auth.password}")
    private String password;

    @Value("${spring.report.auth.domain}")
    private String domain;

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    
    @RequestMapping(value = "/api/observations", method = RequestMethod.POST)
    public ResponseEntity<Observation> observationAdd(@RequestBody Observation observation) {
        try {
            observationRepo.save(observation);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
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
            log.error(e.getMessage());
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
            log.error(e.getMessage());
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
            log.error(e.getMessage());
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/observations/export", method = RequestMethod.GET)
    public void observationExport(@RequestParam("userId") String userId, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate, HttpServletResponse response) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
            String formattedDate = sdf.format(new Date(Calendar.getInstance().getTime().getTime()));
            UserRole userRole = userRoleRepo.findByStaffId(userId);
            if(BooleanUtils.isTrue(userRole.getSystemAdmin())) {
                SearchFilter sf = new SearchFilter();

                if (!StringUtils.isEmpty(startDate)) {
                    sf.setStartDate(Date.valueOf(startDate));
                }

                if (!StringUtils.isEmpty(endDate)) {
                    sf.setEndDate(Date.valueOf(endDate));
                }

                List<Observation> observationList = searchObservationByFilter(sf);

                response.setContentType("data:text/csv;charset=utf-8");
                String reportName = "Formal Observation Records <" + formattedDate + ">.csv";
                response.setHeader("Content-disposition", "attachment;filename=" + reportName);

                ICsvMapWriter mapWriter = new CsvMapWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
                Map<String, Object> obsMap = new HashMap<>();

                final String[] headers = new String[]{
                        "Id",
                        "Date",
                        "Time",
                        "Late Learners",
                        "Moderated",
                        "Moderated",
                        "Programme",
                        "Programme Level",
                        "Notes",
                        "Rating Summary",
                        "Registered Learners",
                        "Session Context",
                        "Lesson Plan",
                        "Lesson Plan Comment",
                        "Course Outline",
                        "Course Outline Comment",
                        "Start Learners",
                        "Total Learners",
                        "Additional Comments",
                        "Course Code",
                        "Course Level",
                        "Course Name",
                        "Location",
                        "Department",
                        "Session",
                        "Applied Feedback",
                        "Moderator Comment 1",
                        "Moderator Comment 2",
                        "Moderator Comment 3",
                        "Teacher",
                        "Teacher Email",
                        "Teacher Office Phone",
                        "Teacher Department",
                        "Moderator",
                        "Lead Observer",
                        "Lead Observer Email",
                        "Lead Observer Office Phone",
                        "Peer Observer",
                        "Peer Observer Email",
                        "Peer Observer Office Phone",
                        "Rating Reference",
                        "Learning Coach",
                        "Line Manager",
                        "HOD",
                        "Status",
                };

                mapWriter.writeHeader(headers);

                for (Observation observation : observationList) {

                    obsMap.put(headers[0], observation.getId());
                    obsMap.put(headers[1], observation.getDate());
                    obsMap.put(headers[2], observation.getTime());
                    obsMap.put(headers[3], observation.getLateLearners());
                    obsMap.put(headers[4], observation.getModerated());
                    obsMap.put(headers[5], observation.getModerated());
                    obsMap.put(headers[6], observation.getProgramme());
                    obsMap.put(headers[7], observation.getProgrammeLevel());
                    obsMap.put(headers[8], observation.getNotes());
                    obsMap.put(headers[9], observation.getRatingSummary());
                    obsMap.put(headers[10], observation.getRegisteredLearners());
                    obsMap.put(headers[11], observation.getSessionContext());
                    obsMap.put(headers[12], observation.getLessonPlan());
                    obsMap.put(headers[13], observation.getLessonPlanComment());
                    obsMap.put(headers[14], observation.getCourseOutline());
                    obsMap.put(headers[15], observation.getCourseOutlineComment());
                    obsMap.put(headers[16], observation.getStartLearners());
                    obsMap.put(headers[17], observation.getTotalLearners());
                    obsMap.put(headers[18], observation.getAdditionalComments());
                    obsMap.put(headers[19], observation.getCourseCode());
                    obsMap.put(headers[20], observation.getCourseLevel());
                    obsMap.put(headers[21], observation.getCourseName());
                    if (!StringUtils.isEmpty(observation.getLocationId()))
                        obsMap.put(headers[22], campusRepo.findOne(Long.valueOf(observation.getLocationId())).getCampus());
                    if (!StringUtils.isEmpty(observation.getDepartmentId()))
                        obsMap.put(headers[23], departmentRepo.findOne(Long.valueOf(observation.getDepartmentId())).getDepartment());
                    if (!StringUtils.isEmpty(observation.getSessionId()))
                        obsMap.put(headers[24], sessionRepo.findOne(Long.valueOf(observation.getSessionId())).getSession());
                    obsMap.put(headers[25], observation.getAppliedFeedback());
                    obsMap.put(headers[26], observation.getModeratorComment1());
                    obsMap.put(headers[27], observation.getModeratorComment2());
                    obsMap.put(headers[28], observation.getModeratorComment3());
                    if (!StringUtils.isEmpty(observation.getStaffId())) {
                        obsMap.put(headers[29], staffRepo.findOne(observation.getStaffId()).getFirstName() + " " + staffRepo.findOne(observation.getStaffId()).getLastName());
                        obsMap.put(headers[30], staffRepo.findOne(observation.getStaffId()).getEmail());
                        obsMap.put(headers[31], staffRepo.findOne(observation.getStaffId()).getOfficePhone());
                        obsMap.put(headers[32], staffRepo.findOne(observation.getStaffId()).getDepartment());
                    }
                    if (!StringUtils.isEmpty(observation.getModeratorId()))
                        obsMap.put(headers[33], staffRepo.findOne(observation.getModeratorId()).getFirstName() + " " + staffRepo.findOne(observation.getModeratorId()).getLastName());
                    if (!StringUtils.isEmpty(observation.getObserverPrimaryId())) {
                        obsMap.put(headers[34], staffRepo.findOne(observation.getObserverPrimaryId()).getFirstName() + " " + staffRepo.findOne(observation.getObserverPrimaryId()).getLastName());
                        obsMap.put(headers[35], staffRepo.findOne(observation.getObserverPrimaryId()).getEmail());
                        obsMap.put(headers[36], staffRepo.findOne(observation.getObserverPrimaryId()).getOfficePhone());
                    }
                    if (!StringUtils.isEmpty(observation.getObserverSecondaryId())) {
                        obsMap.put(headers[37], staffRepo.findOne(observation.getObserverSecondaryId()).getFirstName() + " " + staffRepo.findOne(observation.getObserverSecondaryId()).getLastName());
                        obsMap.put(headers[38], staffRepo.findOne(observation.getObserverSecondaryId()).getEmail());
                        obsMap.put(headers[39], staffRepo.findOne(observation.getObserverSecondaryId()).getOfficePhone());
                    }
                    if (!StringUtils.isEmpty(observation.getRatingReferenceId()))
                        obsMap.put(headers[40], ratingRefRepo.findOne(Long.valueOf(!StringUtils.isEmpty(observation.getRatingReferenceId()) ? observation.getRatingReferenceId() : "0")).getRating());
                    if (!StringUtils.isEmpty(observation.getLearningCoachId()))
                        obsMap.put(headers[41], staffRepo.findOne(observation.getLearningCoachId()).getFirstName() + " " + staffRepo.findOne(observation.getLearningCoachId()).getLastName());
                    if (!StringUtils.isEmpty(observation.getLineManagerId()))
                        obsMap.put(headers[42], staffRepo.findOne(observation.getLineManagerId()).getFirstName() + " " + staffRepo.findOne(observation.getLineManagerId()).getLastName());
                    if (!StringUtils.isEmpty(observation.getHodId()))
                        obsMap.put(headers[43], staffRepo.findOne(observation.getHodId()).getFirstName() + " " + staffRepo.findOne(observation.getHodId()).getLastName());
                    obsMap.put(headers[44], observation.getCompleted() ? "completed" : "open");
                    
                    //strImprov
                    //obsRecommend

                    mapWriter.write(obsMap, headers, CsvUtils.getProcessors());
                }
                mapWriter.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
    }

    @RequestMapping(value = "/api/observations/send", method = RequestMethod.GET)
    public ResponseEntity<Object> sendReportMail(@RequestParam("userId") String userId, @RequestParam("observationId") int observationId) {

        JSONObject response = new JSONObject();
        Observation observation = observationRepo.findOne((long)observationId);
        UserRole userRole = userRoleRepo.findByStaffId(userId);

        try {
            if(observation.getObserverPrimaryId().equals(userId)
                    || observation.getObserverSecondaryId().equals(userId)
                    || BooleanUtils.isTrue(userRole.getQualityAssurance())
                    || BooleanUtils.isTrue((userRole.getSystemAdmin()))) {
                Staff staff = staffRepo.findOne(userId);
                String reportUrl = reportURL + "Observation&rs:Format=PDF&ObservationId=" + observationId;
                InputStream in = ReportUtils.buildInputStream(reportUrl, domain, username, password);

                Random random = new Random();
                long randomNum = Math.abs(random.nextLong());
                File dest = new File("ObservationReport_" + randomNum + ".pdf");
                Files.copy(in, dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
                in.close();

                String body = "Dear " + staff.getFirstName() + " " + staff.getLastName() + ",\n" +
                        "\n" +
                        "Please find the observation report in the attachment.\n" +
                        "\n" +
                        "This email is sent from server, please do not reply.\n" +
                        "\n";
                EmailUtils.sendEmail(smtpServer, Integer.valueOf(smptPort), null, staff.getEmail(), null, "Observation Report #" + observationId, body, false, dest);
                dest.delete();

                response.put("message", "Observation has been sent successfully to : " + staff.getEmail());
                response.put("success", true);
            }
            else {
                throw new Exception("You do not have access to send observation.");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Failed to send observation. " + e.getMessage());
            response.put("success", false);
            log.error("Email Send Error: " + e.getMessage());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/observations/print", method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<byte[]> print(@RequestParam("userId") String userId, @RequestParam("observationId") int observationId) {

        Observation observation = observationRepo.findOne((long) observationId);
        UserRole userRole = userRoleRepo.findByStaffId(userId);
        byte[] pdfContent = null;
        HttpHeaders headers = new HttpHeaders();

        try {
            if (observation.getObserverPrimaryId().equals(userId)
                    || observation.getObserverSecondaryId().equals(userId)
                    || BooleanUtils.isTrue(userRole.getQualityAssurance())
                    || BooleanUtils.isTrue(userRole.getSystemAdmin())) {
                String reportUrl = reportURL + "Observation&rs:Format=PDF&ObservationId=" + observationId;
                log.error("info report username : " + username);
                log.error("info report password : " + password);
                log.error("info report url : " + reportUrl);
                InputStream in = ReportUtils.buildInputStream(reportUrl, domain, username, password);
                
                Random random = new Random();
                long randomNum = Math.abs(random.nextLong());
                File dest = new File("ObservationReport_" + randomNum +".pdf");
                Files.copy(in, dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
                pdfContent = Base64.encodeBase64(Files.readAllBytes(dest.toPath()));
                in.close();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.add("content-disposition", "inline;filename=" + dest.getName());
                dest.delete();
            } else {
                throw new Exception("You do not have access to print observation.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("CRITICAL ERROR" + e.getMessage());
        }

        return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
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
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String strDate;

        // Moderator/QA Ticks ‘Moderator Feedback Provided’ and click ‘Save’
        if (oldObs.getModerated() != newObs.getModerated() && newObs.getModerated()) {
            String subject = "Moderation Feedback Complete";
            String ccs[] = {peerObserver.getEmail()};
            strDate = sdf.format(newObs.getDate());
            
            String body = "Dear " + leadObserver.getFirstName() + " " + leadObserver.getLastName() + ",\n" +
                    "\n" +
                    "The initial moderation for the observation record for " + teacher.getFirstName() + " " + teacher.getLastName() + " on " + strDate + ", has been complete.\n" +
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

            EmailUtils.sendEmail(smtpServer, Integer.valueOf(smptPort), moderator.getEmail(), leadObserver.getEmail(), ccs, subject, body, false, null);
        }

        //Lead Observer Ticks ‘Record Updated with Moderator Feedback’ and click ‘Save’
        if (oldObs.getAppliedFeedback() != newObs.getAppliedFeedback()) {
            strDate = sdf.format(newObs.getDate());

            String subject = "Applied Feedback";

            String body = "Dear " + moderator.getFirstName() + " " + moderator.getLastName() + ",\n" +
                    "\n" +
                    "I have applied your feedback " +
                    "to the observation record for " + teacher.getFirstName() + " " + teacher.getLastName() + " " +
                    "on " + strDate + ".\n" +
                    "Please review my latest changes.\n" +
                    "\n" +
                    "Regards\n" +
                    "\n" +
                    leadObserver.getFirstName() + " " + leadObserver.getLastName();

            EmailUtils.sendEmail(smtpServer, Integer.valueOf(smptPort), leadObserver.getEmail(), moderator.getEmail(), null, subject, body, false, null);
        }

        //Moderator clicks ‘Complete’ for an observation record
        if (oldObs.getCompleted() != newObs.getCompleted()) {
            strDate = sdf.format(newObs.getDate());

            String subject = "Observation Record Complete";

            String body = "Dear " + leadObserver.getFirstName() + " " + leadObserver.getLastName() + ", \n" +
                    "\n" +
                    "The observation record for " + teacher.getFirstName() + " " + teacher.getLastName() + " on " + strDate + ", has now been completed. " +
                    "You can now arrange the professional conversation with this teacher.\n" +
                    "After you have had your conversation with the teacher, please email this record to the teacher with a copy to the manager.\n" +
                    "Ensure your standard email states:\n" +
                    "“Thank you for the opportunity to observe your teaching practice.\n" +
                    "If you have any queries about the observation or process, please discuss these with your manager in the first instance.”\n" +
                    "\n" +
                    "Regards\n" +
                    moderator.getFirstName() + " " + moderator.getLastName();

            EmailUtils.sendEmail(smtpServer, Integer.valueOf(smptPort), moderator.getEmail(), leadObserver.getEmail(), null, subject, body, false, null);
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
