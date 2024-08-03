package com.extension.quickfillapp.dto;

public class RegistrationReqDto {

	private String firstName;
	private String lastName;
	private String personalEmail;
	private String password;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPersonalEmail() {
		return personalEmail;
	}

	public void setPersonalemail(String personalEmail) {
		this.personalEmail = personalEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public RegistrationReqDto(String firstName, String lastName, String personalEmail, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.personalEmail = personalEmail;
		this.password = password;
	}

	public RegistrationReqDto() {
		super();
		// TODO Auto-generated constructor stub
	}

}
