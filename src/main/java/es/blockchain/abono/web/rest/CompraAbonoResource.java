package es.blockchain.abono.web.rest;

import es.blockchain.abono.domain.CompraAbono;
import es.blockchain.abono.repository.CompraAbonoRepository;
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
 * REST controller for managing {@link es.blockchain.abono.domain.CompraAbono}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CompraAbonoResource {

    private final Logger log = LoggerFactory.getLogger(CompraAbonoResource.class);

    private static final String ENTITY_NAME = "compraAbono";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompraAbonoRepository compraAbonoRepository;

    public CompraAbonoResource(CompraAbonoRepository compraAbonoRepository) {
        this.compraAbonoRepository = compraAbonoRepository;
    }

    /**
     * {@code POST  /compra-abonos} : Create a new compraAbono.
     *
     * @param compraAbono the compraAbono to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new compraAbono, or with status {@code 400 (Bad Request)} if the compraAbono has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/compra-abonos")
    public ResponseEntity<CompraAbono> createCompraAbono(@RequestBody CompraAbono compraAbono) throws URISyntaxException {
        log.debug("REST request to save CompraAbono : {}", compraAbono);
        if (compraAbono.getId() != null) {
            throw new BadRequestAlertException("A new compraAbono cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompraAbono result = compraAbonoRepository.save(compraAbono);
        return ResponseEntity.created(new URI("/api/compra-abonos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /compra-abonos} : Updates an existing compraAbono.
     *
     * @param compraAbono the compraAbono to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated compraAbono,
     * or with status {@code 400 (Bad Request)} if the compraAbono is not valid,
     * or with status {@code 500 (Internal Server Error)} if the compraAbono couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/compra-abonos")
    public ResponseEntity<CompraAbono> updateCompraAbono(@RequestBody CompraAbono compraAbono) throws URISyntaxException {
        log.debug("REST request to update CompraAbono : {}", compraAbono);
        if (compraAbono.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompraAbono result = compraAbonoRepository.save(compraAbono);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, compraAbono.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /compra-abonos} : get all the compraAbonos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of compraAbonos in body.
     */
    @GetMapping("/compra-abonos")
    public List<CompraAbono> getAllCompraAbonos() {
        log.debug("REST request to get all CompraAbonos");
        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
        if (userLogin.isPresent() && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)){
            log.debug("REST request to get all CompraAbonos CurrentUserLogin " + userLogin.get());
            return compraAbonoRepository.findAllByInternalUserInternalUserLogin(userLogin.get());
        }
        return compraAbonoRepository.findAll();        
    }

    /**
     * {@code GET  /compra-abonos/:id} : get the "id" compraAbono.
     *
     * @param id the id of the compraAbono to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the compraAbono, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/compra-abonos/{id}")
    public ResponseEntity<CompraAbono> getCompraAbono(@PathVariable Long id) {
        log.debug("REST request to get CompraAbono : {}", id);
        Optional<CompraAbono> compraAbono = compraAbonoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(compraAbono);
    }

    /**
     * {@code DELETE  /compra-abonos/:id} : delete the "id" compraAbono.
     *
     * @param id the id of the compraAbono to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/compra-abonos/{id}")
    public ResponseEntity<Void> deleteCompraAbono(@PathVariable Long id) {
        log.debug("REST request to delete CompraAbono : {}", id);
        compraAbonoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
