package nz.ac.ara.aort.controllers;

import net.minidev.json.JSONObject;
import nz.ac.ara.aort.entities.Parameter;
import nz.ac.ara.aort.entities.Report;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.repositories.ReportRepository;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
        JSONObject response = new JSONObject();
        try {
            UserRole userRole = userRoleRepo.findByStaffId(requestReport.getUserId());
            if (userRole == null) {
                throw new Exception("User role not found.");
            }

            boolean hasAccess = false;
            if (requestReport.getPath().equals("ObserverPerformanceParent")) {
                hasAccess = userRole.getQualityAssurance() || userRole.getSystemAdmin();
            }
            else if (requestReport.getPath().equals("TeamObservation")) {
                hasAccess = userRole.getGeneral();
            }
            else if (requestReport.getPath().equals("AcademicStaffObsOverview")
                    || requestReport.getPath().equals("ObservationRecordsParent")) {
                hasAccess = userRole.getGeneral() || userRole.getQualityAssurance() || userRole.getSystemAdmin();
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

            String url = reportURL + "/Pages/ReportViewer.aspx?/" + existingReport.getPath() + "&rs:Command=Render";
            for (Parameter reqParam : requestReport.getParameters()) {
                url += "&" + reqParam.getPath();
                if(!reqParam.getMandatory() && reqParam.getValue().equals("")) {
                    url += ":isNull=true";
                }
                else {
                    if (reqParam.getValue() != null) {
                        url += "=" + reqParam.getValue();
                    } else {
                        url += "=" + defaultMap.get(reqParam.getName());
                    }
                }
            }

            if(requestReport.getPath().equals("ObservationRecordsParent")
                    || requestReport.getPath().equals("TeamObservation")) {
                url += "&User=" + requestReport.getUserId();
            }

            response.put("result", url);
            response.put("success", true);
            
//            URI redirect = new URI(reportURL);
//            HttpHeaders httpHeaders = new HttpHeaders();
//            httpHeaders.setLocation(redirect);
//            return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.put("result", e.getMessage());
            response.put("success", false);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
