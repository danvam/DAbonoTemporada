package es.blockchain.abono.web.rest;

import es.blockchain.abono.domain.AlquilaAbono;
import es.blockchain.abono.repository.AlquilaAbonoRepository;
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
 * REST controller for managing {@link es.blockchain.abono.domain.AlquilaAbono}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AlquilaAbonoResource {

    private final Logger log = LoggerFactory.getLogger(AlquilaAbonoResource.class);

    private static final String ENTITY_NAME = "alquilaAbono";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlquilaAbonoRepository alquilaAbonoRepository;

    public AlquilaAbonoResource(AlquilaAbonoRepository alquilaAbonoRepository) {
        this.alquilaAbonoRepository = alquilaAbonoRepository;
    }

    /**
     * {@code POST  /alquila-abonos} : Create a new alquilaAbono.
     *
     * @param alquilaAbono the alquilaAbono to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alquilaAbono, or with status {@code 400 (Bad Request)} if the alquilaAbono has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alquila-abonos")
    public ResponseEntity<AlquilaAbono> createAlquilaAbono(@RequestBody AlquilaAbono alquilaAbono) throws URISyntaxException {
        log.debug("REST request to save AlquilaAbono : {}", alquilaAbono);
        if (alquilaAbono.getId() != null) {
            throw new BadRequestAlertException("A new alquilaAbono cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlquilaAbono result = alquilaAbonoRepository.save(alquilaAbono);
        return ResponseEntity.created(new URI("/api/alquila-abonos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alquila-abonos} : Updates an existing alquilaAbono.
     *
     * @param alquilaAbono the alquilaAbono to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alquilaAbono,
     * or with status {@code 400 (Bad Request)} if the alquilaAbono is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alquilaAbono couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alquila-abonos")
    public ResponseEntity<AlquilaAbono> updateAlquilaAbono(@RequestBody AlquilaAbono alquilaAbono) throws URISyntaxException {
        log.debug("REST request to update AlquilaAbono : {}", alquilaAbono);
        if (alquilaAbono.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AlquilaAbono result = alquilaAbonoRepository.save(alquilaAbono);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alquilaAbono.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /alquila-abonos} : get all the alquilaAbonos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alquilaAbonos in body.
     */
    @GetMapping("/alquila-abonos")
    public List<AlquilaAbono> getAllAlquilaAbonos() {
        log.debug("REST request to get all AlquilaAbonos");
        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
        if (userLogin.isPresent() && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)){
            log.debug("REST request to get all Abonos AlquilaAbonos " + userLogin.get());
            return alquilaAbonoRepository.findAllByInternalUserInternalUserLogin(userLogin.get());
        }
        return alquilaAbonoRepository.findAll();
    }

    /**
     * {@code GET  /alquila-abonos/:id} : get the "id" alquilaAbono.
     *
     * @param id the id of the alquilaAbono to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alquilaAbono, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alquila-abonos/{id}")
    public ResponseEntity<AlquilaAbono> getAlquilaAbono(@PathVariable Long id) {
        log.debug("REST request to get AlquilaAbono : {}", id);
        Optional<AlquilaAbono> alquilaAbono = alquilaAbonoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(alquilaAbono);
    }

    /**
     * {@code DELETE  /alquila-abonos/:id} : delete the "id" alquilaAbono.
     *
     * @param id the id of the alquilaAbono to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alquila-abonos/{id}")
    public ResponseEntity<Void> deleteAlquilaAbono(@PathVariable Long id) {
        log.debug("REST request to delete AlquilaAbono : {}", id);
        alquilaAbonoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
