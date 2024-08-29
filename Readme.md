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


## Endpoints
### POST

Submete uma nova leitura de consumo de água ou gás.

- url: 

```bash
  http://localhost:3000/water-gas-reading
```

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

**URL:** `/confirm`

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

- measure_type (opcional): "WATER" ou "GAS"
- url: 

```bash
  http://localhost:3000/customer_code/list?measure_type=GAS
```
