export function validateEnv(): void {
    if(!process.env.DATABASE_URL){
        //eslint-disable-next-line no-console
        console.error("Erro de configuração: a variavel de ambiente DATABASE_URL é obrigatória e não foi definida.");
        process.exit(1);
    }
}