package es.blockchain.abono.repository;

import es.blockchain.abono.domain.AlquilaAbono;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AlquilaAbono entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlquilaAbonoRepository extends JpaRepository<AlquilaAbono, Long> {

 List<AlquilaAbono> findAllByInternalUserInternalUserLogin(String login);
}
