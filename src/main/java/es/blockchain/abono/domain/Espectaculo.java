package es.blockchain.abono.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Espectaculo.
 */
@Entity
@Table(name = "espectaculo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Espectaculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_espectaculo")
    private Long idEspectaculo;

    @NotNull
    @Column(name = "fecha_espectaculo", nullable = false)
    private Instant fechaEspectaculo;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "simbolo", nullable = false)
    private String simbolo;

    @ManyToOne
    @JsonIgnoreProperties(value = "espectaculos", allowSetters = true)
    private Temporada temporada;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdEspectaculo() {
        return idEspectaculo;
    }

    public Espectaculo idEspectaculo(Long idEspectaculo) {
        this.idEspectaculo = idEspectaculo;
        return this;
    }

    public void setIdEspectaculo(Long idEspectaculo) {
        this.idEspectaculo = idEspectaculo;
    }

    public Instant getFechaEspectaculo() {
        return fechaEspectaculo;
    }

    public Espectaculo fechaEspectaculo(Instant fechaEspectaculo) {
        this.fechaEspectaculo = fechaEspectaculo;
        return this;
    }

    public void setFechaEspectaculo(Instant fechaEspectaculo) {
        this.fechaEspectaculo = fechaEspectaculo;
    }

    public String getNombre() {
        return nombre;
    }

    public Espectaculo nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSimbolo() {
        return simbolo;
    }

    public Espectaculo simbolo(String simbolo) {
        this.simbolo = simbolo;
        return this;
    }

    public void setSimbolo(String simbolo) {
        this.simbolo = simbolo;
    }

    public Temporada getTemporada() {
        return temporada;
    }

    public Espectaculo temporada(Temporada temporada) {
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
        if (!(o instanceof Espectaculo)) {
            return false;
        }
        return id != null && id.equals(((Espectaculo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Espectaculo{" +
            "id=" + getId() +
            ", idEspectaculo=" + getIdEspectaculo() +
            ", fechaEspectaculo='" + getFechaEspectaculo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", simbolo='" + getSimbolo()  + "'" +
            "}";
    }
}
