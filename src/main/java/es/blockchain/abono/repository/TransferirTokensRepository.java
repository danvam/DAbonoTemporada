package es.blockchain.abono.repository;

import es.blockchain.abono.domain.TransferirTokens;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TransferirTokens entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransferirTokensRepository extends JpaRepository<TransferirTokens, Long> {
}
