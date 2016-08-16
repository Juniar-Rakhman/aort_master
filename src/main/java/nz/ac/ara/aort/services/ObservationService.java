package nz.ac.ara.aort.services;

import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.Staff;
import nz.ac.ara.aort.repositories.ObservationRepository;
import nz.ac.ara.aort.repositories.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;


/**
 * Created by juniar_r on 8/16/2016.
 */
@Service
public class ObservationService {

    @Autowired
    ObservationRepository observationRepository;
    
    @Autowired
    StaffRepository staffRepository;
    
    public void insertTestData() throws Exception {
        
        Staff staff = staffRepository.findOne("00000065");
        
        Observation obs = new Observation();
        obs.setDate(new Date());
        obs.setCourseName("test 1");
        obs.setDepartment("test 2");
        obs.setHOD(staff);
        observationRepository.save(obs);
    }
}
