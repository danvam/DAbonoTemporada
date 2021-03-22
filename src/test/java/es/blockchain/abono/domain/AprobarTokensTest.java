package es.blockchain.abono.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import es.blockchain.abono.web.rest.TestUtil;

public class AprobarTokensTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AprobarTokens.class);
        AprobarTokens aprobarTokens1 = new AprobarTokens();
        aprobarTokens1.setId(1L);
        AprobarTokens aprobarTokens2 = new AprobarTokens();
        aprobarTokens2.setId(aprobarTokens1.getId());
        assertThat(aprobarTokens1).isEqualTo(aprobarTokens2);
        aprobarTokens2.setId(2L);
        assertThat(aprobarTokens1).isNotEqualTo(aprobarTokens2);
        aprobarTokens1.setId(null);
        assertThat(aprobarTokens1).isNotEqualTo(aprobarTokens2);
    }
}
