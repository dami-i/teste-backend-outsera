# Teste de Backend Outsera

- [Instruções de execução](#instruções-de-execução)
	- [Pré-requisitos](#pré-requisitos)
	- [Passo-a-passo](#passo-a-passo)
		- [1. Clonar o repositório e instalar as dependências](#1-clonar-o-repositório-e-instalar-as-dependências)
		- [2. Efetuar o build do código-fonte](#2-efetuar-o-build-do-código-fonte)
		- [3. Rodar os testes de integração](#3-rodar-os-testes-de-integração)
		- [4. Executar a aplicação](#4-executar-a-aplicação)
- [Executando a aplicação com outro conjunto de dados](#executando-a-aplicação-com-outro-conjunto-de-dados)

## Instruções de execução

### Pré-requisitos

- **Node.js** versão 22 ou superior ([download](https://nodejs.org/en/download/))
- (Opcional, mas recomendado) Compilador **TypeScript** mais atual instalado globalmente (`npm install -g typescript`)

### Passo-a-passo

#### 1. Clonar o repositório e instalar as dependências

```bash
git clone https://github.com/dami-i/teste-backend-outsera.git
cd teste-backend-outsera
npm install
```

#### 2. Efetuar o build do código-fonte

```bash
npm run build
```

#### 3. Rodar os testes de integração

```bash
npm test
```

#### 4. Executar a aplicação

```bash
npm start
```

Um servidor web será iniciado em **[http://localhost:3000/](http://localhost:3000/)**.

> [!NOTE]
> Ao acessar a URL pelo navegador, você será automaticamente redirecionado para a página de documentação da API.

> [!IMPORTANT]
> Caso a porta 3000 esteja ocupada, o programa irá encontrar a próxima disponível.

## Executando a aplicação com outro conjunto de dados

O repositório contém o CSV fornecido para o desenvolvimento da aplicação.

Caso desejar, é possível substituir os arquivos:

- `data/movielist.csv` – para uso em produção
- `data/movielist.test.csv` – para execução dos testes de integração
