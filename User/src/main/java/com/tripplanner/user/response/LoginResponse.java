package com.tripplanner.user.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tripplanner.user.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponse {
		private Boolean success;
		private String message;
		private User user;
		private ErrorType errorType;
}
