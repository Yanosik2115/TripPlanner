package com.trippplanner.client;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;


@Data
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@Document(collection = "clients")
public class Client {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;

}
