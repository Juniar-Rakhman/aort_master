package nz.ac.ara.aort.utilities;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.NTCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.protocol.HttpContext;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.protocol.BasicHttpContext;

import java.io.IOException;
import java.io.InputStream;


/**
 * Created by Juniar_R on 10/4/2016.
 */
public final class ReportUtils {

    private ReportUtils() {
    }

    public static InputStream buildInputStream(String reportUrl, String domain, String username, String password) throws IOException {
        InputStream in;
        HttpClient httpclient = HttpClientBuilder.create().build();
        HttpContext localContext = new BasicHttpContext();
        HttpGet httpget = new HttpGet(reportUrl);
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(AuthScope.ANY, new NTCredentials(username, password, null, domain));
        localContext.setAttribute(HttpClientContext.CREDS_PROVIDER, credsProvider);
        HttpResponse response = httpclient.execute(httpget, localContext);
        HttpEntity entity = response.getEntity();
        in = entity.getContent();
        return in;
    }

}
