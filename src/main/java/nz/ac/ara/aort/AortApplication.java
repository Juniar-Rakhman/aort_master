package nz.ac.ara.aort;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AortApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AortApplication.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(AortApplication.class, args);
	}
	
}
