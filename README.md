1.采用menorepo + pnpm 包管理模式
npm install pnpm -g
cd qiankun_selling
pnpm init
2.创建pnpm-workspace.yaml文件，写入需要下载node_modules的目录
pnpm install
3.指定根目录下package.json的workspaces，只要packages下的文件夹中有有效的package.json文件，都会被视为一个工作区
4.git仓库提交校验依赖移动到根目录
