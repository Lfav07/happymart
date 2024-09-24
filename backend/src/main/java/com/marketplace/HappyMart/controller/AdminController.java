package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.model.Role;
import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.service.AdminServiceImpl;
import com.marketplace.HappyMart.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private final AdminServiceImpl adminService;

    @Autowired
    private  final UserServiceImpl userService;

    @Autowired
    public AdminController(AdminServiceImpl adminService, UserServiceImpl userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    @PostMapping("/validate-security-code")
    public boolean validateSecurityCode(@RequestBody Map<String, String> requestBody) {
        String securityCode = requestBody.get("securityCode");
        return adminService.validateSecurityCode(securityCode);
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
