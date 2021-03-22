package es.blockchain.abono.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A AlquilaAbono.
 */
@Entity
@Table(name = "alquila_abono")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AlquilaAbono implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Localidad localidad;

    @OneToOne
    @JoinColumn(unique = true)
    private Espectaculo espectaculo;

    @ManyToOne
    @JsonIgnoreProperties(value = "alquilaAbonos", allowSetters = true)
    private ApplicationUser internalUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Localidad getLocalidad() {
        return localidad;
    }

    public AlquilaAbono localidad(Localidad localidad) {
        this.localidad = localidad;
        return this;
    }

    public void setLocalidad(Localidad localidad) {
        this.localidad = localidad;
    }

    public Espectaculo getEspectaculo() {
        return espectaculo;
    }

    public AlquilaAbono espectaculo(Espectaculo espectaculo) {
        this.espectaculo = espectaculo;
        return this;
    }

    public void setEspectaculo(Espectaculo espectaculo) {
        this.espectaculo = espectaculo;
    }

    public ApplicationUser getInternalUser() {
        return internalUser;
    }

    public AlquilaAbono internalUser(ApplicationUser applicationUser) {
        this.internalUser = applicationUser;
        return this;
    }

    public void setInternalUser(ApplicationUser applicationUser) {
        this.internalUser = applicationUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlquilaAbono)) {
            return false;
        }
        return id != null && id.equals(((AlquilaAbono) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlquilaAbono{" +
            "id=" + getId() +
            "}";
    }
}
