import {create} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '@models';

// 1. 创建实例
const app = create();

// 2. 加载 model 对象
models.forEach((model) => {
  app.model(model);
});
app.use(createLoading()); // 使用插件

// 3. 启动 dva
app.start();

// 4. 导出 dva 的数据
export default app._store;
