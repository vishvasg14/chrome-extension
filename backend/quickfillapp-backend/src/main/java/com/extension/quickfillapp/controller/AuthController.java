package com.extension.quickfillapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.extension.quickfillapp.dto.LoginInfoDto;
import com.extension.quickfillapp.dto.LoginResponseDto;
import com.extension.quickfillapp.dto.RegistrationReqDto;
import com.extension.quickfillapp.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/login")
	public LoginResponseDto login(@RequestBody LoginInfoDto loginInfoDto) throws Exception {
		LoginResponseDto onLogin = authService.loginProfile(loginInfoDto);
		return onLogin;
	}
	
	@PostMapping("/registration")
	public LoginResponseDto registration(@RequestBody RegistrationReqDto registrationReqDto) throws Exception{
		LoginResponseDto onRegistration = authService.registrationProfile(registrationReqDto);
		return onRegistration;
	}
}
