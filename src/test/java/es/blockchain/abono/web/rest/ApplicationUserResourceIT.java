package es.blockchain.abono.web.rest;

import es.blockchain.abono.AbonoBlockchainApp;
import es.blockchain.abono.domain.ApplicationUser;
import es.blockchain.abono.repository.ApplicationUserRepository;

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
 * Integration tests for the {@link ApplicationUserResource} REST controller.
 */
@SpringBootTest(classes = AbonoBlockchainApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ApplicationUserResourceIT {

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restApplicationUserMockMvc;

    private ApplicationUser applicationUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApplicationUser createEntity(EntityManager em) {
        ApplicationUser applicationUser = new ApplicationUser()
            .direccion(DEFAULT_DIRECCION);
        return applicationUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApplicationUser createUpdatedEntity(EntityManager em) {
        ApplicationUser applicationUser = new ApplicationUser()
            .direccion(UPDATED_DIRECCION);
        return applicationUser;
    }

    @BeforeEach
    public void initTest() {
        applicationUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createApplicationUser() throws Exception {
        int databaseSizeBeforeCreate = applicationUserRepository.findAll().size();
        // Create the ApplicationUser
        restApplicationUserMockMvc.perform(post("/api/application-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(applicationUser)))
            .andExpect(status().isCreated());

        // Validate the ApplicationUser in the database
        List<ApplicationUser> applicationUserList = applicationUserRepository.findAll();
        assertThat(applicationUserList).hasSize(databaseSizeBeforeCreate + 1);
        ApplicationUser testApplicationUser = applicationUserList.get(applicationUserList.size() - 1);
        assertThat(testApplicationUser.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
    }

    @Test
    @Transactional
    public void createApplicationUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicationUserRepository.findAll().size();

        // Create the ApplicationUser with an existing ID
        applicationUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicationUserMockMvc.perform(post("/api/application-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(applicationUser)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationUser in the database
        List<ApplicationUser> applicationUserList = applicationUserRepository.findAll();
        assertThat(applicationUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDireccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = applicationUserRepository.findAll().size();
        // set the field null
        applicationUser.setDireccion(null);

        // Create the ApplicationUser, which fails.


        restApplicationUserMockMvc.perform(post("/api/application-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(applicationUser)))
            .andExpect(status().isBadRequest());

        List<ApplicationUser> applicationUserList = applicationUserRepository.findAll();
        assertThat(applicationUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllApplicationUsers() throws Exception {
        // Initialize the database
        applicationUserRepository.saveAndFlush(applicationUser);

        // Get all the applicationUserList
        restApplicationUserMockMvc.perform(get("/api/application-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(applicationUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION)));
    }
    
    @Test
    @Transactional
    public void getApplicationUser() throws Exception {
        // Initialize the database
        applicationUserRepository.saveAndFlush(applicationUser);

        // Get the applicationUser
        restApplicationUserMockMvc.perform(get("/api/application-users/{id}", applicationUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(applicationUser.getId().intValue()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION));
    }
    @Test
    @Transactional
    public void getNonExistingApplicationUser() throws Exception {
        // Get the applicationUser
        restApplicationUserMockMvc.perform(get("/api/application-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApplicationUser() throws Exception {
        // Initialize the database
        applicationUserRepository.saveAndFlush(applicationUser);

        int databaseSizeBeforeUpdate = applicationUserRepository.findAll().size();

        // Update the applicationUser
        ApplicationUser updatedApplicationUser = applicationUserRepository.findById(applicationUser.getId()).get();
        // Disconnect from session so that the updates on updatedApplicationUser are not directly saved in db
        em.detach(updatedApplicationUser);
        updatedApplicationUser
            .direccion(UPDATED_DIRECCION);

        restApplicationUserMockMvc.perform(put("/api/application-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedApplicationUser)))
            .andExpect(status().isOk());

        // Validate the ApplicationUser in the database
        List<ApplicationUser> applicationUserList = applicationUserRepository.findAll();
        assertThat(applicationUserList).hasSize(databaseSizeBeforeUpdate);
        ApplicationUser testApplicationUser = applicationUserList.get(applicationUserList.size() - 1);
        assertThat(testApplicationUser.getDireccion()).isEqualTo(UPDATED_DIRECCION);
    }

    @Test
    @Transactional
    public void updateNonExistingApplicationUser() throws Exception {
        int databaseSizeBeforeUpdate = applicationUserRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApplicationUserMockMvc.perform(put("/api/application-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(applicationUser)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationUser in the database
        List<ApplicationUser> applicationUserList = applicationUserRepository.findAll();
        assertThat(applicationUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApplicationUser() throws Exception {
        // Initialize the database
        applicationUserRepository.saveAndFlush(applicationUser);

        int databaseSizeBeforeDelete = applicationUserRepository.findAll().size();

        // Delete the applicationUser
        restApplicationUserMockMvc.perform(delete("/api/application-users/{id}", applicationUser.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ApplicationUser> applicationUserList = applicationUserRepository.findAll();
        assertThat(applicationUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
