package es.blockchain.abono.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import es.blockchain.abono.web.rest.TestUtil;

public class TransferirTokensTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransferirTokens.class);
        TransferirTokens transferirTokens1 = new TransferirTokens();
        transferirTokens1.setId(1L);
        TransferirTokens transferirTokens2 = new TransferirTokens();
        transferirTokens2.setId(transferirTokens1.getId());
        assertThat(transferirTokens1).isEqualTo(transferirTokens2);
        transferirTokens2.setId(2L);
        assertThat(transferirTokens1).isNotEqualTo(transferirTokens2);
        transferirTokens1.setId(null);
        assertThat(transferirTokens1).isNotEqualTo(transferirTokens2);
    }
}
