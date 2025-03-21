# Teste de Backend Outsera

- [Instruções de execução](#instruções-de-execução)
	- [Opção 1 – Execução manual (via Node.js)](#opção-1--execução-manual-via-nodejs)
		- [Pré-requisitos](#pré-requisitos)
		- [Passo-a-passo](#passo-a-passo)
	- [Opção 2 - Via Docker com testes durante a criação da imagem](#opção-2---via-docker-com-testes-durante-a-criação-da-imagem)
		- [Pré-requisitos](#pré-requisitos-1)
		- [Passo-a-passo](#passo-a-passo-1)
- [Executando a aplicação com outro conjunto de dados](#executando-a-aplicação-com-outro-conjunto-de-dados)

## Instruções de execução

### Opção 1 – Execução manual (via Node.js)

#### Pré-requisitos

- **Node.js** versão 22 ou superior ([download](https://nodejs.org/en/download/))
- (Opcional, mas recomendado) Compilador **TypeScript** mais atual instalado globalmente (`npm install -g typescript`)

#### Passo-a-passo

**1. Clonar o repositório e instalar as dependências**

```bash
git clone https://github.com/dami-i/teste-backend-outsera.git
cd teste-backend-outsera
npm install
```

**2. Efetuar o build do código-fonte**

```bash
npm run build
```

**3. Rodar os testes de integração**

```bash
npm test
```

**4. Executar a aplicação**

```bash
npm start
```

Um servidor web será iniciado em **[http://localhost:3000/](http://localhost:3000/)**.

> [!NOTE]
> Ao acessar a URL pelo navegador, você será automaticamente redirecionado para a página de documentação da API.

> [!IMPORTANT]
> Caso a porta 3000 esteja ocupada, o programa irá encontrar a próxima disponível.

### Opção 2 - Via Docker com testes durante a criação da imagem

#### Pré-requisitos

- Docker Desktop instalado ([download](https://docs.docker.com/get-started/introduction/get-docker-desktop/)) e rodando

#### Passo-a-passo

**1. Clonar o repositório**

```bash
git clone https://github.com/dami-i/teste-backend-outsera.git
cd teste-backend-outsera
```

**2. Construir a imagem Docker**

```bash
docker build -t teste-backend-dami --progress=plain .
```

**3. Rodar o container**

```bash
docker run --rm -it -v "$(pwd)/data:/app/data" -p 3000:3000 teste-backend-dami
```

> [!WARNING]
> O comando acima vinculará o diretório `data/` (onde consta o arquivo CSV) ao container.

> [!NOTE]
> A flag `--rm` garante que o container será removido após encerrar o servidor com <kbd>Ctrl</kbd>+<kbd>C</kbd>.

> [!TIP]
> Para remover a imagem:
>
> ```bash
> docker image rm teste-backend-dami
> ```

## Executando a aplicação com outro conjunto de dados

O repositório contém o CSV fornecido para o desenvolvimento da aplicação.

Caso desejar, é possível substituir o arquivo **`data/movielist.csv`** antes de executar a aplicação.
