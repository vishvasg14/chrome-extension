package com.extension.quickfillapp.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.extension.quickfillapp.entity.Users;
import com.extension.quickfillapp.repository.UsersRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByPersonalemail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        Set<GrantedAuthority> grandtedAuth = new HashSet<>();
        grandtedAuth.add(new SimpleGrantedAuthority(user.getPersonalemail()));
        return new org.springframework.security.core.userdetails.User(user.getPersonalemail(), user.getPassword(), grandtedAuth);
    }
}
