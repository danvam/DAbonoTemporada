package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.Localidad;
import es.blockchain.abono.repository.LocalidadRepository;

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
 * Integration tests for the {@link LocalidadResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LocalidadResourceIT {

    private static final Long DEFAULT_ID_LOCALIDAD = 1L;
    private static final Long UPDATED_ID_LOCALIDAD = 2L;

    private static final Long DEFAULT_TIPO_LOCALIDAD = 1L;
    private static final Long UPDATED_TIPO_LOCALIDAD = 2L;

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_SIMBOLO = "AAAAAAAAAA";
    private static final String UPDATED_SIMBOLO = "BBBBBBBBBB";

    @Autowired
    private LocalidadRepository localidadRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalidadMockMvc;

    private Localidad localidad;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Localidad createEntity(EntityManager em) {
        Localidad localidad = new Localidad()
            .idLocalidad(DEFAULT_ID_LOCALIDAD)
            .tipoLocalidad(DEFAULT_TIPO_LOCALIDAD)
            .nombre(DEFAULT_NOMBRE)
            .simbolo(DEFAULT_SIMBOLO);
        return localidad;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Localidad createUpdatedEntity(EntityManager em) {
        Localidad localidad = new Localidad()
            .idLocalidad(UPDATED_ID_LOCALIDAD)
            .tipoLocalidad(UPDATED_TIPO_LOCALIDAD)
            .nombre(UPDATED_NOMBRE)
            .simbolo(UPDATED_SIMBOLO);
        return localidad;
    }

    @BeforeEach
    public void initTest() {
        localidad = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalidad() throws Exception {
        int databaseSizeBeforeCreate = localidadRepository.findAll().size();
        // Create the Localidad
        restLocalidadMockMvc.perform(post("/api/localidads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isCreated());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeCreate + 1);
        Localidad testLocalidad = localidadList.get(localidadList.size() - 1);
        assertThat(testLocalidad.getIdLocalidad()).isEqualTo(DEFAULT_ID_LOCALIDAD);
        assertThat(testLocalidad.getTipoLocalidad()).isEqualTo(DEFAULT_TIPO_LOCALIDAD);
        assertThat(testLocalidad.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testLocalidad.getSimbolo()).isEqualTo(DEFAULT_SIMBOLO);
    }

    @Test
    @Transactional
    public void createLocalidadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localidadRepository.findAll().size();

        // Create the Localidad with an existing ID
        localidad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalidadMockMvc.perform(post("/api/localidads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTipoLocalidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = localidadRepository.findAll().size();
        // set the field null
        localidad.setTipoLocalidad(null);

        // Create the Localidad, which fails.


        restLocalidadMockMvc.perform(post("/api/localidads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = localidadRepository.findAll().size();
        // set the field null
        localidad.setNombre(null);

        // Create the Localidad, which fails.


        restLocalidadMockMvc.perform(post("/api/localidads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSimboloIsRequired() throws Exception {
        int databaseSizeBeforeTest = localidadRepository.findAll().size();
        // set the field null
        localidad.setSimbolo(null);

        // Create the Localidad, which fails.


        restLocalidadMockMvc.perform(post("/api/localidads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalidads() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        // Get all the localidadList
        restLocalidadMockMvc.perform(get("/api/localidads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localidad.getId().intValue())))
            .andExpect(jsonPath("$.[*].idLocalidad").value(hasItem(DEFAULT_ID_LOCALIDAD.intValue())))
            .andExpect(jsonPath("$.[*].tipoLocalidad").value(hasItem(DEFAULT_TIPO_LOCALIDAD.intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].simbolo").value(hasItem(DEFAULT_SIMBOLO)));
    }
    
    @Test
    @Transactional
    public void getLocalidad() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        // Get the localidad
        restLocalidadMockMvc.perform(get("/api/localidads/{id}", localidad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localidad.getId().intValue()))
            .andExpect(jsonPath("$.idLocalidad").value(DEFAULT_ID_LOCALIDAD.intValue()))
            .andExpect(jsonPath("$.tipoLocalidad").value(DEFAULT_TIPO_LOCALIDAD.intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.simbolo").value(DEFAULT_SIMBOLO));
    }
    @Test
    @Transactional
    public void getNonExistingLocalidad() throws Exception {
        // Get the localidad
        restLocalidadMockMvc.perform(get("/api/localidads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalidad() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();

        // Update the localidad
        Localidad updatedLocalidad = localidadRepository.findById(localidad.getId()).get();
        // Disconnect from session so that the updates on updatedLocalidad are not directly saved in db
        em.detach(updatedLocalidad);
        updatedLocalidad
            .idLocalidad(UPDATED_ID_LOCALIDAD)
            .tipoLocalidad(UPDATED_TIPO_LOCALIDAD)
            .nombre(UPDATED_NOMBRE)
            .simbolo(UPDATED_SIMBOLO);

        restLocalidadMockMvc.perform(put("/api/localidads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalidad)))
            .andExpect(status().isOk());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
        Localidad testLocalidad = localidadList.get(localidadList.size() - 1);
        assertThat(testLocalidad.getIdLocalidad()).isEqualTo(UPDATED_ID_LOCALIDAD);
        assertThat(testLocalidad.getTipoLocalidad()).isEqualTo(UPDATED_TIPO_LOCALIDAD);
        assertThat(testLocalidad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testLocalidad.getSimbolo()).isEqualTo(UPDATED_SIMBOLO);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalidad() throws Exception {
        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalidadMockMvc.perform(put("/api/localidads")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalidad() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        int databaseSizeBeforeDelete = localidadRepository.findAll().size();

        // Delete the localidad
        restLocalidadMockMvc.perform(delete("/api/localidads/{id}", localidad.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
