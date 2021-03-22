package es.blockchain.abono.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import es.blockchain.abono.domain.enumeration.Etapas;

/**
 * A Temporada.
 */
@Entity
@Table(name = "temporada")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Temporada implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "fase_etapa")
    private Etapas faseEtapa;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "actual_id_localidad")
    private Long actualIdLocalidad;

    @Column(name = "actual_id_espectaculo")
    private Long actualIdEspectaculo;

    @Column(name = "actual_id_abono")
    private Long actualIdAbono;

    @Column(name = "precio_base")
    private Long precioBase;

    @Column(name = "tipos_localidad")
    private Long tiposLocalidad;

    @Column(name = "factor_incremento_tipo")
    private Long factorIncrementoTipo;

    @Column(name = "porcentaje_alquiler")
    private Long porcentajeAlquiler;

    @Column(name = "dinero_abono")
    private String dineroAbono;

    @NotNull
    @Column(name = "direccion", nullable = false)
    private String direccion;

    @NotNull
    @Size(max = 6000)
    @Column(name = "abi", length = 6000, nullable = false)
    private String abi;

    @NotNull
    @Size(max = 6000)
    @Column(name = "abi_d_abono", length = 6000, nullable = false)
    private String abiDAbono;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Etapas getFaseEtapa() {
        return faseEtapa;
    }

    public Temporada faseEtapa(Etapas faseEtapa) {
        this.faseEtapa = faseEtapa;
        return this;
    }

    public void setFaseEtapa(Etapas faseEtapa) {
        this.faseEtapa = faseEtapa;
    }

    public String getNombre() {
        return nombre;
    }

    public Temporada nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getActualIdLocalidad() {
        return actualIdLocalidad;
    }

    public Temporada actualIdLocalidad(Long actualIdLocalidad) {
        this.actualIdLocalidad = actualIdLocalidad;
        return this;
    }

    public void setActualIdLocalidad(Long actualIdLocalidad) {
        this.actualIdLocalidad = actualIdLocalidad;
    }

    public Long getActualIdEspectaculo() {
        return actualIdEspectaculo;
    }

    public Temporada actualIdEspectaculo(Long actualIdEspectaculo) {
        this.actualIdEspectaculo = actualIdEspectaculo;
        return this;
    }

    public void setActualIdEspectaculo(Long actualIdEspectaculo) {
        this.actualIdEspectaculo = actualIdEspectaculo;
    }

    public Long getActualIdAbono() {
        return actualIdAbono;
    }

    public Temporada actualIdAbono(Long actualIdAbono) {
        this.actualIdAbono = actualIdAbono;
        return this;
    }

    public void setActualIdAbono(Long actualIdAbono) {
        this.actualIdAbono = actualIdAbono;
    }

    public Long getPrecioBase() {
        return precioBase;
    }

    public Temporada precioBase(Long precioBase) {
        this.precioBase = precioBase;
        return this;
    }

    public void setPrecioBase(Long precioBase) {
        this.precioBase = precioBase;
    }

    public Long getTiposLocalidad() {
        return tiposLocalidad;
    }

    public Temporada tiposLocalidad(Long tiposLocalidad) {
        this.tiposLocalidad = tiposLocalidad;
        return this;
    }

    public void setTiposLocalidad(Long tiposLocalidad) {
        this.tiposLocalidad = tiposLocalidad;
    }

    public Long getFactorIncrementoTipo() {
        return factorIncrementoTipo;
    }

    public Temporada factorIncrementoTipo(Long factorIncrementoTipo) {
        this.factorIncrementoTipo = factorIncrementoTipo;
        return this;
    }

    public void setFactorIncrementoTipo(Long factorIncrementoTipo) {
        this.factorIncrementoTipo = factorIncrementoTipo;
    }

    public Long getPorcentajeAlquiler() {
        return porcentajeAlquiler;
    }

    public Temporada porcentajeAlquiler(Long porcentajeAlquiler) {
        this.porcentajeAlquiler = porcentajeAlquiler;
        return this;
    }

    public void setPorcentajeAlquiler(Long porcentajeAlquiler) {
        this.porcentajeAlquiler = porcentajeAlquiler;
    }

    public String getDineroAbono() {
        return dineroAbono;
    }

    public Temporada dineroAbono(String dineroAbono) {
        this.dineroAbono = dineroAbono;
        return this;
    }

    public void setDineroAbono(String dineroAbono) {
        this.dineroAbono = dineroAbono;
    }

    public String getDireccion() {
        return direccion;
    }

    public Temporada direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getAbi() {
        return abi;
    }

    public Temporada abi(String abi) {
        this.abi = abi;
        return this;
    }

    public void setAbi(String abi) {
        this.abi = abi;
    }

    public String getAbiDAbono() {
        return abiDAbono;
    }

    public Temporada abiDAbono(String abiDAbono) {
        this.abiDAbono = abiDAbono;
        return this;
    }

    public void setAbiDAbono(String abiDAbono) {
        this.abiDAbono = abiDAbono;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Temporada)) {
            return false;
        }
        return id != null && id.equals(((Temporada) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Temporada{" +
            "id=" + getId() +
            ", faseEtapa='" + getFaseEtapa() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", actualIdLocalidad=" + getActualIdLocalidad() +
            ", actualIdEspectaculo=" + getActualIdEspectaculo() +
            ", actualIdAbono=" + getActualIdAbono() +
            ", precioBase=" + getPrecioBase() +
            ", tiposLocalidad=" + getTiposLocalidad() +
            ", factorIncrementoTipo=" + getFactorIncrementoTipo() +
            ", porcentajeAlquiler=" + getPorcentajeAlquiler() +
            ", dineroAbono='" + getDineroAbono() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", abi='" + getAbi() + "'" +
            ", abiDAbono='" + getAbiDAbono() + "'" +
            "}";
    }
}
