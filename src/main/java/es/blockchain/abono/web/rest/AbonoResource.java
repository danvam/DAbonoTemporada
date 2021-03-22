package es.blockchain.abono.web.rest;

import es.blockchain.abono.domain.Abono;
import es.blockchain.abono.repository.AbonoRepository;
import es.blockchain.abono.security.AuthoritiesConstants;
import es.blockchain.abono.security.SecurityUtils;
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
 * REST controller for managing {@link es.blockchain.abono.domain.Abono}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AbonoResource {

    private final Logger log = LoggerFactory.getLogger(AbonoResource.class);

    private static final String ENTITY_NAME = "abono";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AbonoRepository abonoRepository;

    public AbonoResource(AbonoRepository abonoRepository) {
        this.abonoRepository = abonoRepository;
    }

    /**
     * {@code POST  /abonos} : Create a new abono.
     *
     * @param abono the abono to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new abono, or with status {@code 400 (Bad Request)} if the abono has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/abonos")
    public ResponseEntity<Abono> createAbono(@RequestBody Abono abono) throws URISyntaxException {
        log.debug("REST request to save Abono : {}", abono);
        if (abono.getId() != null) {
            throw new BadRequestAlertException("A new abono cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Abono result = abonoRepository.save(abono);
        return ResponseEntity.created(new URI("/api/abonos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /abonos} : Updates an existing abono.
     *
     * @param abono the abono to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated abono,
     * or with status {@code 400 (Bad Request)} if the abono is not valid,
     * or with status {@code 500 (Internal Server Error)} if the abono couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/abonos")
    public ResponseEntity<Abono> updateAbono(@RequestBody Abono abono) throws URISyntaxException {
        log.debug("REST request to update Abono : {}", abono);
        if (abono.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Abono result = abonoRepository.save(abono);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, abono.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /abonos} : get all the abonos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of abonos in body.
     */
    @GetMapping("/abonos")
    public List<Abono> getAllAbonos() {
        log.debug("REST request to get all Abonos");
        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
        if (userLogin.isPresent() && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)){
            log.debug("REST request to get all Abonos CurrentUserLogin " + userLogin.get());
            return abonoRepository.findAllByInternalUserInternalUserLogin(userLogin.get());
        }
        return abonoRepository.findAll();
    }

    /**
     * {@code GET  /abonos/:id} : get the "id" abono.
     *
     * @param id the id of the abono to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the abono, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/abonos/{id}")
    public ResponseEntity<Abono> getAbono(@PathVariable Long id) {
        log.debug("REST request to get Abono : {}", id);
        Optional<Abono> abono = abonoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(abono);
    }

    /**
     * {@code DELETE  /abonos/:id} : delete the "id" abono.
     *
     * @param id the id of the abono to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/abonos/{id}")
    public ResponseEntity<Void> deleteAbono(@PathVariable Long id) {
        log.debug("REST request to delete Abono : {}", id);
        abonoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
