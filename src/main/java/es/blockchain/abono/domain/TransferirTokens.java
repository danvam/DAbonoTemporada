package es.blockchain.abono.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TransferirTokens.
 */
@Entity
@Table(name = "transferir_tokens")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TransferirTokens implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cantidad")
    private Long cantidad;

    @Column(name = "password")
    private String password;

    @ManyToOne
    @JsonIgnoreProperties(value = "transferirTokens", allowSetters = true)
    private ApplicationUser applicationUser;

    @ManyToOne
    @JsonIgnoreProperties(value = "transferirTokens", allowSetters = true)
    private Temporada temporada;

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

    public TransferirTokens cantidad(Long cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public String getPassword() {
        return password;
    }

    public TransferirTokens password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public TransferirTokens applicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        return this;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    public Temporada getTemporada() {
        return temporada;
    }

    public TransferirTokens temporada(Temporada temporada) {
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
        if (!(o instanceof TransferirTokens)) {
            return false;
        }
        return id != null && id.equals(((TransferirTokens) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TransferirTokens{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
