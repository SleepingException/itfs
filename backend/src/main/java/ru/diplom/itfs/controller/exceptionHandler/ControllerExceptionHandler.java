package ru.diplom.itfs.controller.exceptionHandler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.diplom.itfs.exceptions.BadRequest;

import java.util.Map;

/**
 * Обработчик ошибок.
 */
@ControllerAdvice
@Slf4j
public class ControllerExceptionHandler {

    @ExceptionHandler(BadRequest.class)
    public ResponseEntity<?> handleBadRequestException(BadRequest e) {
        return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAnyExceptions(Exception e) {
        log.error(e.fillInStackTrace().toString());
        return ResponseEntity.internalServerError()
                .body(Map.of("message", e.getMessage()));
    }
}

