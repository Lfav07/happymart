package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.dto.UserDTO;
import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.service.interfaces.UserService;
import com.marketplace.HappyMart.config.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder errorMessages = new StringBuilder("Validation failed: ");
            result.getAllErrors().forEach(error -> errorMessages.append(error.getDefaultMessage()).append("; "));
            return ResponseEntity.badRequest().body(errorMessages.toString());
        }

        try {
            userService.saveUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while saving user: " + e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting user: " + e.getMessage());
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserDTO updatedUser) {
        try {
            userService.updateUser(id, updatedUser);
            return ResponseEntity.ok("User updated successfully");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while updating user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginRequest, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();


            List<String> roles = userDetails.getAuthorities().stream()
                    .map(authority -> authority.getAuthority().replace("ROLE_", "")) // Extract role names without the "ROLE_" prefix
                    .collect(Collectors.toList());


            String jwt = jwtUtil.generateToken(userDetails, roles);


            User user = userService.findUserByUsername(loginRequest.getUsername());
            UserDTO userDTO = convertToDTO(user);

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("token", jwt);
            responseMap.put("user", userDTO);

            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }




    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestParam String username, @RequestParam String newPassword) {
        try {
            userService.updatePassword(username, newPassword);
            return ResponseEntity.ok("Password updated successfully");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while updating password: " + e.getMessage());
        }


    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        try {
            User user = userService.findUserByUsername(username);
            UserDTO userDTO = convertToDTO(user);
            return ResponseEntity.ok(userDTO);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/users/id/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        try {
            User user = userService.findUserById(id);
            UserDTO userDTO = convertToDTO(user);
            return ResponseEntity.ok(userDTO);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        return userDTO;
    }


}
