
# Trabalho de Conclusão de curso - Sistema de Saúde Unificado

## Descrição:

Uma abordagem para a integração das informações de prontuários médicos entre as
diversas redes de saúde. Para isso, durante a pesquisa visamos criar uma rede descentralizada
blockchain baseada em Ethereum em que serão produzidos contratos inteligentes para automatiza-
ção, autenticação e armazenamento das referências dos portuários médicos no sistema. Como as
aplicações web tradicionais não possuem suporte para a comunicação com essa tecnologia, será
criada uma Application Programming Interface (API) que fará a integração entre a blockchain, os
contratos inteligentes e os arquivos no InterPlanetary File System (IPFS), salvando, recuperando
e dando acesso aos registros que serão disponibilizados ao usuário final, seja ele médico ou
13
paciente. Através dela os hospitais poderão fazer a integração da sua interface com a rede
completa de saúde.

## Pré-Requisitos

### Blockchain
Recomendamos que execute o projeto localmente usando [Ganache/Truffle](https://trufflesuite.com/). 

Execute o ganache criando um servidor blockchain local, certifique-se que as configurações no arquivo ./saude-unificada-contratos/truffle-config.js estão de acordo com o rede.

Então execute os seguintes comandos:
```bash
$ cd saude-unificada-contratos
$ truffle migrate
```

Após a migração será criada, salve o endereço e a ABI do contrato, pois serão usadas posteriormente. 

### IPFS
Para integração com o IPFS usamos [Web3Storage](https://web3.storage/docs/intro/). 

Siga o [tutorial](https://web3.storage/docs/how-tos/generate-api-token/) para geração do token, salve a chave de sua API para uso posterior.

## Configuração da API

Na raiz do projeto saude-unificada-server modifique '.developement.env', crie as variáveis de ambientes localizadas no arquivo config/configuration.ts, adicionando a ABI e o endereço do contrato, a chave do Web3Storage e crie uma chave de 256 bits para ser usado como chave privada do AES.

Para execução da API execute:

```bash
$ npm install

# watch mode
$ npm run start:dev
```

## Configuração do Frontend

Para execução do frontend execute:

```bash
$ npm install

# watch mode
$ npm run dev
```

## Criadores

- Pedro Martins e Sá
- Pedro Henrique Souza Flores

## License

Nest is [MIT licensed](LICENSE).
