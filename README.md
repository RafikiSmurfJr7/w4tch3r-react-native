# Documentação

## Para executar o servidor de backend

### FastApi

Para executar o servidor de backend feito em [Python](https://python.org) e [FastApi](https://fastapi.tiangolo.com/)

Criar um ambiente virtual (Virtual Environment) usando o [`venv`](https://docs.python.org/3/library/venv.html) dentro da pasta `backend/`

> `python -m venv env`

Ativar o ambiente virtual

> Bash/zsh: `source ./env/bin/activate`
>
> Fish: `source ./env/bin/activate.fish`
>
> PowerShell: ` .\env\Scripts\Activate.ps1`
>
> Cmd: ` .\env\Scripts\activate.bat`

Para desativar o ambiente virtual basta executar o comando `deactivate`

Instalar os requirements localizados em `requirements.txt`

> `pip install -r requirements.txt`

Se houver algum erro neste passo verifique se foi um pacote chamado `uvloop==x.xx.x` se sim pode removê-lo.

### MongoDb

Importar as collections disponibilizadas na pasta `backend` com os nomes de `w4tch3r.users.json` e `w4tch3r.favorites.json` e alterar a connection string no ficheiro `backend/db.py` para ficar em conformidade com a base de dados mongodb.

Por fim executar o seguinte comando, para ligar o servidor:

> `uvicorn main:app --reload`

## Para executar o frontend

Executar os seguintes comandos:

> `npm i`
>
> `npx expo start`

Alterar a configuração do `Axios` localizada no ficheiro `config/axios.conf.js` para por o ip do emulador ou do dispositivo.

### Dados de Utilizador para fazer login

| Nome de utilizador | Password |
| :----------------: | :------: |
|       `user`       |  `user`  |
