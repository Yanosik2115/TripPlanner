package com.trippplanner.client;

public record ClientRegistrationRequest(String firstName, String lastName, String email, String username) {
}
