package com.oaktonridge.eriche.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oaktonridge.eriche.model.SampleStatus;
import com.oaktonridge.eriche.service.SampleService;

@RestController
public class SampleRestController {
	final static Logger logger = LoggerFactory.getLogger(SampleRestController.class);

	@Autowired
	private SampleService sampleService;

	@GetMapping(value = "/start", produces = "application/json; charset=UTF-8")
	public SampleStatus start() {
		logger.info("Starting Sample");
		sampleService.doStart();
		return new SampleStatus(true);
	}

	@GetMapping(value = "/stop", produces = "application/json; charset=UTF-8")
	public SampleStatus stop() {
		logger.info("Stopping sample");
		sampleService.doStop();
		return new SampleStatus(false);
	}

	@GetMapping("/monitor")
	public int monitor() {
		logger.info("Monitoring sample");
		return sampleService.doMonitor();
	}
}
