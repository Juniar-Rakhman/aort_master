package nz.ac.ara.aort;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //TODO: Enable this in prod?
        http.csrf().disable();

        http.authorizeRequests()
                .antMatchers("/").authenticated()
                .antMatchers("/api/**").authenticated()
                .antMatchers("/home").authenticated()
                .antMatchers("/v2/api-docs").authenticated()
                .antMatchers("/swagger**").authenticated();

        http.formLogin()
                .defaultSuccessUrl("/home")
                .loginPage("/login")
                    .permitAll()
                .and()
                .logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessUrl("/login")
                    .permitAll();
    }

    @Configuration
    protected static class AuthenticationConfiguration extends GlobalAuthenticationConfigurerAdapter {

        @Value("${app.security.use.ldif}")
        private boolean useLDIF;

        @Value("${app.ldap.user.search.filter}")
        private String userSearchFilter;

        @Value("${app.ldap.user.search.base}")
        private String userSearchBase;

        @Value("${app.ldap.group.search.base}")
        private String groupSearchBase;

        @Value("${app.ldap.url}")
        private String ldapURL;

        @Value("${app.ldap.manager.dn}")
        private String managerDN;

        @Value("${app.ldap.manager.password}")
        private String managerPassword;
        
        @Override
        public void init(AuthenticationManagerBuilder auth) throws Exception {
            if (useLDIF) {
                auth
                        .ldapAuthentication()
                        .userDnPatterns("uid={0},ou=people")
                        .groupSearchBase("ou=groups")
                        .contextSource().ldif("classpath:test-server.ldif");
            } else {
                auth.ldapAuthentication()
                        .userSearchFilter(userSearchFilter)
                        .userSearchBase(userSearchBase)
                        .groupSearchBase(groupSearchBase)
                        .contextSource()
                        .url(ldapURL)
                        .managerDn(managerDN)
                        .managerPassword(managerPassword);
            }
        }
    }
}