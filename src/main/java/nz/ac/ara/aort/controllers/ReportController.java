package nz.ac.ara.aort.controllers;

import net.minidev.json.JSONObject;
import nz.ac.ara.aort.entities.Parameter;
import nz.ac.ara.aort.entities.Report;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.repositories.ReportRepository;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
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

    @RequestMapping(value = "/api/reports/execute", method = RequestMethod.POST, produces = "application/pdf")
    public ResponseEntity<byte[]> reportExecute(@RequestBody Report requestReport) {

        byte[] pdfContent = null;
        HttpHeaders headers = new HttpHeaders();

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

            String reportUrl = reportURL + "/Pages/ReportViewer.aspx?/" + existingReport.getPath() + "&rs:Format=PDF";
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
                reportUrl += "&User=" + requestReport.getUserId();
            }

            URL url = new URL(reportUrl);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            InputStream in = connection.getInputStream();

            File dir = new File("reports");
            if(!dir.exists()) {
                dir.mkdir();
            }
            File dest = new File("reports/" + requestReport.getPath() + ".pdf");
            Files.copy(in, dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
            pdfContent = Base64.encodeBase64(Files.readAllBytes(dest.toPath()));
            in.close();

            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.add("content-disposition", "inline;filename=" + dest.getName());
            dest.delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<byte[]>(pdfContent, headers, HttpStatus.OK);
    }
}
