package nz.ac.ara.aort.utilities;

import org.apache.commons.lang.ArrayUtils;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.util.StringUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Created by Juniar_R on 9/23/2016.
 */
public final class EmailUtils {

    private EmailUtils() {
    }
    
    public static void sendEmail(String smtpServer, String origin, String destination, String[] ccs, String subject, String body, boolean html) throws MessagingException {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        sender.setHost(smtpServer);
        if (!StringUtils.isEmpty(origin)) {
            helper.setFrom(origin);
        }
        if (!ArrayUtils.isEmpty(ccs)) {
            helper.setCc(ccs);
        }
        helper.setTo(destination);
        helper.setSubject(subject);
        helper.setText(body, html);
        sender.send(message);       
    }
}