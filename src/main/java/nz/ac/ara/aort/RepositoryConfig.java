package nz.ac.ara.aort;

import nz.ac.ara.aort.entities.*;
import nz.ac.ara.aort.entities.Position;
import nz.ac.ara.aort.entities.Staff;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

/**
 * Created by juniar_r on 8/22/2016.
 */
@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Position.class);
        config.exposeIdsFor(Staff.class);
        config.exposeIdsFor(Observation.class);
        config.exposeIdsFor(RatingReference.class);
        config.exposeIdsFor(StrengthImprovement.class);
        config.exposeIdsFor(StrengthImprovementReference.class);
        config.exposeIdsFor(UserRole.class);
        config.exposeIdsFor(Report.class);
        config.exposeIdsFor(Parameter.class);
    }
}
