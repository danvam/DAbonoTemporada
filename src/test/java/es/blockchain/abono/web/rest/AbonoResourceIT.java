package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.Abono;
import es.blockchain.abono.repository.AbonoRepository;

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
 * Integration tests for the {@link AbonoResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AbonoResourceIT {

    private static final Instant DEFAULT_FECHA_ALQUILER_DESDE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_ALQUILER_DESDE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_ALQUILER_HASTA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_ALQUILER_HASTA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final Long DEFAULT_ID_LOCALIDAD = 1L;
    private static final Long UPDATED_ID_LOCALIDAD = 2L;

    @Autowired
    private AbonoRepository abonoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAbonoMockMvc;

    private Abono abono;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Abono createEntity(EntityManager em) {
        Abono abono = new Abono()
            .fechaAlquilerDesde(DEFAULT_FECHA_ALQUILER_DESDE)
            .fechaAlquilerHasta(DEFAULT_FECHA_ALQUILER_HASTA)
            .direccion(DEFAULT_DIRECCION)
            .idLocalidad(DEFAULT_ID_LOCALIDAD);
        return abono;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Abono createUpdatedEntity(EntityManager em) {
        Abono abono = new Abono()
            .fechaAlquilerDesde(UPDATED_FECHA_ALQUILER_DESDE)
            .fechaAlquilerHasta(UPDATED_FECHA_ALQUILER_HASTA)
            .direccion(UPDATED_DIRECCION)
            .idLocalidad(UPDATED_ID_LOCALIDAD);
        return abono;
    }

    @BeforeEach
    public void initTest() {
        abono = createEntity(em);
    }

    @Test
    @Transactional
    public void createAbono() throws Exception {
        int databaseSizeBeforeCreate = abonoRepository.findAll().size();
        // Create the Abono
        restAbonoMockMvc.perform(post("/api/abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abono)))
            .andExpect(status().isCreated());

        // Validate the Abono in the database
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeCreate + 1);
        Abono testAbono = abonoList.get(abonoList.size() - 1);
        assertThat(testAbono.getFechaAlquilerDesde()).isEqualTo(DEFAULT_FECHA_ALQUILER_DESDE);
        assertThat(testAbono.getFechaAlquilerHasta()).isEqualTo(DEFAULT_FECHA_ALQUILER_HASTA);
        assertThat(testAbono.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testAbono.getIdLocalidad()).isEqualTo(DEFAULT_ID_LOCALIDAD);
    }

    @Test
    @Transactional
    public void createAbonoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = abonoRepository.findAll().size();

        // Create the Abono with an existing ID
        abono.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAbonoMockMvc.perform(post("/api/abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abono)))
            .andExpect(status().isBadRequest());

        // Validate the Abono in the database
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAbonos() throws Exception {
        // Initialize the database
        abonoRepository.saveAndFlush(abono);

        // Get all the abonoList
        restAbonoMockMvc.perform(get("/api/abonos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(abono.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaAlquilerDesde").value(hasItem(DEFAULT_FECHA_ALQUILER_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaAlquilerHasta").value(hasItem(DEFAULT_FECHA_ALQUILER_HASTA.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION)))
            .andExpect(jsonPath("$.[*].idLocalidad").value(hasItem(DEFAULT_ID_LOCALIDAD)));
    }
    
    @Test
    @Transactional
    public void getAbono() throws Exception {
        // Initialize the database
        abonoRepository.saveAndFlush(abono);

        // Get the abono
        restAbonoMockMvc.perform(get("/api/abonos/{id}", abono.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(abono.getId().intValue()))
            .andExpect(jsonPath("$.fechaAlquilerDesde").value(DEFAULT_FECHA_ALQUILER_DESDE.toString()))
            .andExpect(jsonPath("$.fechaAlquilerHasta").value(DEFAULT_FECHA_ALQUILER_HASTA.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION))
            .andExpect(jsonPath("$.idLocalidad").value(DEFAULT_ID_LOCALIDAD));
    }
    @Test
    @Transactional
    public void getNonExistingAbono() throws Exception {
        // Get the abono
        restAbonoMockMvc.perform(get("/api/abonos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAbono() throws Exception {
        // Initialize the database
        abonoRepository.saveAndFlush(abono);

        int databaseSizeBeforeUpdate = abonoRepository.findAll().size();

        // Update the abono
        Abono updatedAbono = abonoRepository.findById(abono.getId()).get();
        // Disconnect from session so that the updates on updatedAbono are not directly saved in db
        em.detach(updatedAbono);
        updatedAbono
            .fechaAlquilerDesde(UPDATED_FECHA_ALQUILER_DESDE)
            .fechaAlquilerHasta(UPDATED_FECHA_ALQUILER_HASTA)
            .direccion(UPDATED_DIRECCION)
            .idLocalidad(UPDATED_ID_LOCALIDAD);

        restAbonoMockMvc.perform(put("/api/abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAbono)))
            .andExpect(status().isOk());

        // Validate the Abono in the database
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeUpdate);
        Abono testAbono = abonoList.get(abonoList.size() - 1);
        assertThat(testAbono.getFechaAlquilerDesde()).isEqualTo(UPDATED_FECHA_ALQUILER_DESDE);
        assertThat(testAbono.getFechaAlquilerHasta()).isEqualTo(UPDATED_FECHA_ALQUILER_HASTA);
        assertThat(testAbono.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testAbono.getIdLocalidad()).isEqualTo(UPDATED_ID_LOCALIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingAbono() throws Exception {
        int databaseSizeBeforeUpdate = abonoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAbonoMockMvc.perform(put("/api/abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abono)))
            .andExpect(status().isBadRequest());

        // Validate the Abono in the database
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAbono() throws Exception {
        // Initialize the database
        abonoRepository.saveAndFlush(abono);

        int databaseSizeBeforeDelete = abonoRepository.findAll().size();

        // Delete the abono
        restAbonoMockMvc.perform(delete("/api/abonos/{id}", abono.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
