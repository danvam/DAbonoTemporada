package es.blockchain.abono.web.rest;

import es.blockchain.abono.domain.TransferirTokens;
import es.blockchain.abono.repository.TransferirTokensRepository;
import es.blockchain.abono.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link es.blockchain.abono.domain.TransferirTokens}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TransferirTokensResource {

    private final Logger log = LoggerFactory.getLogger(TransferirTokensResource.class);

    private static final String ENTITY_NAME = "transferirTokens";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransferirTokensRepository transferirTokensRepository;

    public TransferirTokensResource(TransferirTokensRepository transferirTokensRepository) {
        this.transferirTokensRepository = transferirTokensRepository;
    }

    /**
     * {@code POST  /transferir-tokens} : Create a new transferirTokens.
     *
     * @param transferirTokens the transferirTokens to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transferirTokens, or with status {@code 400 (Bad Request)} if the transferirTokens has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transferir-tokens")
    public ResponseEntity<TransferirTokens> createTransferirTokens(@RequestBody TransferirTokens transferirTokens) throws URISyntaxException {
        log.debug("REST request to save TransferirTokens : {}", transferirTokens);
        if (transferirTokens.getId() != null) {
            throw new BadRequestAlertException("A new transferirTokens cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransferirTokens result = transferirTokensRepository.save(transferirTokens);
        return ResponseEntity.created(new URI("/api/transferir-tokens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transferir-tokens} : Updates an existing transferirTokens.
     *
     * @param transferirTokens the transferirTokens to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transferirTokens,
     * or with status {@code 400 (Bad Request)} if the transferirTokens is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transferirTokens couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transferir-tokens")
    public ResponseEntity<TransferirTokens> updateTransferirTokens(@RequestBody TransferirTokens transferirTokens) throws URISyntaxException {
        log.debug("REST request to update TransferirTokens : {}", transferirTokens);
        if (transferirTokens.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransferirTokens result = transferirTokensRepository.save(transferirTokens);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transferirTokens.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transferir-tokens} : get all the transferirTokens.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transferirTokens in body.
     */
    @GetMapping("/transferir-tokens")
    public List<TransferirTokens> getAllTransferirTokens() {
        log.debug("REST request to get all TransferirTokens");
        return transferirTokensRepository.findAll();
    }

    /**
     * {@code GET  /transferir-tokens/:id} : get the "id" transferirTokens.
     *
     * @param id the id of the transferirTokens to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transferirTokens, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transferir-tokens/{id}")
    public ResponseEntity<TransferirTokens> getTransferirTokens(@PathVariable Long id) {
        log.debug("REST request to get TransferirTokens : {}", id);
        Optional<TransferirTokens> transferirTokens = transferirTokensRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transferirTokens);
    }

    /**
     * {@code DELETE  /transferir-tokens/:id} : delete the "id" transferirTokens.
     *
     * @param id the id of the transferirTokens to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transferir-tokens/{id}")
    public ResponseEntity<Void> deleteTransferirTokens(@PathVariable Long id) {
        log.debug("REST request to delete TransferirTokens : {}", id);
        transferirTokensRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
