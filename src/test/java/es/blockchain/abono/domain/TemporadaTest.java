package es.blockchain.abono.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import es.blockchain.abono.web.rest.TestUtil;

public class TemporadaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Temporada.class);
        Temporada temporada1 = new Temporada();
        temporada1.setId(1L);
        Temporada temporada2 = new Temporada();
        temporada2.setId(temporada1.getId());
        assertThat(temporada1).isEqualTo(temporada2);
        temporada2.setId(2L);
        assertThat(temporada1).isNotEqualTo(temporada2);
        temporada1.setId(null);
        assertThat(temporada1).isNotEqualTo(temporada2);
    }
}
