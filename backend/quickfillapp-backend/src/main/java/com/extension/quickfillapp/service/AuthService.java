package com.extension.quickfillapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.extension.quickfillapp.dto.LoginInfoDto;
import com.extension.quickfillapp.dto.LoginResponseDto;
import com.extension.quickfillapp.dto.RegistrationReqDto;
import com.extension.quickfillapp.entity.Role;
import com.extension.quickfillapp.entity.Users;
import com.extension.quickfillapp.exception.CustomException;
import com.extension.quickfillapp.repository.UsersRepository;

@Service
public class AuthService {

	@Autowired
	private UsersRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtService jwtService;

	
	public LoginResponseDto loginProfile(LoginInfoDto loginInfoDto) throws Exception{
		Users existingUser = userRepository.findByPersonalemail(loginInfoDto.getPersonalEmail());
		if (existingUser == null) {
			throw new CustomException("User does not exist!");
		}

		if (!passwordEncoder.matches(loginInfoDto.getPassword(), existingUser.getPassword())) {
			throw new CustomException("Invalid credentials!");
		}

		String token = jwtService.generateToken(existingUser);
		LoginResponseDto loginResponseDto = new LoginResponseDto(token, existingUser.getRole());

		return loginResponseDto;
	}
	
	public LoginResponseDto registrationProfile(RegistrationReqDto registrationReqDto)throws Exception{
		Users existingUser = userRepository.findByPersonalemail(registrationReqDto.getPersonalEmail());
		if (existingUser != null) {
			throw new CustomException("User already exist!");
		}
		Users newUser = new Users();
		newUser.setFirstname(registrationReqDto.getFirstName());
		newUser.setLastname(registrationReqDto.getLastName());
		newUser.setPersonalemail(registrationReqDto.getPersonalEmail());
		newUser.setPassword(passwordEncoder.encode(registrationReqDto.getPassword()));
		newUser.setRole(Role.ROLE_USER);
		userRepository.save(newUser);
		
		String token = jwtService.generateToken(newUser);
		LoginResponseDto loginResponseDto = new LoginResponseDto(token, newUser.getRole());

		return loginResponseDto;
	}
	
	
}
