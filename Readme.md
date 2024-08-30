# Shopper Back-End Test

Esta API foi desenvolvida para gerenciar e processar leituras de consumo de água e gás. Ela inclui endpoints para submeter novas leituras, listar leituras existentes e validação de dados.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- SQLite
- Sequelize
- Tesseract.js (para OCR)
- Google Gemini API (para extração de valor da imagem)

## Instalação

1. **Clone o repositório:**

   ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_REPOSITORIO>
   ```

2. **GEMINI_API_KEY:** No aquivo ``` aiConfig ``` substitua <API_KEY> com a sua chave do Gemini

3. **Build o Docker Image:**
   ```bash
    docker compose build
   ```

4. **Rodar Aplicação:**
   ```bash
    docker compose up
   ```


## Endpoints
### POST

Submete uma nova leitura de consumo de água ou gás.

**URL:** `http://localhost:3000/water-gas-reading`

**Método:** `POST`

- params: 

```bash
  {
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER" ou "GAS"
  }
```

## PATCH /confirm

Este endpoint é responsável por confirmar ou corrigir o valor lido pelo LLM.

### Request

**URL:** `http://localhost:3000/water-gas-reading/confirm`

**Método:** `PATCH`

**Body:**
```json
{
  "measure_uuid": "string",
  "confirmed_value": integer
}
```

### GET

Lista todas as leituras realizadas por um cliente. Pode opcionalmente filtrar por measure_type.

Query Parameters:

**URL:** `http://localhost:3000/water-gas-reading/customer_code/list?measure_type=GAS`
- measure_type (opcional): "WATER" ou "GAS"

**Método:** `GET`

## Melhorias
- Fazer o measure_value voltar como integer
- Refazer o método PATCH para que consiga corrigir o valor lido pelo LLM
- Criar um arquivo .env na raíz do projeto para ler a API_KEY do Gemini