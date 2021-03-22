package es.blockchain.abono.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import es.blockchain.abono.web.rest.TestUtil;

public class AlquilaAbonoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlquilaAbono.class);
        AlquilaAbono alquilaAbono1 = new AlquilaAbono();
        alquilaAbono1.setId(1L);
        AlquilaAbono alquilaAbono2 = new AlquilaAbono();
        alquilaAbono2.setId(alquilaAbono1.getId());
        assertThat(alquilaAbono1).isEqualTo(alquilaAbono2);
        alquilaAbono2.setId(2L);
        assertThat(alquilaAbono1).isNotEqualTo(alquilaAbono2);
        alquilaAbono1.setId(null);
        assertThat(alquilaAbono1).isNotEqualTo(alquilaAbono2);
    }
}
