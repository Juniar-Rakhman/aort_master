package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.Parameter;
import nz.ac.ara.aort.entities.Report;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.repositories.ReportRepository;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import nz.ac.ara.aort.utilities.ReportUtils;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

/**
 * Created by Juniar_R on 9/13/2016.
 */
@RestController
public class ReportController {

    @Autowired
    ReportRepository reportRepo;
    
    @Autowired
    UserRoleRepository userRoleRepo;

    @Value("${spring.report.url}")
    private String reportURL;

    @Value("${spring.report.auth.username}")
    private String username;

    @Value("${spring.report.auth.password}")
    private String password;

    @Value("${spring.report.auth.domain}")
    private String domain;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @RequestMapping(value = "/api/reports/execute", method = RequestMethod.POST)
    public ResponseEntity<byte[]> reportExecute(@RequestBody Report requestReport) {

        byte[] content = null;
        String format;
        HttpHeaders headers = new HttpHeaders();

        try {
            UserRole userRole = userRoleRepo.findByStaffId(requestReport.getUserId());
            if (userRole == null) {
                throw new Exception("User role not found.");
            }

            boolean hasAccess = false;
            switch (requestReport.getPath()) {
                case "ObserverPerformanceParent":
                    hasAccess = userRole.getQualityAssurance() || userRole.getSystemAdmin();
                    break;
                case "TeamObservation":
                    hasAccess = userRole.getGeneral();
                    break;
                case "AcademicStaffObsOverview":
                case "ObservationRecordsParent":
                    hasAccess = userRole.getGeneral() || userRole.getQualityAssurance() || userRole.getSystemAdmin();
                    break;
            }

            if(!hasAccess) {
                throw new Exception("You do not have access to this report.");
            }

            //fetch exisiting report incase we want to use its default param value
            Report existingReport = reportRepo.findOne(requestReport.getId());
            if (existingReport == null) {
                throw new Exception("Report not found: " + requestReport.getId());
            }
            Map<String, String> defaultMap = new HashMap<>();
            for (Parameter param : existingReport.getParameters()) {
                defaultMap.put(param.getName(), param.getValue());
            }

            if (Objects.equals(requestReport.getPath(), "AcademicStaffObsOverview")) {
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                format = "excel";
            } else {
                headers.setContentType(MediaType.APPLICATION_PDF);
                format = "pdf";
            }
            
            String reportUrl = reportURL + existingReport.getPath() + "&rs:Format=" + format;
            for (Parameter reqParam : requestReport.getParameters()) {
                if(!reqParam.getType().contains("Multi")) {
                    reportUrl += "&" + reqParam.getPath();
                }
                if(!reqParam.getMandatory() && reqParam.getValue().equals("")) {
                    reportUrl += ":isNull=true";
                }
                else {
                    if (reqParam.getValue() != null) {
                        if(reqParam.getType().contains("Multi")) {
                            String[] values = reqParam.getValue().split(";");
                            for(String value : values) {
                                reportUrl += "&" + reqParam.getPath() + "=" + value;
                            }
                        }
                        else {
                            reportUrl += "=" + reqParam.getValue();
                        }
                    } else {
                        reportUrl += "=" + defaultMap.get(reqParam.getName());
                    }
                }
            }

            if(requestReport.getPath().equals("ObservationRecordsParent")
                    || requestReport.getPath().equals("TeamObservation")) {
                if(userRole.getGeneral()) {
                    reportUrl += "&User=" + requestReport.getUserId();
                }
                else {
                    reportUrl += "&User:isNull=true";
                }
            }

            Random random = new Random();
            long randomNum = Math.abs(random.nextLong());
            InputStream in = ReportUtils.buildInputStream(reportUrl, domain, username, password);
            logger.info("info report url : " + reportUrl);
            File dest = new File(requestReport.getPath() +"_" + randomNum +".pdf");
            Files.copy(in, dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
            content = Base64.encodeBase64(Files.readAllBytes(dest.toPath()));
            in.close();

            headers.add("content-disposition", "inline;filename=" + dest.getName());
            dest.delete();
        } catch (Exception e) {
            logger.error("critical error : " + e.getMessage());
            e.printStackTrace();
        }

        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }
}
