package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.service.interfaces.AdminService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    private final List<String> validCodes = Arrays.asList("CODE123", "CODE456", "CODE789");

    public boolean validateSecurityCode(String securityCode) {
        return validCodes.contains(securityCode);
    }
}
