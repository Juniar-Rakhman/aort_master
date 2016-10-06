package nz.ac.ara.aort.utilities;

import com.sun.xml.internal.ws.api.policy.PolicyResolver;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.NTCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HttpContext;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.protocol.BasicHttpContext;

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
        // Set default authentication
//        Authenticator.setDefault(new Authenticator() {
//            @Override
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(username, password.toCharArray());
//            }
//        });
//        if (secureReport) {
//            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
//            in = connection.getInputStream();
//        } else {
//            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//            in = connection.getInputStream();
//        }

        DefaultHttpClient httpclient = new DefaultHttpClient();
        HttpContext localContext = new BasicHttpContext();
        HttpGet httpget = new HttpGet(reportUrl);
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(AuthScope.ANY, new NTCredentials(username, password, null, "MITRAIS"));
        localContext.setAttribute(ClientContext.CREDS_PROVIDER, credsProvider);
        HttpResponse response = httpclient.execute(httpget, localContext);
//        logger.debug("jun test response: " + response);
        HttpEntity entity = response.getEntity();
        in = entity.getContent();

        return in;
    }

}
