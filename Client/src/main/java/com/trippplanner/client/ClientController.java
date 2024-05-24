package com.trippplanner.client;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/clients")
@AllArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/register-client")
    public void registerCustomer(@RequestBody ClientRegistrationRequest clientRegistrationRequest) {
        log.info("New Customer registration {}", clientRegistrationRequest);
        clientService.registerClient(clientRegistrationRequest);
    }

    @GetMapping("/client-exists-by-username")
    public boolean clientExistsByUsername(@RequestParam("username") String username) {
        boolean response = clientService.clientExistsByUsername(username);
        log.info("Client exists by username: {}", response);
        return response;
    }

    @GetMapping("/client-exists-by-email")
    public boolean clientExistsByEmail(@RequestParam("email") String email) {
        boolean response = clientService.clientExistsByEmail(email);
        log.info("Client exists by email: {}", response);
        return response;
    }

}
