

### macOS

install MongoDB with homebrew

1. `brew update`

2. `brew install mongodb`

3. create the directory in the default location by running `mkdir -p /data/db`

4. make sure that the  `/data/db` directory has the right permission，

   ```shell
   sudo chown -R `id -un` /data/db
   ```

run MongoDB

1. *Run the Mongo daemon*: run `sudo mongod` to start Mongo server. Exit it run hit 'ctrl+c'
2. *Run the Mongo shell*: run `mongo` . Exit it run `quite()`

### windows

#### error handling

error：`NODE_PATH不是内部或外部命令的错误`

soultion：

1.  `npm install cross-env -g`

2. `"start": "cross-env NODE_PATH=src node index.js"` instead of `"start": "NODE_PATH=src node index.js"` 

#### install mongoDB

1. download url：https://www.mongodb.com/download-center/community
2. create the data folders to store our databases
   1. create `data` folder in C Drive
   2. create `db` folder in `data`folder
   3. run git bash
   4. run `cd ~`
   5. run `touch .bash_profile`
   6. run vim `bash_profile`
   7. look C → Program Files → MongoDB → Server, just look if it exists
   8. paste in the following code into vim, then `:wq!`
   9. close current git bash applicatio
   10. re-launch git bash and type `mongo --version`, you can see the MongoDB version info.

### all

auto reload: [nodemon](https://nodemon.io)

