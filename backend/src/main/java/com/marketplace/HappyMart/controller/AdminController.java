package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.service.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminServiceImpl adminService;

    @Autowired
    public AdminController(AdminServiceImpl adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/validate-security-code")
    public boolean validateSecurityCode(@RequestBody Map<String, String> requestBody) {
        String securityCode = requestBody.get("securityCode");
        return adminService.validateSecurityCode(securityCode);
    }
}
