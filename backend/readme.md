### windows

错误：`NODE_PATH不是内部或外部命令的错误`

解决办法：安装 `npm install cross-env -g`

在 package.json 的 start 里加上 cross-env。 `"start": "NODE_PATH=src node index.js"` 改为 `"start": "cross-env NODE_PATH=src node index.js"`



安装 mongoDB

1. 下载地址：https://www.mongodb.com/download-center/community
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