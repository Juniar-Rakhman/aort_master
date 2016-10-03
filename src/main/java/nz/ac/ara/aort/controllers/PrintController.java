package nz.ac.ara.aort.controllers;

import net.minidev.json.JSONObject;
import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.Staff;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.repositories.ObservationRepository;
import nz.ac.ara.aort.repositories.StaffRepository;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import nz.ac.ara.aort.utilities.EmailUtils;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

/**
 * Created by Galih_P on 9/15/2016.
 */
@RestController
public class PrintController {

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    ObservationRepository observationRepository;

    @Value("${spring.report.url}")
    private String reportURL;

    @Value("${spring.report.auth.username}")
    private String username;

    @Value("${spring.report.auth.password}")
    private String password;

    @Value("${spring.report.smtp.server}")
    private String smtpServer;

    @RequestMapping(value = "/api/mail/send", method = RequestMethod.GET)
    public ResponseEntity<Object> sendReportMail(@RequestParam("userId") String userId, @RequestParam("observationId") int observationId) {

        JSONObject response = new JSONObject();
        Observation observation = observationRepository.findOne((long)observationId);
        UserRole userRole = userRoleRepository.findByStaffId(userId);

        if(observation.getObserverPrimaryId().equals(userId)
                || observation.getObserverSecondaryId().equals(userId)
                || BooleanUtils.isTrue(userRole.getQualityAssurance())
                || BooleanUtils.isTrue((userRole.getSystemAdmin()))) {
            Staff staff = staffRepository.findOne(userId);
            try {
                String reportUrl = reportURL + "?/Observation&rs:Format=PDF&ObservationId=" + observationId;
                URL url = new URL(reportUrl);

                // Set default authentication
//                Authenticator.setDefault(new Authenticator() {
//                    @Override
//                    protected PasswordAuthentication getPasswordAuthentication() {
//                        return new PasswordAuthentication(username, password.toCharArray());
//                    }
//                });

                HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
                InputStream in = connection.getInputStream();
                File dest = new File("ObservationReport#" + observationId + ".pdf");
                Files.copy(in, dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
                in.close();
                String body = "Dear " + staff.getFirstName() + " " + staff.getLastName() + ",\n" +
                        "\n" +
                        "Please find the observation report in the attachment.\n" +
                        "\n" +
                        "This email is sent from server, please do not reply.\n" +
                        "\n";
                EmailUtils.sendEmail(smtpServer, null, staff.getEmail(), null, "Observation Report #" + observationId, body, false, dest);
                dest.delete();

                response.put("message", "Observation has been sent successfully to : " + staff.getEmail());
                response.put("success", true);
            }
            catch (Exception e) {
                e.printStackTrace();
                response.put("message", "Failed to send observation. " + e.getMessage());
                response.put("success", false);
            }
        }
        else {
            response.put("message", "You do not have access to send observation.");
            response.put("success", false);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/print", method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<byte[]> print(@RequestParam("userId") String userId, @RequestParam("observationId") int observationId) {

        Observation observation = observationRepository.findOne((long) observationId);
        UserRole userRole = userRoleRepository.findByStaffId(userId);
        byte[] pdfContent = null;
        HttpHeaders headers = new HttpHeaders();

        try {
            if (observation.getObserverPrimaryId().equals(userId)
                    || observation.getObserverSecondaryId().equals(userId)
                    || BooleanUtils.isTrue(userRole.getQualityAssurance())
                    || BooleanUtils.isTrue(userRole.getSystemAdmin())) {
                String reportUrl = reportURL + "?/Observation&rs:Format=PDF&ObservationId=" + observationId;
                URL url = new URL(reportUrl);
                HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
                InputStream in = connection.getInputStream();

                File dir = new File("reports");
                if(!dir.exists()) {
                    dir.mkdir();
                }
                File dest = new File("reports/ObservationReport#" + observationId + ".pdf");
                Files.copy(in, dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
                pdfContent = Files.readAllBytes(dest.toPath());
                in.close();

                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.add("content-disposition", "inline;filename=" + dest.getName());
                dest.delete();
            } else {
                throw new Exception("You do not have access to print observation.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<byte[]>(pdfContent, headers, HttpStatus.OK);
    }
}
