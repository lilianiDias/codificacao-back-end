export const config = {
  runtime: 'edge',
};  

export default function handler(req: Request) {
    const inicio = new Date();
    return new Response(
        JSON.stringify({
            mensagem: 'Função executada na borda de rede.',
              horarioDoServidor: new Date().toISOString(),
              regiao: 'local-dev',
                tempoDeExecucao: `${ Date.now() - inicio.getTime()}ms`,
    
    }),
    {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    },
);

}