package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }






    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));
    }


    @Override
    @Transactional
    public User saveUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("User already exists!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void updatePassword(String username, String newPassword) {
        User existingUser = userRepository.findByUsername(username);
        if (existingUser == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        existingUser.setPassword(encodedNewPassword);
        userRepository.save(existingUser);
    }
}
