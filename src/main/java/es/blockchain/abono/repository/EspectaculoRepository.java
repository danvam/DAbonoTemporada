package es.blockchain.abono.repository;

import es.blockchain.abono.domain.Espectaculo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Espectaculo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspectaculoRepository extends JpaRepository<Espectaculo, Long> {
}
