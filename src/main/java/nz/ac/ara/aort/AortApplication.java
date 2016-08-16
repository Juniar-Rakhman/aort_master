package nz.ac.ara.aort;

import nz.ac.ara.aort.services.ObservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AortApplication {

	private static final Logger log = LoggerFactory.getLogger(AortApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(AortApplication.class, args);
	}

	@Bean
	public CommandLineRunner start(ObservationService service){
		return args -> {
			log.info("@@ Inserting Data....");
			service.insertTestData();
		};
	}
}
