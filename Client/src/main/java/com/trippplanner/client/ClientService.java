package com.trippplanner.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Autowired
    public BCryptPasswordEncoder bCryptPasswordEncoder;

    public void registerClient(ClientRegistrationRequest request) {
        Client client = Client.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .username(request.username())
                .password(bCryptPasswordEncoder.encode(request.password()))
                .build();

        clientRepository.save(client);
    }

    public boolean clientExistsByUsername(String username) {
        return clientRepository.existsByUsername(username);
    }

    public boolean clientExistsByEmail(String email) {
        return clientRepository.existsByEmail(email);
    }

    @Transactional
    public void updateUserById(String newUsername, String id) {
        Client user = clientRepository.findClientById(id);
        user.setUsername(newUsername);
        System.out.println(user.getEmail() + " updated username to " + user.getUsername() + " successfully.");
        clientRepository.save(user);
    }
}
