package es.blockchain.abono.repository;

import es.blockchain.abono.domain.AprobarTokens;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the AprobarTokens entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AprobarTokensRepository extends JpaRepository<AprobarTokens, Long> {


 List<AprobarTokens> findAllByApplicationUserInternalUserLogin(String login);

}
