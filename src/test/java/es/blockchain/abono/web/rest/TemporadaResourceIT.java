package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.Temporada;
import es.blockchain.abono.repository.TemporadaRepository;

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

import es.blockchain.abono.domain.enumeration.Etapas;
/**
 * Integration tests for the {@link TemporadaResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TemporadaResourceIT {

    private static final Etapas DEFAULT_FASE_ETAPA = Etapas.CREACION;
    private static final Etapas UPDATED_FASE_ETAPA = Etapas.ABONO;

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Long DEFAULT_ACTUAL_ID_LOCALIDAD = 1L;
    private static final Long UPDATED_ACTUAL_ID_LOCALIDAD = 2L;

    private static final Long DEFAULT_ACTUAL_ID_ESPECTACULO = 1L;
    private static final Long UPDATED_ACTUAL_ID_ESPECTACULO = 2L;

    private static final Long DEFAULT_ACTUAL_ID_ABONO = 1L;
    private static final Long UPDATED_ACTUAL_ID_ABONO = 2L;

    private static final Long DEFAULT_PRECIO_BASE = 1L;
    private static final Long UPDATED_PRECIO_BASE = 2L;

    private static final Long DEFAULT_TIPOS_LOCALIDAD = 1L;
    private static final Long UPDATED_TIPOS_LOCALIDAD = 2L;

    private static final Long DEFAULT_FACTOR_INCREMENTO_TIPO = 1L;
    private static final Long UPDATED_FACTOR_INCREMENTO_TIPO = 2L;

    private static final Long DEFAULT_PORCENTAJE_ALQUILER = 1L;
    private static final Long UPDATED_PORCENTAJE_ALQUILER = 2L;

    private static final String DEFAULT_DINERO_ABONO = "AAAAAAAAAA";
    private static final String UPDATED_DINERO_ABONO = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_ABI = "AAAAAAAAAA";
    private static final String UPDATED_ABI = "BBBBBBBBBB";

    private static final String DEFAULT_ABI_D_ABONO = "AAAAAAAAAA";
    private static final String UPDATED_ABI_D_ABONO = "BBBBBBBBBB";

    @Autowired
    private TemporadaRepository temporadaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTemporadaMockMvc;

    private Temporada temporada;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Temporada createEntity(EntityManager em) {
        Temporada temporada = new Temporada()
            .faseEtapa(DEFAULT_FASE_ETAPA)
            .nombre(DEFAULT_NOMBRE)
            .actualIdLocalidad(DEFAULT_ACTUAL_ID_LOCALIDAD)
            .actualIdEspectaculo(DEFAULT_ACTUAL_ID_ESPECTACULO)
            .actualIdAbono(DEFAULT_ACTUAL_ID_ABONO)
            .precioBase(DEFAULT_PRECIO_BASE)
            .tiposLocalidad(DEFAULT_TIPOS_LOCALIDAD)
            .factorIncrementoTipo(DEFAULT_FACTOR_INCREMENTO_TIPO)
            .porcentajeAlquiler(DEFAULT_PORCENTAJE_ALQUILER)
            .dineroAbono(DEFAULT_DINERO_ABONO)
            .direccion(DEFAULT_DIRECCION)
            .abi(DEFAULT_ABI)
            .abiDAbono(DEFAULT_ABI_D_ABONO);
        return temporada;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Temporada createUpdatedEntity(EntityManager em) {
        Temporada temporada = new Temporada()
            .faseEtapa(UPDATED_FASE_ETAPA)
            .nombre(UPDATED_NOMBRE)
            .actualIdLocalidad(UPDATED_ACTUAL_ID_LOCALIDAD)
            .actualIdEspectaculo(UPDATED_ACTUAL_ID_ESPECTACULO)
            .actualIdAbono(UPDATED_ACTUAL_ID_ABONO)
            .precioBase(UPDATED_PRECIO_BASE)
            .tiposLocalidad(UPDATED_TIPOS_LOCALIDAD)
            .factorIncrementoTipo(UPDATED_FACTOR_INCREMENTO_TIPO)
            .porcentajeAlquiler(UPDATED_PORCENTAJE_ALQUILER)
            .dineroAbono(UPDATED_DINERO_ABONO)
            .direccion(UPDATED_DIRECCION)
            .abi(UPDATED_ABI)
            .abiDAbono(UPDATED_ABI_D_ABONO);
        return temporada;
    }

    @BeforeEach
    public void initTest() {
        temporada = createEntity(em);
    }

    @Test
    @Transactional
    public void createTemporada() throws Exception {
        int databaseSizeBeforeCreate = temporadaRepository.findAll().size();
        // Create the Temporada
        restTemporadaMockMvc.perform(post("/api/temporadas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(temporada)))
            .andExpect(status().isCreated());

        // Validate the Temporada in the database
        List<Temporada> temporadaList = temporadaRepository.findAll();
        assertThat(temporadaList).hasSize(databaseSizeBeforeCreate + 1);
        Temporada testTemporada = temporadaList.get(temporadaList.size() - 1);
        assertThat(testTemporada.getFaseEtapa()).isEqualTo(DEFAULT_FASE_ETAPA);
        assertThat(testTemporada.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testTemporada.getActualIdLocalidad()).isEqualTo(DEFAULT_ACTUAL_ID_LOCALIDAD);
        assertThat(testTemporada.getActualIdEspectaculo()).isEqualTo(DEFAULT_ACTUAL_ID_ESPECTACULO);
        assertThat(testTemporada.getActualIdAbono()).isEqualTo(DEFAULT_ACTUAL_ID_ABONO);
        assertThat(testTemporada.getPrecioBase()).isEqualTo(DEFAULT_PRECIO_BASE);
        assertThat(testTemporada.getTiposLocalidad()).isEqualTo(DEFAULT_TIPOS_LOCALIDAD);
        assertThat(testTemporada.getFactorIncrementoTipo()).isEqualTo(DEFAULT_FACTOR_INCREMENTO_TIPO);
        assertThat(testTemporada.getPorcentajeAlquiler()).isEqualTo(DEFAULT_PORCENTAJE_ALQUILER);
        assertThat(testTemporada.getDineroAbono()).isEqualTo(DEFAULT_DINERO_ABONO);
        assertThat(testTemporada.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testTemporada.getAbi()).isEqualTo(DEFAULT_ABI);
        assertThat(testTemporada.getAbiDAbono()).isEqualTo(DEFAULT_ABI_D_ABONO);
    }

    @Test
    @Transactional
    public void createTemporadaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = temporadaRepository.findAll().size();

        // Create the Temporada with an existing ID
        temporada.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTemporadaMockMvc.perform(post("/api/temporadas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(temporada)))
            .andExpect(status().isBadRequest());

        // Validate the Temporada in the database
        List<Temporada> temporadaList = temporadaRepository.findAll();
        assertThat(temporadaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDireccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = temporadaRepository.findAll().size();
        // set the field null
        temporada.setDireccion(null);

        // Create the Temporada, which fails.


        restTemporadaMockMvc.perform(post("/api/temporadas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(temporada)))
            .andExpect(status().isBadRequest());

        List<Temporada> temporadaList = temporadaRepository.findAll();
        assertThat(temporadaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAbiIsRequired() throws Exception {
        int databaseSizeBeforeTest = temporadaRepository.findAll().size();
        // set the field null
        temporada.setAbi(null);

        // Create the Temporada, which fails.


        restTemporadaMockMvc.perform(post("/api/temporadas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(temporada)))
            .andExpect(status().isBadRequest());

        List<Temporada> temporadaList = temporadaRepository.findAll();
        assertThat(temporadaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAbiDAbonoIsRequired() throws Exception {
        int databaseSizeBeforeTest = temporadaRepository.findAll().size();
        // set the field null
        temporada.setAbiDAbono(null);

        // Create the Temporada, which fails.


        restTemporadaMockMvc.perform(post("/api/temporadas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(temporada)))
            .andExpect(status().isBadRequest());

        List<Temporada> temporadaList = temporadaRepository.findAll();
        assertThat(temporadaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTemporadas() throws Exception {
        // Initialize the database
        temporadaRepository.saveAndFlush(temporada);

        // Get all the temporadaList
        restTemporadaMockMvc.perform(get("/api/temporadas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(temporada.getId().intValue())))
            .andExpect(jsonPath("$.[*].faseEtapa").value(hasItem(DEFAULT_FASE_ETAPA.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].actualIdLocalidad").value(hasItem(DEFAULT_ACTUAL_ID_LOCALIDAD.intValue())))
            .andExpect(jsonPath("$.[*].actualIdEspectaculo").value(hasItem(DEFAULT_ACTUAL_ID_ESPECTACULO.intValue())))
            .andExpect(jsonPath("$.[*].actualIdAbono").value(hasItem(DEFAULT_ACTUAL_ID_ABONO.intValue())))
            .andExpect(jsonPath("$.[*].precioBase").value(hasItem(DEFAULT_PRECIO_BASE.intValue())))
            .andExpect(jsonPath("$.[*].tiposLocalidad").value(hasItem(DEFAULT_TIPOS_LOCALIDAD.intValue())))
            .andExpect(jsonPath("$.[*].factorIncrementoTipo").value(hasItem(DEFAULT_FACTOR_INCREMENTO_TIPO.intValue())))
            .andExpect(jsonPath("$.[*].porcentajeAlquiler").value(hasItem(DEFAULT_PORCENTAJE_ALQUILER.intValue())))
            .andExpect(jsonPath("$.[*].dineroAbono").value(hasItem(DEFAULT_DINERO_ABONO)))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION)))
            .andExpect(jsonPath("$.[*].abi").value(hasItem(DEFAULT_ABI)))
            .andExpect(jsonPath("$.[*].abiDAbono").value(hasItem(DEFAULT_ABI_D_ABONO)));
    }
    
    @Test
    @Transactional
    public void getTemporada() throws Exception {
        // Initialize the database
        temporadaRepository.saveAndFlush(temporada);

        // Get the temporada
        restTemporadaMockMvc.perform(get("/api/temporadas/{id}", temporada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(temporada.getId().intValue()))
            .andExpect(jsonPath("$.faseEtapa").value(DEFAULT_FASE_ETAPA.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.actualIdLocalidad").value(DEFAULT_ACTUAL_ID_LOCALIDAD.intValue()))
            .andExpect(jsonPath("$.actualIdEspectaculo").value(DEFAULT_ACTUAL_ID_ESPECTACULO.intValue()))
            .andExpect(jsonPath("$.actualIdAbono").value(DEFAULT_ACTUAL_ID_ABONO.intValue()))
            .andExpect(jsonPath("$.precioBase").value(DEFAULT_PRECIO_BASE.intValue()))
            .andExpect(jsonPath("$.tiposLocalidad").value(DEFAULT_TIPOS_LOCALIDAD.intValue()))
            .andExpect(jsonPath("$.factorIncrementoTipo").value(DEFAULT_FACTOR_INCREMENTO_TIPO.intValue()))
            .andExpect(jsonPath("$.porcentajeAlquiler").value(DEFAULT_PORCENTAJE_ALQUILER.intValue()))
            .andExpect(jsonPath("$.dineroAbono").value(DEFAULT_DINERO_ABONO))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION))
            .andExpect(jsonPath("$.abi").value(DEFAULT_ABI))
            .andExpect(jsonPath("$.abiDAbono").value(DEFAULT_ABI_D_ABONO));
    }
    @Test
    @Transactional
    public void getNonExistingTemporada() throws Exception {
        // Get the temporada
        restTemporadaMockMvc.perform(get("/api/temporadas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTemporada() throws Exception {
        // Initialize the database
        temporadaRepository.saveAndFlush(temporada);

        int databaseSizeBeforeUpdate = temporadaRepository.findAll().size();

        // Update the temporada
        Temporada updatedTemporada = temporadaRepository.findById(temporada.getId()).get();
        // Disconnect from session so that the updates on updatedTemporada are not directly saved in db
        em.detach(updatedTemporada);
        updatedTemporada
            .faseEtapa(UPDATED_FASE_ETAPA)
            .nombre(UPDATED_NOMBRE)
            .actualIdLocalidad(UPDATED_ACTUAL_ID_LOCALIDAD)
            .actualIdEspectaculo(UPDATED_ACTUAL_ID_ESPECTACULO)
            .actualIdAbono(UPDATED_ACTUAL_ID_ABONO)
            .precioBase(UPDATED_PRECIO_BASE)
            .tiposLocalidad(UPDATED_TIPOS_LOCALIDAD)
            .factorIncrementoTipo(UPDATED_FACTOR_INCREMENTO_TIPO)
            .porcentajeAlquiler(UPDATED_PORCENTAJE_ALQUILER)
            .dineroAbono(UPDATED_DINERO_ABONO)
            .direccion(UPDATED_DIRECCION)
            .abi(UPDATED_ABI)
            .abiDAbono(UPDATED_ABI_D_ABONO);

        restTemporadaMockMvc.perform(put("/api/temporadas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTemporada)))
            .andExpect(status().isOk());

        // Validate the Temporada in the database
        List<Temporada> temporadaList = temporadaRepository.findAll();
        assertThat(temporadaList).hasSize(databaseSizeBeforeUpdate);
        Temporada testTemporada = temporadaList.get(temporadaList.size() - 1);
        assertThat(testTemporada.getFaseEtapa()).isEqualTo(UPDATED_FASE_ETAPA);
        assertThat(testTemporada.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testTemporada.getActualIdLocalidad()).isEqualTo(UPDATED_ACTUAL_ID_LOCALIDAD);
        assertThat(testTemporada.getActualIdEspectaculo()).isEqualTo(UPDATED_ACTUAL_ID_ESPECTACULO);
        assertThat(testTemporada.getActualIdAbono()).isEqualTo(UPDATED_ACTUAL_ID_ABONO);
        assertThat(testTemporada.getPrecioBase()).isEqualTo(UPDATED_PRECIO_BASE);
        assertThat(testTemporada.getTiposLocalidad()).isEqualTo(UPDATED_TIPOS_LOCALIDAD);
        assertThat(testTemporada.getFactorIncrementoTipo()).isEqualTo(UPDATED_FACTOR_INCREMENTO_TIPO);
        assertThat(testTemporada.getPorcentajeAlquiler()).isEqualTo(UPDATED_PORCENTAJE_ALQUILER);
        assertThat(testTemporada.getDineroAbono()).isEqualTo(UPDATED_DINERO_ABONO);
        assertThat(testTemporada.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testTemporada.getAbi()).isEqualTo(UPDATED_ABI);
        assertThat(testTemporada.getAbiDAbono()).isEqualTo(UPDATED_ABI_D_ABONO);
    }

    @Test
    @Transactional
    public void updateNonExistingTemporada() throws Exception {
        int databaseSizeBeforeUpdate = temporadaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTemporadaMockMvc.perform(put("/api/temporadas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(temporada)))
            .andExpect(status().isBadRequest());

        // Validate the Temporada in the database
        List<Temporada> temporadaList = temporadaRepository.findAll();
        assertThat(temporadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTemporada() throws Exception {
        // Initialize the database
        temporadaRepository.saveAndFlush(temporada);

        int databaseSizeBeforeDelete = temporadaRepository.findAll().size();

        // Delete the temporada
        restTemporadaMockMvc.perform(delete("/api/temporadas/{id}", temporada.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Temporada> temporadaList = temporadaRepository.findAll();
        assertThat(temporadaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
