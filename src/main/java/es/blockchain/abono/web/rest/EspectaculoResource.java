package es.blockchain.abono.web.rest;

import es.blockchain.abono.domain.Espectaculo;
import es.blockchain.abono.repository.EspectaculoRepository;
import es.blockchain.abono.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link es.blockchain.abono.domain.Espectaculo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EspectaculoResource {

    private final Logger log = LoggerFactory.getLogger(EspectaculoResource.class);

    private static final String ENTITY_NAME = "espectaculo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EspectaculoRepository espectaculoRepository;

    public EspectaculoResource(EspectaculoRepository espectaculoRepository) {
        this.espectaculoRepository = espectaculoRepository;
    }

    /**
     * {@code POST  /espectaculos} : Create a new espectaculo.
     *
     * @param espectaculo the espectaculo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new espectaculo, or with status {@code 400 (Bad Request)} if the espectaculo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/espectaculos")
    public ResponseEntity<Espectaculo> createEspectaculo(@Valid @RequestBody Espectaculo espectaculo) throws URISyntaxException {
        log.debug("REST request to save Espectaculo : {}", espectaculo);
        if (espectaculo.getId() != null) {
            throw new BadRequestAlertException("A new espectaculo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Espectaculo result = espectaculoRepository.save(espectaculo);
        return ResponseEntity.created(new URI("/api/espectaculos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /espectaculos} : Updates an existing espectaculo.
     *
     * @param espectaculo the espectaculo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated espectaculo,
     * or with status {@code 400 (Bad Request)} if the espectaculo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the espectaculo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/espectaculos")
    public ResponseEntity<Espectaculo> updateEspectaculo(@Valid @RequestBody Espectaculo espectaculo) throws URISyntaxException {
        log.debug("REST request to update Espectaculo : {}", espectaculo);
        if (espectaculo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Espectaculo result = espectaculoRepository.save(espectaculo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, espectaculo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /espectaculos} : get all the espectaculos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of espectaculos in body.
     */
    @GetMapping("/espectaculos")
    public List<Espectaculo> getAllEspectaculos() {
        log.debug("REST request to get all Espectaculos");
        return espectaculoRepository.findAll();
    }

    /**
     * {@code GET  /espectaculos/:id} : get the "id" espectaculo.
     *
     * @param id the id of the espectaculo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the espectaculo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/espectaculos/{id}")
    public ResponseEntity<Espectaculo> getEspectaculo(@PathVariable Long id) {
        log.debug("REST request to get Espectaculo : {}", id);
        Optional<Espectaculo> espectaculo = espectaculoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(espectaculo);
    }

    /**
     * {@code DELETE  /espectaculos/:id} : delete the "id" espectaculo.
     *
     * @param id the id of the espectaculo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/espectaculos/{id}")
    public ResponseEntity<Void> deleteEspectaculo(@PathVariable Long id) {
        log.debug("REST request to delete Espectaculo : {}", id);
        espectaculoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
