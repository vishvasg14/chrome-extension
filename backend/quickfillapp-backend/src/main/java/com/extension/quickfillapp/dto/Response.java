package com.extension.quickfillapp.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response {
	Object data;
	String message;
	int statusCode;
	
	public static ResponseEntity<Response> getResponse(String message, Object data, HttpStatus status) {
		return ResponseEntity.status(status).body(new Response(data, message, status.value()));
	}
	
	public static ResponseEntity<Response> getResponse(String message, Object data) {
		return ResponseEntity.status(HttpStatus.OK).body(new Response(data, message, HttpStatus.OK.value()));
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public Response(Object data, String message, int statusCode) {
		super();
		this.data = data;
		this.message = message;
		this.statusCode = statusCode;
	}

	public Response() {
		super();
	}

}