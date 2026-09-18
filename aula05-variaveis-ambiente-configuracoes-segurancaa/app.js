import dotenv  from 'dotenv';
dotenv.config();

function iniciarAplicacao() {
  const porta = process.env.PORT || 8080;
  const apiKey = process.env.API_KEY_PAGAMENTO;
  const dbUrl = process.env.DATABASE_URL;

  if (!apiKey) {
    console.error('[Erro CRÍTICO]: A Chave API_KEY_PAGAMENTO não está definida nas variável de ambiente!');
    process.exit(1);
  }

  console.log('=== ||| SERVIÇO DE CONFIGURAÇÃO CARREGADP ||| ===');
  console.log(`SERVIÇO RODANDO NA PORTA ${porta}`);
  console.log(`BANCO DE DADOS: ${dbUrl}`);
  console.log(`APIkey ${apiKey}`);
  console.log(`Status da API: chave de tamanho ${apiKey.length} autenticada.`);
}
iniciarAplicacao();