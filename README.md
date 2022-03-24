```
$ npm run dev
```
https://apric-todo-app.herokuapp.com/

- 表示
- 追加
- 削除
- チェックの切り替え
- ソート
- fireStoreを使う
- typescriptを使う

## やり残したこと
- 画像を /publicディレクトリに置いて、
```
import Image from "next/image";
<Image src={require("../public/add.png")} alt="+" width={15} height={15} className="icon_add" />
```
としたいけど、
Error: Image Optimization using Next.js' default loader is not compatible with `next export`. というエラーでbuildできない
→loaderを使いたいけどうまくいっていない
- /pageと/publicディレクトリにおけるファイルを理解できていない
- チェックをつける毎にfirestoreを更新しているけど、通信回数が多くなりそう
- ログイン機能
