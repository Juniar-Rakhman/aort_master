package nz.ac.ara.aort.controllers;

import net.minidev.json.JSONObject;
import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.Staff;
import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.repositories.ObservationRepository;
import nz.ac.ara.aort.repositories.StaffRepository;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import org.apache.commons.lang.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.internet.MimeMessage;
import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

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

    @RequestMapping(value = "/api/mail/send", method = RequestMethod.GET)
    public ResponseEntity<Object> sendMail(@RequestParam("userId") String userId, @RequestParam("observationId") int observationId) {

        JSONObject response = new JSONObject();
        Observation observation = observationRepository.findOne((long)observationId);
        UserRole userRole = userRoleRepository.findByStaffId(userId);

        if(observation.getObserverPrimaryId().equals(userId)
                || observation.getObserverSecondaryId().equals(userId)
                || BooleanUtils.isTrue(userRole.getQualityAssurance())
                || BooleanUtils.isTrue((userRole.getSystemAdmin()))) {
            Staff staff = staffRepository.findOne(userId);
            try {
                String reportURLHTML = reportURL + "?/Observation&rs:Format=HTML4.0&rc:toolbar=false&ObservationId=" + observationId;
                URL url = new URL(reportURLHTML);
                HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                String body = "";
                while((inputLine = in.readLine()) != null) {
                    body += inputLine;
                }
                in.close();

                JavaMailSenderImpl sender = new JavaMailSenderImpl();
                MimeMessage message = sender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message);
                // TODO: Need to change it into ARA SMTP server
                sender.setHost("exchange.mitrais.com");
                helper.setTo(staff.getEmail());
                helper.setSubject("Observation Report #" + observationId);
                helper.setText(body, true);

                sender.send(message);
                response.put("message", "Observation has been sent successfully");
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

    @RequestMapping(value = "/api/print", method = RequestMethod.GET)
    public ResponseEntity<Object> print(@RequestParam("userId") String userId, @RequestParam("observationId") int observationId) {

        JSONObject response = new JSONObject();
        Observation observation = observationRepository.findOne((long)observationId);
        UserRole userRole = userRoleRepository.findByStaffId(userId);

        try{
            if(observation.getObserverPrimaryId().equals(userId)
                    || observation.getObserverSecondaryId().equals(userId)
                    || BooleanUtils.isTrue(userRole.getQualityAssurance())
                    || BooleanUtils.isTrue((userRole.getSystemAdmin()))) {
                String reportURLPDF = reportURL + "?/Observation&rs:Format=PDF&ObservationId=" + observationId;
                response.put("result", reportURLPDF);
                response.put("success", true);
            }
            else {
                throw new Exception("You do not have access to print observation.");
            }
        }
        catch(Exception e) {
            e.printStackTrace();
            response.put("result", e.getMessage());
            response.put("success", false);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
