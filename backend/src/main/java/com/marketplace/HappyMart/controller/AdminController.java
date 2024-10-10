package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.model.Role;
import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/admin")
public class AdminController {


    @Autowired
    private final UserServiceImpl userService;

    @Autowired
    public AdminController(UserServiceImpl userService) {
        this.userService = userService;
    }


    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdmin(@RequestBody User user) {
        try {
            user.setRoles(Set.of(Role.ROLE_ADMIN));
            userService.saveUser(user);
            return ResponseEntity.ok("Admin user created successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
