package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Role;
import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.extension.ExtendWith;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("TestingUser");
        user.setPassword("TestingPassword");
        user.setEmail("TestingEmail");
        user.setRoles(Collections.singleton(Role.ROLE_USER));
    }

    @Test
    void testLoadUserByUsername_UserFound() {
        when(userRepository.findByUsername("TestingUser")).thenReturn(user);

        UserDetails userDetails = userService.loadUserByUsername("TestingUser");

        assertNotNull(userDetails);
        assertEquals("TestingUser", userDetails.getUsername());
        verify(userRepository, times(1)).findByUsername("TestingUser");
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        when(userRepository.findByUsername("UnknownUser")).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername("UnknownUser"));
        verify(userRepository, times(1)).findByUsername("UnknownUser");
    }

    @Test
    void testFindAllUsers() {
        List<User> users = new ArrayList<>();
        users.add(user);
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.findAllUsers();

        assertEquals(1, result.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testFindUserByUsername() {
        when(userRepository.findByUsername("TestingUser")).thenReturn(user);

        User foundUser = userService.findUserByUsername("TestingUser");

        assertNotNull(foundUser);
        assertEquals("TestingUser", foundUser.getUsername());
        verify(userRepository, times(1)).findByUsername("TestingUser");
    }

    @Test
    void testFindUserById_UserFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User foundUser = userService.findUserById(1L);

        assertNotNull(foundUser);
        assertEquals("TestingUser", foundUser.getUsername());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void testFindUserById_UserNotFound() {
        when(userRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.findUserById(2L));
        verify(userRepository, times(1)).findById(2L);
    }

    @Test
    void testSaveUser_UserAlreadyExists() {
        when(userRepository.findByUsername("TestingUser")).thenReturn(user);

        assertThrows(RuntimeException.class, () -> userService.saveUser(user));
        verify(userRepository, times(1)).findByUsername("TestingUser");
        verify(userRepository, times(0)).save(any());
    }

    @Test
    void testSaveUser_UserSavedSuccessfully() {
        when(userRepository.findByUsername("NewUser")).thenReturn(null);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(user)).thenReturn(user);

        user.setUsername("NewUser");
        User savedUser = userService.saveUser(user);

        assertNotNull(savedUser);
        assertEquals("encodedPassword", savedUser.getPassword());
        verify(userRepository, times(1)).findByUsername("NewUser");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdatePassword_UserExists() {
        when(userRepository.findByUsername("TestingUser")).thenReturn(user);
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");

        userService.updatePassword("TestingUser", "newPassword");

        assertEquals("encodedNewPassword", user.getPassword());
        verify(userRepository, times(1)).findByUsername("TestingUser");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdatePassword_UserNotFound() {
        when(userRepository.findByUsername("UnknownUser")).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> userService.updatePassword("UnknownUser", "newPassword"));
        verify(userRepository, times(1)).findByUsername("UnknownUser");
        verify(userRepository, times(0)).save(any());
    }
}
