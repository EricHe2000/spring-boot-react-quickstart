package com.oaktonridge.eriche.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SampleService {
	final static Logger logger = LoggerFactory.getLogger(SampleService.class);

	@Value("${favorite.job}")
	private String favoriteJob;

	static int count = 0;
	private boolean started = false;

	public void doStart() {
		logger.info("Start " + favoriteJob);
		started = true;
	}

	public void doStop() {
		logger.info("Stop " + favoriteJob);
		count = 0;
		started = false;
	}

	public int doMonitor() {
		logger.info("Monitoring " + favoriteJob);
		if (started) {
			count++;
		}
		return count;
	}

}
