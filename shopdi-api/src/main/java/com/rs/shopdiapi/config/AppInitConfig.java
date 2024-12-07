package com.rs.shopdiapi.config;

import com.rs.shopdiapi.domain.entity.Role;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.RoleEnum;
import com.rs.shopdiapi.repository.RoleRepository;
import com.rs.shopdiapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AppInitConfig {
    PasswordEncoder passwordEncoder;

    static String ADMIN_USERNAME = "admin";
    static String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(prefix = "spring", value = "datasource.driver-class-name", havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        log.info("Application initialization...");
        return args -> {
            if (userRepository.findByUsername(ADMIN_USERNAME).isEmpty()) {
                log.info("Create admin user");
                roleRepository.save(Role.builder()
                        .name(RoleEnum.USER.getName())
                        .description("User role")
                        .build());

                Role adminRole = roleRepository.save(Role.builder()
                        .name(RoleEnum.ADMIN.getName())
                        .description("Admin role")
                        .build());

                var roles = new HashSet<Role>();
                roles.add(adminRole);

                User user = User.builder()
                        .username(ADMIN_USERNAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.warn("Admin user created with username: {} and password: {}", ADMIN_USERNAME, ADMIN_PASSWORD);
            }
            log.info("Application initialization completed");
        };
    }
}
