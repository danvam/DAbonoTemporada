package es.blockchain.abono.repository;

import es.blockchain.abono.domain.CompraAbono;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the CompraAbono entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompraAbonoRepository extends JpaRepository<CompraAbono, Long> {

 List<CompraAbono> findAllByInternalUserInternalUserLogin(String login);
}
