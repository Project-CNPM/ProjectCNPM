package com.javaweb.newswebsite.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.javaweb.newswebsite.entity.RoleEntity;
import com.javaweb.newswebsite.entity.UserEntity;
import com.javaweb.newswebsite.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;
  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();


//  static {
//    inMemoryUserList.add(new JwtUserDetails(1L, "in28minutes",
//            "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
//  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserEntity userEntity=userRepository.findByUserNameAndStatus(username, 1).get();
//    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
//            .filter(user -> user.getUsername().equals(username)).findFirst();

    if (userEntity ==null) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }
    List<GrantedAuthority> authorities=new ArrayList<>();
    for(RoleEntity role:userEntity.getRoles()){
      authorities.add(new SimpleGrantedAuthority(role.getCode()));
    }
    JwtUserDetails myUser= new JwtUserDetails(userEntity.getId(),userEntity.getUserName(),userEntity.getPassword(),authorities);

    return myUser;
  }

}