package com.extension.quickfillapp.exception;

import java.net.BindException;
import java.nio.file.AccessDeniedException;

import org.hibernate.TypeMismatchException;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.extension.quickfillapp.dto.Response;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(Exception.class)
    public ResponseEntity<Response> handleException(Exception ex) {
        return Response.getResponse("An unexpected error occurred: " + ex.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<Response> handleException(NumberFormatException ex) {
        return Response.getResponse("An unexpected error occurred: " + ex.getMessage(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Response> handleException(MethodArgumentTypeMismatchException ex) {
        return Response.getResponse("An error occurred! Please provide a number, not an alphabet, in the URL.", null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Response> handleException(NoResourceFoundException ex) {
        return Response.getResponse("Please provide a correct URL!", null, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Response> handleException(CustomException ex) {
        return Response.getResponse(ex.getMessage(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<Response> handleException(MultipartException ex) {
        return Response.getResponse("You must provide a 'file' to send the request!", null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Response> handleException(MissingServletRequestParameterException ex) {
        return Response.getResponse("Required parameter is missing: " + ex.getParameterName(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Response> handleException(HttpRequestMethodNotSupportedException ex) {
        return Response.getResponse("Request method '" + ex.getMethod() + "' is not supported", null, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Response> handleException(HttpMediaTypeNotSupportedException ex) {
        return Response.getResponse("Media type is not supported!", null, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Response> handleException(DataIntegrityViolationException ex) {
        return Response.getResponse("Duplicate record found, please verify!", null, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Response> handleException(EntityNotFoundException ex) {
        return Response.getResponse("Entity not found: " + ex.getMessage(), null, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Response> handleException(IllegalArgumentException ex) {
        return Response.getResponse("Illegal argument: " + ex.getMessage(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Response> handleException(IllegalStateException ex) {
        return Response.getResponse("Illegal state: " + ex.getMessage(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<Response> handleException(BindException ex) {
        return Response.getResponse("Binding error: " + ex.getMessage(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Response> handleException(ConstraintViolationException ex) {
        return Response.getResponse("Constraint violation: " + ex.getMessage(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Response> handleException(HttpMessageNotReadableException ex) {
        return Response.getResponse("Message not readable: " + ex.getMessage(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotWritableException.class)
    public ResponseEntity<Response> handleException(HttpMessageNotWritableException ex) {
        return Response.getResponse("Message not writable: " + ex.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UnsupportedOperationException.class)
    public ResponseEntity<Response> handleException(UnsupportedOperationException ex) {
        return Response.getResponse("Operation not supported: " + ex.getMessage(), null, HttpStatus.NOT_IMPLEMENTED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Response> handleException(AccessDeniedException ex) {
        return Response.getResponse("Access denied: " + ex.getMessage(), null, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(TypeMismatchException.class)
    public ResponseEntity<Response> handleException(TypeMismatchException ex) {
        return Response.getResponse("Type mismatch: " + ex.getMessage(), null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConversionNotSupportedException.class)
    public ResponseEntity<Response> handleException(ConversionNotSupportedException ex) {
        return Response.getResponse("Conversion not supported: " + ex.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(TransactionSystemException.class)
    public ResponseEntity<Response> handleException(TransactionSystemException ex) {
        return Response.getResponse("Transaction error: " + ex.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    public ResponseEntity<Response> handleException(OptimisticLockingFailureException ex) {
        return Response.getResponse("Optimistic locking failure: " + ex.getMessage(), null, HttpStatus.CONFLICT);
    }
}
