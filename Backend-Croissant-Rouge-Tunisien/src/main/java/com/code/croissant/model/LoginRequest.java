package com.code.croissant.model;

public class LoginRequest {
    private String email;
    private String password;

    // getters et setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
//Cette classe sert à recevoir l’email et le mot de passe pour le login.