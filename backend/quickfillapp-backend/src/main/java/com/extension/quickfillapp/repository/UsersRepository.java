package com.extension.quickfillapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.extension.quickfillapp.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {

	Users findByPersonalemail(String username);
}
