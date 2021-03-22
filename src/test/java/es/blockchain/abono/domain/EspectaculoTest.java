package es.blockchain.abono.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import es.blockchain.abono.web.rest.TestUtil;

public class EspectaculoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Espectaculo.class);
        Espectaculo espectaculo1 = new Espectaculo();
        espectaculo1.setId(1L);
        Espectaculo espectaculo2 = new Espectaculo();
        espectaculo2.setId(espectaculo1.getId());
        assertThat(espectaculo1).isEqualTo(espectaculo2);
        espectaculo2.setId(2L);
        assertThat(espectaculo1).isNotEqualTo(espectaculo2);
        espectaculo1.setId(null);
        assertThat(espectaculo1).isNotEqualTo(espectaculo2);
    }
}
