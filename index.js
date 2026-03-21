// index.js

// 1. 从 'ketcher-standalone' 导入 ketcher 对象
// 注意：ketcher-standalone 通常会暴露一个全局的 ketcher 对象或一个默认导出的 init 函数
// 这里的导入方式取决于你的打包工具（如 Vite）如何处理它。通常是这样：
import { Ketcher } from 'ketcher-standalone';

// 2. 将代码包装在一个 async 函数中
async function createImageAndDisplay() {
  try {
    console.log('正在初始化 Ketcher 实例...');

    // 3. 这是关键！初始化 Ketcher 编辑器到一个隐藏的 div 中
    // ketcher.init() 会返回一个 promise，解析后得到 ketcher API 实例
    const ketcherInstance = await ketcher.init(
      document.getElementById('ketcher-container')
    );

    // 如果你的 ketcher-standalone 版本较老，API 可能是挂载在 window 上
    // const ketcherInstance = window.ketcher;

    console.log('Ketcher 初始化完成。');
    console.log('开始生成图片...');

    // 4. 在获取到的 ketcher 实例上调用 generateImage 方法
    const blob = await ketcherInstance.generateImage('c1ccccc1O', { // 使用苯酚的 SMILES 字符串
      outputFormat: 'png'
    });

    console.log('图片 Blob 已生成:', blob);

    // 5. 将 Blob 转换成 URL 并在页面上显示出来
    const imageUrl = URL.createObjectURL(blob);
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.style.border = '1px solid black'; // 加个边框看得更清楚

    // 6. 将图片元素添加到 HTML 页面中
    document.body.appendChild(imageElement);
    document.querySelector('p').innerText = '图片生成成功！';

  } catch (error) {
    console.error('操作失败:', error);
    document.body.innerText = '操作失败，请查看控制台获取更多信息。';
  }
}

// 运行你的函数
createImageAndDisplay();