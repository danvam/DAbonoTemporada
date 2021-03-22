package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.TransferirTokens;
import es.blockchain.abono.repository.TransferirTokensRepository;

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
 * Integration tests for the {@link TransferirTokensResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TransferirTokensResourceIT {

    private static final Long DEFAULT_CANTIDAD = 1L;
    private static final Long UPDATED_CANTIDAD = 2L;

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private TransferirTokensRepository transferirTokensRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTransferirTokensMockMvc;

    private TransferirTokens transferirTokens;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransferirTokens createEntity(EntityManager em) {
        TransferirTokens transferirTokens = new TransferirTokens()
            .cantidad(DEFAULT_CANTIDAD)
            .password(DEFAULT_PASSWORD);
        return transferirTokens;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransferirTokens createUpdatedEntity(EntityManager em) {
        TransferirTokens transferirTokens = new TransferirTokens()
            .cantidad(UPDATED_CANTIDAD)
            .password(UPDATED_PASSWORD);
        return transferirTokens;
    }

    @BeforeEach
    public void initTest() {
        transferirTokens = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransferirTokens() throws Exception {
        int databaseSizeBeforeCreate = transferirTokensRepository.findAll().size();
        // Create the TransferirTokens
        restTransferirTokensMockMvc.perform(post("/api/transferir-tokens")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transferirTokens)))
            .andExpect(status().isCreated());

        // Validate the TransferirTokens in the database
        List<TransferirTokens> transferirTokensList = transferirTokensRepository.findAll();
        assertThat(transferirTokensList).hasSize(databaseSizeBeforeCreate + 1);
        TransferirTokens testTransferirTokens = transferirTokensList.get(transferirTokensList.size() - 1);
        assertThat(testTransferirTokens.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testTransferirTokens.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createTransferirTokensWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transferirTokensRepository.findAll().size();

        // Create the TransferirTokens with an existing ID
        transferirTokens.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransferirTokensMockMvc.perform(post("/api/transferir-tokens")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transferirTokens)))
            .andExpect(status().isBadRequest());

        // Validate the TransferirTokens in the database
        List<TransferirTokens> transferirTokensList = transferirTokensRepository.findAll();
        assertThat(transferirTokensList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTransferirTokens() throws Exception {
        // Initialize the database
        transferirTokensRepository.saveAndFlush(transferirTokens);

        // Get all the transferirTokensList
        restTransferirTokensMockMvc.perform(get("/api/transferir-tokens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transferirTokens.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }
    
    @Test
    @Transactional
    public void getTransferirTokens() throws Exception {
        // Initialize the database
        transferirTokensRepository.saveAndFlush(transferirTokens);

        // Get the transferirTokens
        restTransferirTokensMockMvc.perform(get("/api/transferir-tokens/{id}", transferirTokens.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(transferirTokens.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }
    @Test
    @Transactional
    public void getNonExistingTransferirTokens() throws Exception {
        // Get the transferirTokens
        restTransferirTokensMockMvc.perform(get("/api/transferir-tokens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransferirTokens() throws Exception {
        // Initialize the database
        transferirTokensRepository.saveAndFlush(transferirTokens);

        int databaseSizeBeforeUpdate = transferirTokensRepository.findAll().size();

        // Update the transferirTokens
        TransferirTokens updatedTransferirTokens = transferirTokensRepository.findById(transferirTokens.getId()).get();
        // Disconnect from session so that the updates on updatedTransferirTokens are not directly saved in db
        em.detach(updatedTransferirTokens);
        updatedTransferirTokens
            .cantidad(UPDATED_CANTIDAD)
            .password(UPDATED_PASSWORD);

        restTransferirTokensMockMvc.perform(put("/api/transferir-tokens")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransferirTokens)))
            .andExpect(status().isOk());

        // Validate the TransferirTokens in the database
        List<TransferirTokens> transferirTokensList = transferirTokensRepository.findAll();
        assertThat(transferirTokensList).hasSize(databaseSizeBeforeUpdate);
        TransferirTokens testTransferirTokens = transferirTokensList.get(transferirTokensList.size() - 1);
        assertThat(testTransferirTokens.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testTransferirTokens.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingTransferirTokens() throws Exception {
        int databaseSizeBeforeUpdate = transferirTokensRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransferirTokensMockMvc.perform(put("/api/transferir-tokens")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transferirTokens)))
            .andExpect(status().isBadRequest());

        // Validate the TransferirTokens in the database
        List<TransferirTokens> transferirTokensList = transferirTokensRepository.findAll();
        assertThat(transferirTokensList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransferirTokens() throws Exception {
        // Initialize the database
        transferirTokensRepository.saveAndFlush(transferirTokens);

        int databaseSizeBeforeDelete = transferirTokensRepository.findAll().size();

        // Delete the transferirTokens
        restTransferirTokensMockMvc.perform(delete("/api/transferir-tokens/{id}", transferirTokens.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TransferirTokens> transferirTokensList = transferirTokensRepository.findAll();
        assertThat(transferirTokensList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
