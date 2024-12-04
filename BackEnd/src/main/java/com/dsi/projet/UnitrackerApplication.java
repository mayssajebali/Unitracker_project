package com.dsi.projet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UnitrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnitrackerApplication.class, args);
	}

}
