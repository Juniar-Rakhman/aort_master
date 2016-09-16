package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.Parameter;
import nz.ac.ara.aort.entities.Report;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.repositories.ReportRepository;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

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

    @RequestMapping(value = "/api/reports/execute", method = RequestMethod.POST)
    public ResponseEntity<Object> reportExecute(@RequestBody Report requestReport) {
        try {
            
            //fetch exisiting report incase we want to use its default param value
            Report existingReport = reportRepo.findOne(requestReport.getId());
            if (existingReport == null) {
                throw new Exception("Report not found: " + requestReport.getId());
            }
            Map<String, String> defaultMap = new HashMap<>();
            for (Parameter param : existingReport.getParameters()) {
                defaultMap.put(param.getName(), param.getValue());
            }

            reportURL += "?/" + existingReport.getName() + "&rs:" + "Format=" + requestReport.getFormat();
            
            UserRole userRole = userRoleRepo.findByStaffId(requestReport.getUserId());

            if (userRole == null) {
                throw new Exception("User role not found");
            }
            
            //TODO: add more validation
            if (userRole.getGeneral()) {
                throw new Exception("You do not have access to this report.");
            }

            for (Parameter reqParam : requestReport.getParameters()) {
                reportURL += "?" + reqParam.getName();
                if (reqParam.getValue() != null) {
                    reportURL += "=" + reqParam.getValue();
                } else {
                    reportURL += "=" + defaultMap.get(reqParam.getName());
                }
            }
            
            //TODO: Add ssrs authentication
            URI redirect = new URI(reportURL);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(redirect);
            return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
    }
}
