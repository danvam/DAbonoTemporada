package es.blockchain.abono.web.rest;

import es.blockchain.abono.domain.Temporada;
import es.blockchain.abono.repository.TemporadaRepository;
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
 * REST controller for managing {@link es.blockchain.abono.domain.Temporada}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TemporadaResource {

    private final Logger log = LoggerFactory.getLogger(TemporadaResource.class);

    private static final String ENTITY_NAME = "temporada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TemporadaRepository temporadaRepository;

    public TemporadaResource(TemporadaRepository temporadaRepository) {
        this.temporadaRepository = temporadaRepository;
    }

    /**
     * {@code POST  /temporadas} : Create a new temporada.
     *
     * @param temporada the temporada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new temporada, or with status {@code 400 (Bad Request)} if the temporada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/temporadas")
    public ResponseEntity<Temporada> createTemporada(@Valid @RequestBody Temporada temporada) throws URISyntaxException {
        log.debug("REST request to save Temporada : {}", temporada);
        if (temporada.getId() != null) {
            throw new BadRequestAlertException("A new temporada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Temporada result = temporadaRepository.save(temporada);
        return ResponseEntity.created(new URI("/api/temporadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /temporadas} : Updates an existing temporada.
     *
     * @param temporada the temporada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated temporada,
     * or with status {@code 400 (Bad Request)} if the temporada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the temporada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/temporadas")
    public ResponseEntity<Temporada> updateTemporada(@Valid @RequestBody Temporada temporada) throws URISyntaxException {
        log.debug("REST request to update Temporada : {}", temporada);
        if (temporada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Temporada result = temporadaRepository.save(temporada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, temporada.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /temporadas} : get all the temporadas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of temporadas in body.
     */
    @GetMapping("/temporadas")
    public List<Temporada> getAllTemporadas() {
        log.debug("REST request to get all Temporadas");
        return temporadaRepository.findAll();
    }

    /**
     * {@code GET  /temporadas/:id} : get the "id" temporada.
     *
     * @param id the id of the temporada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the temporada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/temporadas/{id}")
    public ResponseEntity<Temporada> getTemporada(@PathVariable Long id) {
        log.debug("REST request to get Temporada : {}", id);
        Optional<Temporada> temporada = temporadaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(temporada);
    }

    /**
     * {@code DELETE  /temporadas/:id} : delete the "id" temporada.
     *
     * @param id the id of the temporada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/temporadas/{id}")
    public ResponseEntity<Void> deleteTemporada(@PathVariable Long id) {
        log.debug("REST request to delete Temporada : {}", id);
        temporadaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
