package com.trippplanner.client;

public record ClientRegistrationRequest(String email, String username, String password, Boolean isVerified) {
}
