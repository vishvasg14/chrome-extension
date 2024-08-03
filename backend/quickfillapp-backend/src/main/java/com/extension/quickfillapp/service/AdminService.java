package com.extension.quickfillapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.extension.quickfillapp.repository.UsersRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AdminService {

	@Autowired
	private JwtService jwtService;

	@Autowired
	private HttpServletRequest httpServletRequest;

	@Autowired
	private UsersRepository userRepository;


	
	
	
}
