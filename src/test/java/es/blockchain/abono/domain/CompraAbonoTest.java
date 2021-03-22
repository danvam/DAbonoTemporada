package es.blockchain.abono.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import es.blockchain.abono.web.rest.TestUtil;

public class CompraAbonoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompraAbono.class);
        CompraAbono compraAbono1 = new CompraAbono();
        compraAbono1.setId(1L);
        CompraAbono compraAbono2 = new CompraAbono();
        compraAbono2.setId(compraAbono1.getId());
        assertThat(compraAbono1).isEqualTo(compraAbono2);
        compraAbono2.setId(2L);
        assertThat(compraAbono1).isNotEqualTo(compraAbono2);
        compraAbono1.setId(null);
        assertThat(compraAbono1).isNotEqualTo(compraAbono2);
    }
}
