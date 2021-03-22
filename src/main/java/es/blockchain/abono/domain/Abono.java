package es.blockchain.abono.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Abono.
 */
@Entity
@Table(name = "abono")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Abono implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_alquiler_desde")
    private Instant fechaAlquilerDesde;

    @Column(name = "fecha_alquiler_hasta")
    private Instant fechaAlquilerHasta;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "idLocalidad")
    private Long idLocalidad;

    @OneToOne
    @JoinColumn(unique = true)
    private ApplicationUser internalUser;

    @ManyToOne
    @JsonIgnoreProperties(value = "abonos", allowSetters = true)
    private Temporada temporada;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaAlquilerDesde() {
        return fechaAlquilerDesde;
    }

    public Abono fechaAlquilerDesde(Instant fechaAlquilerDesde) {
        this.fechaAlquilerDesde = fechaAlquilerDesde;
        return this;
    }

    public void setFechaAlquilerDesde(Instant fechaAlquilerDesde) {
        this.fechaAlquilerDesde = fechaAlquilerDesde;
    }

    public Instant getFechaAlquilerHasta() {
        return fechaAlquilerHasta;
    }

    public Abono fechaAlquilerHasta(Instant fechaAlquilerHasta) {
        this.fechaAlquilerHasta = fechaAlquilerHasta;
        return this;
    }

    public void setFechaAlquilerHasta(Instant fechaAlquilerHasta) {
        this.fechaAlquilerHasta = fechaAlquilerHasta;
    }

    public String getDireccion() {
        return direccion;
    }

    public Abono direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public ApplicationUser getInternalUser() {
        return internalUser;
    }

    public Abono internalUser(ApplicationUser applicationUser) {
        this.internalUser = applicationUser;
        return this;
    }

    public void setInternalUser(ApplicationUser applicationUser) {
        this.internalUser = applicationUser;
    }

    public Long getIdLocalidad() {
        return idLocalidad;
    }

    public Abono idLocalidad(Long idLocalidad) {
        this.idLocalidad = idLocalidad;
        return this;
    }

    public void setIdLocalidad(Long idLocalidad) {
        this.idLocalidad = idLocalidad;
    }


    public Temporada getTemporada() {
        return temporada;
    }

    public Abono temporada(Temporada temporada) {
        this.temporada = temporada;
        return this;
    }

    public void setTemporada(Temporada temporada) {
        this.temporada = temporada;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Abono)) {
            return false;
        }
        return id != null && id.equals(((Abono) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Abono{" +
            "id=" + getId() +
            ", fechaAlquilerDesde='" + getFechaAlquilerDesde() + "'" +
            ", fechaAlquilerHasta='" + getFechaAlquilerHasta() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", idLocalidad=" + getIdLocalidad() +
            "}";
    }
}
