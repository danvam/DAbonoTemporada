package es.blockchain.abono.repository;

import es.blockchain.abono.domain.Abono;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Abono entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AbonoRepository extends JpaRepository<Abono, Long> {

 List<Abono> findAllByInternalUserInternalUserLogin(String login);
}
