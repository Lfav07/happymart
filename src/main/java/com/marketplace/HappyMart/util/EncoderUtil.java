package com.marketplace.HappyMart.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class EncoderUtil {
    public static void main(String[] args) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


        String rawPassword = "adminPassword123";


        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Encoded Password: " + encodedPassword);


        boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
        System.out.println("Password matches: " + matches);
    }
}
