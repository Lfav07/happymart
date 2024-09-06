package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public interface UserService extends UserDetailsService {
    UserDetails loadUserByUsername(String username);

    List<User> findAllUsers();

    User findUserByUsername(String username);

    User findUserById(Long id);

    void saveUser(User user);
    void updatePassword(String username, String newPassword);
}

