package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService extends UserDetailsService {
    UserDetails loadUserByUsername(String username);

    List<User> findAllUsers();

    User findUserByUsername(String username);

    User findUserById(Long id);

    User saveUser(User user);
    void updatePassword(String username, String newPassword);
}

