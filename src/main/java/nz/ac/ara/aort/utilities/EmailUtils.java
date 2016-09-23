package nz.ac.ara.aort.utilities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Created by Juniar_R on 9/23/2016.
 */
public final class EmailUtils {

    @Value("${spring.report.smtp.server}")
    private static String smtpServer;

    private EmailUtils() {
    }
    
    public static void sendEmail(String destination, String subject, String body, boolean html) throws MessagingException {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        sender.setHost(smtpServer);
        helper.setTo(destination);
        helper.setSubject(subject);
        helper.setText(body, html);
        sender.send(message);       
    }
}
