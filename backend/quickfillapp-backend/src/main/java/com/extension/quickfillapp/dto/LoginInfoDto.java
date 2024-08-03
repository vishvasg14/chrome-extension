package com.extension.quickfillapp.dto;

public class LoginInfoDto {

	private String personalEmail;
	private String password;

	public LoginInfoDto(String firstName, String lastName, String personalEmail, String password) {
		super();
		this.personalEmail = personalEmail;
		this.password = password;
	}

	public LoginInfoDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getPersonalEmail() {
		return personalEmail;
	}

	public void setPersonalEmail(String personalEmail) {
		this.personalEmail = personalEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
