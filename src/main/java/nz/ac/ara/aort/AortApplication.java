package nz.ac.ara.aort;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AortApplication {
	
	private static final Logger log = LoggerFactory.getLogger(AortApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(AortApplication.class, args);
	}
	
}
