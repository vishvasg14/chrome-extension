package com.extension.quickfillapp.dto;

import com.extension.quickfillapp.entity.Role;

public class LoginResponseDto {

	private String token;
	private Role role;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public LoginResponseDto(String token, Role role) {
		super();
		this.token = token;
		this.role = role;
	}

	public LoginResponseDto() {
		super();
		// TODO Auto-generated constructor stub
	}

}
