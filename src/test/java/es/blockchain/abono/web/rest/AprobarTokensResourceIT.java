package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.AprobarTokens;
import es.blockchain.abono.repository.AprobarTokensRepository;

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
 * Integration tests for the {@link AprobarTokensResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AprobarTokensResourceIT {

    private static final Long DEFAULT_CANTIDAD = 1L;
    private static final Long UPDATED_CANTIDAD = 2L;

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private AprobarTokensRepository aprobarTokensRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAprobarTokensMockMvc;

    private AprobarTokens aprobarTokens;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AprobarTokens createEntity(EntityManager em) {
        AprobarTokens aprobarTokens = new AprobarTokens()
            .cantidad(DEFAULT_CANTIDAD)
            .password(DEFAULT_PASSWORD);
        return aprobarTokens;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AprobarTokens createUpdatedEntity(EntityManager em) {
        AprobarTokens aprobarTokens = new AprobarTokens()
            .cantidad(UPDATED_CANTIDAD)
            .password(UPDATED_PASSWORD);
        return aprobarTokens;
    }

    @BeforeEach
    public void initTest() {
        aprobarTokens = createEntity(em);
    }

    @Test
    @Transactional
    public void createAprobarTokens() throws Exception {
        int databaseSizeBeforeCreate = aprobarTokensRepository.findAll().size();
        // Create the AprobarTokens
        restAprobarTokensMockMvc.perform(post("/api/aprobar-tokens")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aprobarTokens)))
            .andExpect(status().isCreated());

        // Validate the AprobarTokens in the database
        List<AprobarTokens> aprobarTokensList = aprobarTokensRepository.findAll();
        assertThat(aprobarTokensList).hasSize(databaseSizeBeforeCreate + 1);
        AprobarTokens testAprobarTokens = aprobarTokensList.get(aprobarTokensList.size() - 1);
        assertThat(testAprobarTokens.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testAprobarTokens.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createAprobarTokensWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aprobarTokensRepository.findAll().size();

        // Create the AprobarTokens with an existing ID
        aprobarTokens.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAprobarTokensMockMvc.perform(post("/api/aprobar-tokens")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aprobarTokens)))
            .andExpect(status().isBadRequest());

        // Validate the AprobarTokens in the database
        List<AprobarTokens> aprobarTokensList = aprobarTokensRepository.findAll();
        assertThat(aprobarTokensList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAprobarTokens() throws Exception {
        // Initialize the database
        aprobarTokensRepository.saveAndFlush(aprobarTokens);

        // Get all the aprobarTokensList
        restAprobarTokensMockMvc.perform(get("/api/aprobar-tokens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aprobarTokens.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }
    
    @Test
    @Transactional
    public void getAprobarTokens() throws Exception {
        // Initialize the database
        aprobarTokensRepository.saveAndFlush(aprobarTokens);

        // Get the aprobarTokens
        restAprobarTokensMockMvc.perform(get("/api/aprobar-tokens/{id}", aprobarTokens.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aprobarTokens.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }
    @Test
    @Transactional
    public void getNonExistingAprobarTokens() throws Exception {
        // Get the aprobarTokens
        restAprobarTokensMockMvc.perform(get("/api/aprobar-tokens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAprobarTokens() throws Exception {
        // Initialize the database
        aprobarTokensRepository.saveAndFlush(aprobarTokens);

        int databaseSizeBeforeUpdate = aprobarTokensRepository.findAll().size();

        // Update the aprobarTokens
        AprobarTokens updatedAprobarTokens = aprobarTokensRepository.findById(aprobarTokens.getId()).get();
        // Disconnect from session so that the updates on updatedAprobarTokens are not directly saved in db
        em.detach(updatedAprobarTokens);
        updatedAprobarTokens
            .cantidad(UPDATED_CANTIDAD)
            .password(UPDATED_PASSWORD);

        restAprobarTokensMockMvc.perform(put("/api/aprobar-tokens")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAprobarTokens)))
            .andExpect(status().isOk());

        // Validate the AprobarTokens in the database
        List<AprobarTokens> aprobarTokensList = aprobarTokensRepository.findAll();
        assertThat(aprobarTokensList).hasSize(databaseSizeBeforeUpdate);
        AprobarTokens testAprobarTokens = aprobarTokensList.get(aprobarTokensList.size() - 1);
        assertThat(testAprobarTokens.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testAprobarTokens.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingAprobarTokens() throws Exception {
        int databaseSizeBeforeUpdate = aprobarTokensRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAprobarTokensMockMvc.perform(put("/api/aprobar-tokens")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aprobarTokens)))
            .andExpect(status().isBadRequest());

        // Validate the AprobarTokens in the database
        List<AprobarTokens> aprobarTokensList = aprobarTokensRepository.findAll();
        assertThat(aprobarTokensList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAprobarTokens() throws Exception {
        // Initialize the database
        aprobarTokensRepository.saveAndFlush(aprobarTokens);

        int databaseSizeBeforeDelete = aprobarTokensRepository.findAll().size();

        // Delete the aprobarTokens
        restAprobarTokensMockMvc.perform(delete("/api/aprobar-tokens/{id}", aprobarTokens.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AprobarTokens> aprobarTokensList = aprobarTokensRepository.findAll();
        assertThat(aprobarTokensList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
