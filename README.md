# Infromacion del ejercicio

El ejercicio todavia esta incompleto, pero queria entregar por lo menos lo que pude terminar de hacer por ahora,
en la semana tengo pensado terminar las siguientes funcionalidades aun no implementadas:

- The same employee cannot have 2 titles with the same dept_name
- Can't be 2 employees assigned to the same department in the same portion of time
- Can't be 2 managers assigned to the same department in the same portion of time

To run this app:
# Install
## nvm (Node Version Manager)
[nvm](https://github.com/nvm-sh/nvm)
## run-rs
[run-rs](https://www.npmjs.com/package/run-rs)
```bash
npm install run-rs -g
```
## mongo-express
[mongo-express](https://www.npmjs.com/package/mongo-express)
```bash
npm install -g mongo-express
```
## Download npm dependencies
At the project root folder run
```bash
npm install
```
# Run
Start mongodb with replica sets
```bash
run-rs
```

Start node app
```bash
npm run dev
```

To test the GraphQL queries through GraphiQL access to
localhost:3000/graphql

# Extras
To interact with mongodb you can use mongo-express
```bash
mongo-express -U "mongodb://localhost:27017,localhost:27018,localhost:27019/example?replicaSet=rs"
```