package nz.ac.ara.aort.services;

import nz.ac.ara.aort.entities.UserRole;
import nz.ac.ara.aort.entities.master.Staff;
import nz.ac.ara.aort.repositories.UserRoleRepository;
import nz.ac.ara.aort.repositories.master.StaffRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by a9jr5626 on 8/23/16.
 */
@Service("myAuthPopulator")
public class MyAuthoritiesPopulator implements LdapAuthoritiesPopulator {

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    static final org.slf4j.Logger log = LoggerFactory.getLogger(MyAuthoritiesPopulator.class);

    @Override
    public Collection<? extends GrantedAuthority> getGrantedAuthorities(DirContextOperations dirContextOperations, String username) {

        Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();

        try{

            Staff staff = staffRepository.findByUsername(username);

            UserRole userRole = userRoleRepository.findByStaffId(staff.getId());


        }catch(Exception e){
            e.printStackTrace();
        }


        return null;
    }
}
