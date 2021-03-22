package es.blockchain.abono.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A AprobarTokens.
 */
@Entity
@Table(name = "aprobar_tokens")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AprobarTokens implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cantidad")
    private Long cantidad;

    @Column(name = "password")
    private String password;

    @ManyToOne
    @JsonIgnoreProperties(value = "aprobarTokens", allowSetters = true)
    private Temporada temporada;

    @ManyToOne
    @JsonIgnoreProperties(value = "aprobarTokens", allowSetters = true)
    private ApplicationUser applicationUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public AprobarTokens cantidad(Long cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public String getPassword() {
        return password;
    }

    public AprobarTokens password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Temporada getTemporada() {
        return temporada;
    }

    public AprobarTokens temporada(Temporada temporada) {
        this.temporada = temporada;
        return this;
    }

    public void setTemporada(Temporada temporada) {
        this.temporada = temporada;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public AprobarTokens applicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        return this;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AprobarTokens)) {
            return false;
        }
        return id != null && id.equals(((AprobarTokens) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AprobarTokens{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
