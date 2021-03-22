package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.Espectaculo;
import es.blockchain.abono.repository.EspectaculoRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EspectaculoResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EspectaculoResourceIT {

    private static final Long DEFAULT_ID_ESPECTACULO = 1L;
    private static final Long UPDATED_ID_ESPECTACULO = 2L;

    private static final Instant DEFAULT_FECHA_ESPECTACULO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_ESPECTACULO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_SIMBOLO = "AAAAAAAAAA";
    private static final String UPDATED_SIMBOLO = "BBBBBBBBBB";

    @Autowired
    private EspectaculoRepository espectaculoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEspectaculoMockMvc;

    private Espectaculo espectaculo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Espectaculo createEntity(EntityManager em) {
        Espectaculo espectaculo = new Espectaculo()
            .idEspectaculo(DEFAULT_ID_ESPECTACULO)
            .fechaEspectaculo(DEFAULT_FECHA_ESPECTACULO)
            .nombre(DEFAULT_NOMBRE)
            .simbolo(DEFAULT_SIMBOLO);
        return espectaculo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Espectaculo createUpdatedEntity(EntityManager em) {
        Espectaculo espectaculo = new Espectaculo()
            .idEspectaculo(UPDATED_ID_ESPECTACULO)
            .fechaEspectaculo(UPDATED_FECHA_ESPECTACULO)
            .nombre(UPDATED_NOMBRE)
            .simbolo(UPDATED_SIMBOLO);
        return espectaculo;
    }

    @BeforeEach
    public void initTest() {
        espectaculo = createEntity(em);
    }

    @Test
    @Transactional
    public void createEspectaculo() throws Exception {
        int databaseSizeBeforeCreate = espectaculoRepository.findAll().size();
        // Create the Espectaculo
        restEspectaculoMockMvc.perform(post("/api/espectaculos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(espectaculo)))
            .andExpect(status().isCreated());

        // Validate the Espectaculo in the database
        List<Espectaculo> espectaculoList = espectaculoRepository.findAll();
        assertThat(espectaculoList).hasSize(databaseSizeBeforeCreate + 1);
        Espectaculo testEspectaculo = espectaculoList.get(espectaculoList.size() - 1);
        assertThat(testEspectaculo.getIdEspectaculo()).isEqualTo(DEFAULT_ID_ESPECTACULO);
        assertThat(testEspectaculo.getFechaEspectaculo()).isEqualTo(DEFAULT_FECHA_ESPECTACULO);
        assertThat(testEspectaculo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEspectaculo.getSimbolo()).isEqualTo(DEFAULT_SIMBOLO);
    }

    @Test
    @Transactional
    public void createEspectaculoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = espectaculoRepository.findAll().size();

        // Create the Espectaculo with an existing ID
        espectaculo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEspectaculoMockMvc.perform(post("/api/espectaculos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(espectaculo)))
            .andExpect(status().isBadRequest());

        // Validate the Espectaculo in the database
        List<Espectaculo> espectaculoList = espectaculoRepository.findAll();
        assertThat(espectaculoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaEspectaculoIsRequired() throws Exception {
        int databaseSizeBeforeTest = espectaculoRepository.findAll().size();
        // set the field null
        espectaculo.setFechaEspectaculo(null);

        // Create the Espectaculo, which fails.


        restEspectaculoMockMvc.perform(post("/api/espectaculos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(espectaculo)))
            .andExpect(status().isBadRequest());

        List<Espectaculo> espectaculoList = espectaculoRepository.findAll();
        assertThat(espectaculoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = espectaculoRepository.findAll().size();
        // set the field null
        espectaculo.setNombre(null);

        // Create the Espectaculo, which fails.


        restEspectaculoMockMvc.perform(post("/api/espectaculos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(espectaculo)))
            .andExpect(status().isBadRequest());

        List<Espectaculo> espectaculoList = espectaculoRepository.findAll();
        assertThat(espectaculoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSimboloIsRequired() throws Exception {
        int databaseSizeBeforeTest = espectaculoRepository.findAll().size();
        // set the field null
        espectaculo.setSimbolo(null);

        // Create the Espectaculo, which fails.


        restEspectaculoMockMvc.perform(post("/api/espectaculos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(espectaculo)))
            .andExpect(status().isBadRequest());

        List<Espectaculo> espectaculoList = espectaculoRepository.findAll();
        assertThat(espectaculoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEspectaculos() throws Exception {
        // Initialize the database
        espectaculoRepository.saveAndFlush(espectaculo);

        // Get all the espectaculoList
        restEspectaculoMockMvc.perform(get("/api/espectaculos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espectaculo.getId().intValue())))
            .andExpect(jsonPath("$.[*].idEspectaculo").value(hasItem(DEFAULT_ID_ESPECTACULO.intValue())))
            .andExpect(jsonPath("$.[*].fechaEspectaculo").value(hasItem(DEFAULT_FECHA_ESPECTACULO.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].simbolo").value(hasItem(DEFAULT_SIMBOLO)));
    }
    
    @Test
    @Transactional
    public void getEspectaculo() throws Exception {
        // Initialize the database
        espectaculoRepository.saveAndFlush(espectaculo);

        // Get the espectaculo
        restEspectaculoMockMvc.perform(get("/api/espectaculos/{id}", espectaculo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(espectaculo.getId().intValue()))
            .andExpect(jsonPath("$.idEspectaculo").value(DEFAULT_ID_ESPECTACULO.intValue()))
            .andExpect(jsonPath("$.fechaEspectaculo").value(DEFAULT_FECHA_ESPECTACULO.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.simbolo").value(DEFAULT_SIMBOLO));
    }
    @Test
    @Transactional
    public void getNonExistingEspectaculo() throws Exception {
        // Get the espectaculo
        restEspectaculoMockMvc.perform(get("/api/espectaculos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEspectaculo() throws Exception {
        // Initialize the database
        espectaculoRepository.saveAndFlush(espectaculo);

        int databaseSizeBeforeUpdate = espectaculoRepository.findAll().size();

        // Update the espectaculo
        Espectaculo updatedEspectaculo = espectaculoRepository.findById(espectaculo.getId()).get();
        // Disconnect from session so that the updates on updatedEspectaculo are not directly saved in db
        em.detach(updatedEspectaculo);
        updatedEspectaculo
            .idEspectaculo(UPDATED_ID_ESPECTACULO)
            .fechaEspectaculo(UPDATED_FECHA_ESPECTACULO)
            .nombre(UPDATED_NOMBRE)
            .simbolo(UPDATED_SIMBOLO);

        restEspectaculoMockMvc.perform(put("/api/espectaculos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEspectaculo)))
            .andExpect(status().isOk());

        // Validate the Espectaculo in the database
        List<Espectaculo> espectaculoList = espectaculoRepository.findAll();
        assertThat(espectaculoList).hasSize(databaseSizeBeforeUpdate);
        Espectaculo testEspectaculo = espectaculoList.get(espectaculoList.size() - 1);
        assertThat(testEspectaculo.getIdEspectaculo()).isEqualTo(UPDATED_ID_ESPECTACULO);
        assertThat(testEspectaculo.getFechaEspectaculo()).isEqualTo(UPDATED_FECHA_ESPECTACULO);
        assertThat(testEspectaculo.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEspectaculo.getSimbolo()).isEqualTo(UPDATED_SIMBOLO);
    }

    @Test
    @Transactional
    public void updateNonExistingEspectaculo() throws Exception {
        int databaseSizeBeforeUpdate = espectaculoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEspectaculoMockMvc.perform(put("/api/espectaculos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(espectaculo)))
            .andExpect(status().isBadRequest());

        // Validate the Espectaculo in the database
        List<Espectaculo> espectaculoList = espectaculoRepository.findAll();
        assertThat(espectaculoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEspectaculo() throws Exception {
        // Initialize the database
        espectaculoRepository.saveAndFlush(espectaculo);

        int databaseSizeBeforeDelete = espectaculoRepository.findAll().size();

        // Delete the espectaculo
        restEspectaculoMockMvc.perform(delete("/api/espectaculos/{id}", espectaculo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Espectaculo> espectaculoList = espectaculoRepository.findAll();
        assertThat(espectaculoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
