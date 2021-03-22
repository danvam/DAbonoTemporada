package es.blockchain.abono.repository;

import es.blockchain.abono.domain.ApplicationUser;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ApplicationUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

 List<ApplicationUser> findAllByInternalUserLogin(String login);
}
