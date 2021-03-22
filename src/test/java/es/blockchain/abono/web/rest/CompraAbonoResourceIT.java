package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.CompraAbono;
import es.blockchain.abono.repository.CompraAbonoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CompraAbonoResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CompraAbonoResourceIT {

    @Autowired
    private CompraAbonoRepository compraAbonoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCompraAbonoMockMvc;

    private CompraAbono compraAbono;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompraAbono createEntity(EntityManager em) {
        CompraAbono compraAbono = new CompraAbono();
        return compraAbono;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompraAbono createUpdatedEntity(EntityManager em) {
        CompraAbono compraAbono = new CompraAbono();
        return compraAbono;
    }

    @BeforeEach
    public void initTest() {
        compraAbono = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompraAbono() throws Exception {
        int databaseSizeBeforeCreate = compraAbonoRepository.findAll().size();
        // Create the CompraAbono
        restCompraAbonoMockMvc.perform(post("/api/compra-abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(compraAbono)))
            .andExpect(status().isCreated());

        // Validate the CompraAbono in the database
        List<CompraAbono> compraAbonoList = compraAbonoRepository.findAll();
        assertThat(compraAbonoList).hasSize(databaseSizeBeforeCreate + 1);
        CompraAbono testCompraAbono = compraAbonoList.get(compraAbonoList.size() - 1);
    }

    @Test
    @Transactional
    public void createCompraAbonoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = compraAbonoRepository.findAll().size();

        // Create the CompraAbono with an existing ID
        compraAbono.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompraAbonoMockMvc.perform(post("/api/compra-abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(compraAbono)))
            .andExpect(status().isBadRequest());

        // Validate the CompraAbono in the database
        List<CompraAbono> compraAbonoList = compraAbonoRepository.findAll();
        assertThat(compraAbonoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCompraAbonos() throws Exception {
        // Initialize the database
        compraAbonoRepository.saveAndFlush(compraAbono);

        // Get all the compraAbonoList
        restCompraAbonoMockMvc.perform(get("/api/compra-abonos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(compraAbono.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCompraAbono() throws Exception {
        // Initialize the database
        compraAbonoRepository.saveAndFlush(compraAbono);

        // Get the compraAbono
        restCompraAbonoMockMvc.perform(get("/api/compra-abonos/{id}", compraAbono.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(compraAbono.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCompraAbono() throws Exception {
        // Get the compraAbono
        restCompraAbonoMockMvc.perform(get("/api/compra-abonos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompraAbono() throws Exception {
        // Initialize the database
        compraAbonoRepository.saveAndFlush(compraAbono);

        int databaseSizeBeforeUpdate = compraAbonoRepository.findAll().size();

        // Update the compraAbono
        CompraAbono updatedCompraAbono = compraAbonoRepository.findById(compraAbono.getId()).get();
        // Disconnect from session so that the updates on updatedCompraAbono are not directly saved in db
        em.detach(updatedCompraAbono);

        restCompraAbonoMockMvc.perform(put("/api/compra-abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompraAbono)))
            .andExpect(status().isOk());

        // Validate the CompraAbono in the database
        List<CompraAbono> compraAbonoList = compraAbonoRepository.findAll();
        assertThat(compraAbonoList).hasSize(databaseSizeBeforeUpdate);
        CompraAbono testCompraAbono = compraAbonoList.get(compraAbonoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCompraAbono() throws Exception {
        int databaseSizeBeforeUpdate = compraAbonoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompraAbonoMockMvc.perform(put("/api/compra-abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(compraAbono)))
            .andExpect(status().isBadRequest());

        // Validate the CompraAbono in the database
        List<CompraAbono> compraAbonoList = compraAbonoRepository.findAll();
        assertThat(compraAbonoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompraAbono() throws Exception {
        // Initialize the database
        compraAbonoRepository.saveAndFlush(compraAbono);

        int databaseSizeBeforeDelete = compraAbonoRepository.findAll().size();

        // Delete the compraAbono
        restCompraAbonoMockMvc.perform(delete("/api/compra-abonos/{id}", compraAbono.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CompraAbono> compraAbonoList = compraAbonoRepository.findAll();
        assertThat(compraAbonoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
