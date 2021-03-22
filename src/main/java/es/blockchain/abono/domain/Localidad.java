package es.blockchain.abono.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Localidad.
 */
@Entity
@Table(name = "localidad")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Localidad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_localidad")
    private Long idLocalidad;

    @NotNull
    @Column(name = "tipo_localidad", nullable = false)
    private Long tipoLocalidad;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "simbolo", nullable = false)
    private String simbolo;

    @ManyToOne
    @JsonIgnoreProperties(value = "localidads", allowSetters = true)
    private Temporada temporada;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdLocalidad() {
        return idLocalidad;
    }

    public Localidad idLocalidad(Long idLocalidad) {
        this.idLocalidad = idLocalidad;
        return this;
    }

    public void setIdLocalidad(Long idLocalidad) {
        this.idLocalidad = idLocalidad;
    }

    public Long getTipoLocalidad() {
        return tipoLocalidad;
    }

    public Localidad tipoLocalidad(Long tipoLocalidad) {
        this.tipoLocalidad = tipoLocalidad;
        return this;
    }

    public void setTipoLocalidad(Long tipoLocalidad) {
        this.tipoLocalidad = tipoLocalidad;
    }

    public String getNombre() {
        return nombre;
    }

    public Localidad nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSimbolo() {
        return simbolo;
    }

    public Localidad simbolo(String simbolo) {
        this.simbolo = simbolo;
        return this;
    }

    public void setSimbolo(String simbolo) {
        this.simbolo = simbolo;
    }

    public Temporada getTemporada() {
        return temporada;
    }

    public Localidad temporada(Temporada temporada) {
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
        if (!(o instanceof Localidad)) {
            return false;
        }
        return id != null && id.equals(((Localidad) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Localidad{" +
            "id=" + getId() +
            ", idLocalidad=" + getIdLocalidad() +
            ", tipoLocalidad=" + getTipoLocalidad() +
            ", nombre='" + getNombre() + "'" +
            ", simbolo='" + getSimbolo()  + "'" +
            "}";
    }
}
