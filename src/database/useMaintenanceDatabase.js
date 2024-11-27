import { useSQLiteContext } from "expo-sqlite";

export function useMaintenanceDatabase() {
const database = useSQLiteContext()

async function resetDatabase() {
    try {
        await database.withTransactionAsync(async () => {

            //DELETE ----> apaga os dados da tabela/entidade
            //DROP ----> apaga a tabela/entidade

            try{
               await database.execAsync (`DROP INDEX IF EXISTS idx_payments_data_pagamento;`);
               await database.execAsync (`DROP INDEX IF EXISTS idx_users_nome;`);
               await database.execAsync (`DROP TABLE IF EXISTS payments;`);
               await database.execAsync (`DROP TABLE IF EXISTS users;`);
               await database.execAsync (`  
                    CREATE TABLE users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nome TEXT,
                        curso TEXT,
                        email TEXT NOT NULL UNIQUE,
                        data_pagamento DATE,
                        senha TEXT NOT NULL DEFAULT 'A123456a!',
                        role TEXT NOT NULL DEFAULT 'USER',
                        created_at DATE DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATE
                );
                    `);
                await database.execAsync (`
                    CREATE TABLE payments (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        user_cadastro INTEGER NOT NULL,
                        valor_pago REAL NOT NULL,
                        data_pagamento DATE NOT NULL,
                        numero_recibo TEXT NOT NULL,
                        observacao TEXT,
                        imagem TEXT DEFAULT "",
                        created_at DATE DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATE,
                        FOREIGN KEY (user_id) REFERENCES users(id),
                        FOREIGN KEY (user_cadastro) REFERENCES users(id)
                );
                    `);
                //para toda pesquisa que for feita no banco de dados, será criado um índice para o campo nome da tabela users
                    await database.execAsync (` CREATE INDEX IF NOT EXISTS idx_users_nome ON users (nome);`);
                    await database.execAsync (` CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento ON payments (data_pagamento);`);
                
                //Inserindo dados na tabela users
                    await database.execAsync (`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Super', 'super@email.com', 'A123456a!', 'SUPER');`);
                    await database.execAsync (`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Adm', 'adm@email.com', 'A123456a!', 'ADM');`);
                    await database.execAsync (`INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('User', 'user@email.com', 'A123456a!', 'USER');`);

                    console.log("Database resetsuccessfully ");
            } catch (error) {
                console.log ("useMaintenanceDatabase resetDatabase error: ", error);
                throw error;
            }
        })

        //no codigo do professor não tem essa parte, mas caso não coloque, dá erro
        console.log("useMaintenanceDatabase resetDatabase success ");

    }
    catch (error) {
        console.log ("useMaintenanceDatabase resetDatabase error: ", error);
    }

}

    async function importUsers(){
        const URL = "https://api.mockaroo.com/api/13db6d70?count=40&key=182a4c60";
        try {
            const response = await fetch(URL);
            //JSON --> JavaScript Object Notation
            //TEXT --> Texto (retornar os dados como texto)
            const users = await response.text();

            await database.withTransactionAsync(async () => {
                users.split(/\r?\n/).forEach(async (line) => {
                    try {
                        await database.execAsync(line);
                    } catch (error) {
                        console.log("Error importing user: ", error);
                    }
                })
            })
            console.log("Usuários importados com sucesso ")
        } catch (error) {
            console.log("useMaintenanceDatabase importUsers error: ", error);
            throw error;
        }
    }

    async function importPayments(){
        const URL = "https://api.mockaroo.com/api/4a051fa0?count=40&key=182a4c60";
        
       
        try {
            
            const response = await fetch(URL);
            //JSON --> JavaScript Object Notation
            //TEXT --> Texto (retornar os dados como texto)
            const users = await response.text();

            await database.withTransactionAsync(async () => {
                users.split(/\r?\n/).forEach(async (line) => {
                    try {
                        await database.execAsync(line);
                    } catch (error) {
                        console.log("Error importing payments: ", error);
                    }
                })
            })
            console.log("Pagamentos importados com sucesso ");
        } catch (error) {
            console.log("useMaintenanceDatabase importPayments error: ", error);
            throw error;
        }
    }

    
return { resetDatabase, importUsers, importPayments};
}