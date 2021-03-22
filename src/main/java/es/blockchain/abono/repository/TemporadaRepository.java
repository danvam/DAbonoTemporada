package es.blockchain.abono.repository;

import es.blockchain.abono.domain.Temporada;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Temporada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TemporadaRepository extends JpaRepository<Temporada, Long> {
}
