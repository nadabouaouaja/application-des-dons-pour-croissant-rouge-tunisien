package com.code.croissant.model;

public class LoginResponse {

    private boolean success;
    private String message;
    private Long id;  // <-- important !

    public LoginResponse(boolean success, String message, Long id) {
        this.success = success;
        this.message = message;
        this.id = id;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Long getId() {
        return id;
    }
}

//Cette classe sert à dire à l’utilisateur si la connexion a réussi ou échoué. ✅