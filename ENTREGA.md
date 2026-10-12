# Entrega — Daniel Santos

> Preencha este arquivo. Ele nos ajuda a rodar e entender o seu projeto.

## Como rodar
**Depende.** <br/>
Caso queria rodar cada projeto sem o docker, primeiro rode os serviços base do mock e do banco:<br/>
`docker compose up mock-service db`<br/>
`npm run start:api`<br/>
`npm run start:front`

Caso queira executar tudo de uma só vez, basta usar o docker subindo todos os serviços: <br/>
`docker compose up`

## O que foi feito
- **Front-end**: 
    - campo para inserir o CPF
    - lista dos checkins já realizados
    - Mensagens de erro
- **Back-end com Nest**:
    - endpoint `setcheckin/:cpf (POST)` para cadastro de novo checkin
    - endpoint `getcheckins (GET)` para listar todos os checkins já realizados (ordenados pela hora do checkin)
    - uso de banco de dados Postgres
    - Migrations de manipulação do banco utilizando node-pg-migrate
    - Testes unitários simples com os endpoints:
        - Na pasta raíz: `npm run test:api`
- **Geral**:
    - serviços subidos com docker
    - configuração de comandos personalizados no `package.json`
    - utilização de variáveis de ambiente com dotenv (diferenciação entre ambientes)
    

## Onde guardei os dados
**Banco**<br/>
Maior organização, persistência e melhor controle da estrutura dos dados, além de certas automatizações como o __'auto_increment'__ na coluna de __id__ e o valor default para a hora do checkin com `now()` na coluna __horaCheckin__

## Decisões e dificuldades
- **Decisões**:
    - Utilização de migrations para melhor controle das mudanças feitas no banco
    - Utilizar as mensagens de erro do próprio mock-service
    - Utilização do dotenv e de variáveis de ambiente para fácil configuração de ambiente
    - queries protegidas contra SQL INJECTION

- **Dificuldades**:
    - **Escrita dos testes**: comecei a escrever os testes unitários no arquivo de testes end-to-end, puramente por estar acostumado com escrevê-los na pasta /test
    - **Diferenciação das variáveis de ambiente dentro e fora da rede do Docker**: Entendi rápido que, por padrão, a url de cada serviço, dentro da rede do Docker, leva o nome do próprio serviço. Mas, ao expor a porta, o endereço acessado pelo front é o próprio localhost, não o host da rede do Docker. Isso acabou gerando uma redundância desnecessária nas variáveis de ambiente de configuração de host da API e host permitido pela política de CORS no back-end.
    - **Falta de experiência com NestJs**: Vi que o NestJs se parece muito, em termos de funcionamento, com o .Net e o Spring. Provavelmente foi feito para quem veio desses outros frameworks mais robustos. Tive pouquíssima experiência com spring e apenas estudei levemente o .Net, então consegui me localizar no NestJs. Apesar dele rodar Express por baixo (que é onde mais tenho experiência), de início estranhei um pouco. Pela limitação do tempo, pulei o entendimento de como funciona a Injeção de Dependência e outros conceitos basilares do Nest e apenas foquei na superficialidade e na parte prática. Foquei no "quê" deve ser feito e não no "porquê"

## O que faria com mais tempo
- **Paginação**: com o crescente dos checkins, carregá-los tods de uma vez acabaria por demorar muito. Então o faria aos poucos
- **useContext**: organizaria melhor as responsabilidades no front, usando useContext para exportar métodos e dados para pode limpar os componentes e focá-los apenas na renderização e processamento pontual/final
- **Mais testes**: faria testes end-to-end para verificar o funcionamento do back-end inteiro e verificaria a possibilidade de melhores testes automatizados; e o mesmo para o front-end
- **Autenticação e autorização**: claro, provavelmente eu precisaria estudar um pouco mais e ter bem mais tempo (para fazer telas, condições, middlewares, etc), mas seria legal.
- **Maior entendimento sobre o funcionamente do Docker e do Nest**: estudaria cada estapa do que estivesse fazendo bem mais a fundo, para entender como tudo funciona por baixo dos panos
- **Pipeline de CI/CD + Deploy**: deixaria a aplicação disponível online com um fluxo automatizado com, provavelmente, Vercel, Github Actions e Neon databases. O problema disso seria recriar o serviço do mock e executar o seu deploy. Uma alternativa a isso seria subir os contâineres Docker em um orquestrador, mas é possível que levaria ainda mais tempo simplesmente porquê nunca fiz isso (deve ser fácil, é mais uma questão de conhecer a ferramenta)
- **Melhor design para o front**: O front-end está funcional mas está pouco agradável aos olhos. Seria legal criar uma identidade visual, design system e uma interface mais bonita
