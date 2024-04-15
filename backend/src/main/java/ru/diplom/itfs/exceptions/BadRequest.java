package ru.diplom.itfs.exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BadRequest extends RuntimeException {

    public BadRequest(String message) {
        super(message);
    }
}
