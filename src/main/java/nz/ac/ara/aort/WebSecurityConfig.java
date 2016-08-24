package nz.ac.ara.aort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //TODO: Enable this in prod?
        http.csrf().disable();

        http.authorizeRequests()
                .antMatchers("/").authenticated()
                .antMatchers("/api/**").authenticated()
                .antMatchers("/home").authenticated();

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

//        @Autowired
//        @Qualifier("myAuthPopulator")
//        LdapAuthoritiesPopulator authoritiesPopulator;

        @Override
        public void init(AuthenticationManagerBuilder auth) throws Exception {
            auth
                    .ldapAuthentication()
                    .userDnPatterns("uid={0},ou=people")
                    .groupSearchBase("ou=groups")
                    .contextSource().ldif("classpath:test-server.ldif");
//                    .and()
//                    .ldapAuthoritiesPopulator(authoritiesPopulator);
//          
//          TODO: Use this in prod
//          auth.ldapAuthentication()
//                    .userSearchFilter("CN={0}")
//                    .userSearchBase("OU=staff,O=LDAP")
//                    .groupSearchBase("CN=BU-AllStaff,OU=groups,O=LDAP")
//                    .contextSource()
//                    .url("ldap://lds.cpit.ac.nz")
//                    .managerDn("cn=webserver,ou=ServiceAccounts,o=LDAP")
//                    .managerPassword("");
            
        }
    }
}