package com.example.demo.service;

import com.example.demo.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User save(User user);
    Optional<User> findById(Long id);
    List<User> findAll();
    User update(Long id, User user);
    void deleteById(Long id);
}