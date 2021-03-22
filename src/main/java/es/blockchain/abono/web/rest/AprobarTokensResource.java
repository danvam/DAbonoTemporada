package es.blockchain.abono.web.rest;

import es.blockchain.abono.domain.AprobarTokens;
import es.blockchain.abono.repository.AprobarTokensRepository;
import es.blockchain.abono.web.rest.errors.BadRequestAlertException;
import es.blockchain.abono.security.AuthoritiesConstants;
import es.blockchain.abono.security.SecurityUtils;

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
 * REST controller for managing {@link es.blockchain.abono.domain.AprobarTokens}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AprobarTokensResource {

    private final Logger log = LoggerFactory.getLogger(AprobarTokensResource.class);

    private static final String ENTITY_NAME = "aprobarTokens";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AprobarTokensRepository aprobarTokensRepository;

    public AprobarTokensResource(AprobarTokensRepository aprobarTokensRepository) {
        this.aprobarTokensRepository = aprobarTokensRepository;
    }

    /**
     * {@code POST  /aprobar-tokens} : Create a new aprobarTokens.
     *
     * @param aprobarTokens the aprobarTokens to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aprobarTokens, or with status {@code 400 (Bad Request)} if the aprobarTokens has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/aprobar-tokens")
    public ResponseEntity<AprobarTokens> createAprobarTokens(@RequestBody AprobarTokens aprobarTokens) throws URISyntaxException {
        log.debug("REST request to save AprobarTokens : {}", aprobarTokens);
        if (aprobarTokens.getId() != null) {
            throw new BadRequestAlertException("A new aprobarTokens cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AprobarTokens result = aprobarTokensRepository.save(aprobarTokens);
        return ResponseEntity.created(new URI("/api/aprobar-tokens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /aprobar-tokens} : Updates an existing aprobarTokens.
     *
     * @param aprobarTokens the aprobarTokens to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aprobarTokens,
     * or with status {@code 400 (Bad Request)} if the aprobarTokens is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aprobarTokens couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/aprobar-tokens")
    public ResponseEntity<AprobarTokens> updateAprobarTokens(@RequestBody AprobarTokens aprobarTokens) throws URISyntaxException {
        log.debug("REST request to update AprobarTokens : {}", aprobarTokens);
        if (aprobarTokens.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AprobarTokens result = aprobarTokensRepository.save(aprobarTokens);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aprobarTokens.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /aprobar-tokens} : get all the aprobarTokens.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aprobarTokens in body.
     */
    @GetMapping("/aprobar-tokens")
    public List<AprobarTokens> getAllAprobarTokens() {
        log.debug("REST request to get all AprobarTokens");
        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
        if (userLogin.isPresent() && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)){
            log.debug("REST request to get all AprobarTokens " + userLogin.get());
            return aprobarTokensRepository.findAllByApplicationUserInternalUserLogin(userLogin.get());
        }
        return aprobarTokensRepository.findAll();
    }

    /**
     * {@code GET  /aprobar-tokens/:id} : get the "id" aprobarTokens.
     *
     * @param id the id of the aprobarTokens to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aprobarTokens, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/aprobar-tokens/{id}")
    public ResponseEntity<AprobarTokens> getAprobarTokens(@PathVariable Long id) {
        log.debug("REST request to get AprobarTokens : {}", id);
        Optional<AprobarTokens> aprobarTokens = aprobarTokensRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(aprobarTokens);
    }

    /**
     * {@code DELETE  /aprobar-tokens/:id} : delete the "id" aprobarTokens.
     *
     * @param id the id of the aprobarTokens to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/aprobar-tokens/{id}")
    public ResponseEntity<Void> deleteAprobarTokens(@PathVariable Long id) {
        log.debug("REST request to delete AprobarTokens : {}", id);
        aprobarTokensRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
