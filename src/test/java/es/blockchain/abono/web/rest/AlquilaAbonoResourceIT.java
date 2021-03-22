package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.AlquilaAbono;
import es.blockchain.abono.repository.AlquilaAbonoRepository;

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
 * Integration tests for the {@link AlquilaAbonoResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AlquilaAbonoResourceIT {

    @Autowired
    private AlquilaAbonoRepository alquilaAbonoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAlquilaAbonoMockMvc;

    private AlquilaAbono alquilaAbono;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlquilaAbono createEntity(EntityManager em) {
        AlquilaAbono alquilaAbono = new AlquilaAbono();
        return alquilaAbono;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlquilaAbono createUpdatedEntity(EntityManager em) {
        AlquilaAbono alquilaAbono = new AlquilaAbono();
        return alquilaAbono;
    }

    @BeforeEach
    public void initTest() {
        alquilaAbono = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlquilaAbono() throws Exception {
        int databaseSizeBeforeCreate = alquilaAbonoRepository.findAll().size();
        // Create the AlquilaAbono
        restAlquilaAbonoMockMvc.perform(post("/api/alquila-abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(alquilaAbono)))
            .andExpect(status().isCreated());

        // Validate the AlquilaAbono in the database
        List<AlquilaAbono> alquilaAbonoList = alquilaAbonoRepository.findAll();
        assertThat(alquilaAbonoList).hasSize(databaseSizeBeforeCreate + 1);
        AlquilaAbono testAlquilaAbono = alquilaAbonoList.get(alquilaAbonoList.size() - 1);
    }

    @Test
    @Transactional
    public void createAlquilaAbonoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alquilaAbonoRepository.findAll().size();

        // Create the AlquilaAbono with an existing ID
        alquilaAbono.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlquilaAbonoMockMvc.perform(post("/api/alquila-abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(alquilaAbono)))
            .andExpect(status().isBadRequest());

        // Validate the AlquilaAbono in the database
        List<AlquilaAbono> alquilaAbonoList = alquilaAbonoRepository.findAll();
        assertThat(alquilaAbonoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAlquilaAbonos() throws Exception {
        // Initialize the database
        alquilaAbonoRepository.saveAndFlush(alquilaAbono);

        // Get all the alquilaAbonoList
        restAlquilaAbonoMockMvc.perform(get("/api/alquila-abonos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alquilaAbono.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAlquilaAbono() throws Exception {
        // Initialize the database
        alquilaAbonoRepository.saveAndFlush(alquilaAbono);

        // Get the alquilaAbono
        restAlquilaAbonoMockMvc.perform(get("/api/alquila-abonos/{id}", alquilaAbono.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(alquilaAbono.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAlquilaAbono() throws Exception {
        // Get the alquilaAbono
        restAlquilaAbonoMockMvc.perform(get("/api/alquila-abonos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlquilaAbono() throws Exception {
        // Initialize the database
        alquilaAbonoRepository.saveAndFlush(alquilaAbono);

        int databaseSizeBeforeUpdate = alquilaAbonoRepository.findAll().size();

        // Update the alquilaAbono
        AlquilaAbono updatedAlquilaAbono = alquilaAbonoRepository.findById(alquilaAbono.getId()).get();
        // Disconnect from session so that the updates on updatedAlquilaAbono are not directly saved in db
        em.detach(updatedAlquilaAbono);

        restAlquilaAbonoMockMvc.perform(put("/api/alquila-abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlquilaAbono)))
            .andExpect(status().isOk());

        // Validate the AlquilaAbono in the database
        List<AlquilaAbono> alquilaAbonoList = alquilaAbonoRepository.findAll();
        assertThat(alquilaAbonoList).hasSize(databaseSizeBeforeUpdate);
        AlquilaAbono testAlquilaAbono = alquilaAbonoList.get(alquilaAbonoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAlquilaAbono() throws Exception {
        int databaseSizeBeforeUpdate = alquilaAbonoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlquilaAbonoMockMvc.perform(put("/api/alquila-abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(alquilaAbono)))
            .andExpect(status().isBadRequest());

        // Validate the AlquilaAbono in the database
        List<AlquilaAbono> alquilaAbonoList = alquilaAbonoRepository.findAll();
        assertThat(alquilaAbonoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAlquilaAbono() throws Exception {
        // Initialize the database
        alquilaAbonoRepository.saveAndFlush(alquilaAbono);

        int databaseSizeBeforeDelete = alquilaAbonoRepository.findAll().size();

        // Delete the alquilaAbono
        restAlquilaAbonoMockMvc.perform(delete("/api/alquila-abonos/{id}", alquilaAbono.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AlquilaAbono> alquilaAbonoList = alquilaAbonoRepository.findAll();
        assertThat(alquilaAbonoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
