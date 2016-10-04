package nz.ac.ara.aort.utilities;

import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.io.InputStream;
import java.net.Authenticator;
import java.net.HttpURLConnection;
import java.net.PasswordAuthentication;
import java.net.URL;

/**
 * Created by Juniar_R on 10/4/2016.
 */
public final class ReportUtils {

    private ReportUtils() {
    }

    public static InputStream buildInputStream(String reportUrl, Boolean secureReport, String username, String password) throws IOException {
        URL url = new URL(reportUrl);
        InputStream in;
        if (secureReport) {
            // Set default authentication
            Authenticator.setDefault(new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password.toCharArray());
                }
            });
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            in = connection.getInputStream();
        } else {
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            in = connection.getInputStream();
        }
        return in;
    }

}
