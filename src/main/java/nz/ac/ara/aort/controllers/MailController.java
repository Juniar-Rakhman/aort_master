package nz.ac.ara.aort.controllers;

import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

/**
 * Created by Galih_P on 9/15/2016.
 */
@RestController
public class MailController {

    @RequestMapping(value = "/api/mail/send", method = RequestMethod.GET)
    public ResponseEntity<Object> sendMail(@RequestParam("recipient") String recipient, @RequestParam("observationId") int observationId) {

        JSONObject response = new JSONObject();
        try {
            String url = "https://sql2012server.mitrais.com/ReportServer?/Observation&rs:Format=HTML4.0&rc:toolbar=false&ObservationId=" + observationId;
            URL reportURL = new URL(url);
            HttpsURLConnection connection = (HttpsURLConnection) reportURL.openConnection();
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
            helper.setTo(recipient);
            helper.setSubject("Observation Report ID " + observationId);
            helper.setText(body, true);

            sender.send(message);
            response.put("message", "Mail has been sent successfully");
            response.put("success", true);
        }
        catch (MailException e) {
            e.printStackTrace();
            response.put("message", "Failed to send mail. " + e.getMessage());
            response.put("success", false);
        }
        catch (IOException e) {
            e.printStackTrace();
            response.put("message", "Failed to send mail. " + e.getMessage());
            response.put("success", false);
        }
        catch (MessagingException e) {
            e.printStackTrace();
            response.put("message", "Failed to send mail. " + e.getMessage());
            response.put("success", false);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
