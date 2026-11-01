# Simple Trail

为 Minecraft 基岩版附着物制作拖尾的 Blockbench 插件。

沿用 Simple Ragdoll 的资源包工作流：导入资源包，选择附着物，设置采样点和轨迹变化，预览并导出。内置 **Sword Trail** 普通刀光示例。

## 使用

1. 在 Blockbench 的「文件 → 插件」中，从文件加载 `dist/simple_trail.js`。
2. 打开「工具 → Sword Trail 示例」，或通过「文件 → 导入 → 导入拖尾资源包」选择 `.zip`、`.mcpack`、`.mcaddon`。
3. 在附着物列表中双击模型，进入「拖尾」模式。选择起点 A、终点 B，用三维手柄或数值调整位置。两个点可以分别绑定不同骨骼。
4. 设置保留时间、采样间隔、宽度曲线、不透明度曲线、颜色和混合方式。
5. 点击「运行模拟」，选择「操纵整个附着物」，使用移动（V）或旋转（R）手柄挥动模型。也可以点击「试挥一次」。空格暂停或继续，Esc 取消当前拖动。
6. 在附着物列表中勾选要生成拖尾的项目，导出资源包。同一个附着物选择一个采样模型，可以同时处理多个附着物。

拖尾配置可以独立导入、导出为 `.trail.json`，也会随 `.bbmodel` 项目保存。重新启动 Blockbench 后，导入对应的原资源包即可重新关联并导出。已生成的包也可以重新导入修改，不会重复叠加拖尾资源。

## 参数

| 参数 | 作用 |
| --- | --- |
| 采样点 A / B | 定义轨迹的两条边。坐标与 Bedrock 模型中的骨骼枢轴坐标一致，使用模型单位，随所选骨骼运动 |
| 参考根骨骼 | 拖尾模型继承的顶层骨骼，用于消除重复变换 |
| Molang 条件 | 决定游戏中何时记录新轨迹。`v.trail_attack` 是玩家攻击进度，填 `1` 可持续记录 |
| 保留时间 / 采样间隔 | 控制长度和采样密度，最多 32 段历史，每段两个三角面 |
| 宽度曲线 / 收缩中心 | 控制轨迹随时间收窄或展开。曲线横轴为归一化寿命，0 表示刚生成，1 表示到期 |
| 不透明度曲线 / 基础不透明度 | 控制每段轨迹的透明度。固定透明度共用一个渲染控制器，渐变透明度为每段生成一个控制器 |
| 颜色 / 混合 / 光照 | 支持发光叠加或透明混合，可选择是否受环境光照影响 |
| 第一人称空间 | 默认手持模型空间。世界空间同时补偿玩家移动和摄像机转动 |
| 角色模型缩放 | 模型单位与世界坐标之间的比例，默认 `0.9375` |
| 瞬移重置距离 | 超过指定距离时清除历史，避免拉出很长的连线 |
| 拖尾贴图 | 资源包内的 PNG 路径，留空使用内置贴图。自定义贴图需与 `assets/triangle.png` 的三角形区域一致 |

曲线支持拖动关键点、双击添加、方向键微调，以及删除内部关键点。不透明度按轨迹段变化，不是顶点渐变。

## 导出与预览

导出的是**所选资源包的修改版**，保留它的 manifest、原有持握动画、渲染设置及其他文件，为选中的附着物增加独立模型、动画、控制器、材质和贴图。解开 `.mcaddon` 后只导出选中的资源包，不重新打包行为包。没有 manifest 的模型压缩包可用于编辑，但必须补齐原资源包的 manifest 才能导出可导入游戏的 `.mcpack`。

生成的拖尾通过附着物读取玩家与自身骨骼的信息，不修改玩家实体定义，不需要行为包脚本。当前运行入口面向玩家持有的附着物。原资源包仍需提供可用的附着物模型、持握动画及其依赖。

预览用于检查三维运动、采样点和拖尾形状。它不会执行任意游戏 Molang 查询，也不模拟第一人称镜头；预览中的「记录新的轨迹」开关代替游戏触发条件。模型在普通编辑模式中的修改会用于导出，导入的动画供查看，动画编辑不是这个插件的导出范围。

运行代码沿用已在 Sword Trail 中验证的骨骼采样和三角面拟合。新增参数组合仍需进游戏确认，尤其是第一人称世界空间和透明度渐变。当前验证包括 Node 数学与资源测试、Blockbench 5.2.2 的中文和英文界面操作；这不等同于对所有附着物进行游戏兼容性验证。

## Sword Trail 示例

- `examples/sword_trail.mcpack`：已生成刀光的钻石剑资源包，可导入游戏或插件
- `examples/sword_trail_source.mcpack`：未注入拖尾的源资源包
- `examples/sword_trail.trail.json`：对应的可编辑拖尾配置
- `examples/source/`：示例源文件

## 开发

使用 Node.js 22 或更新版本：

```sh
npm ci
npm run examples
npm run build
npm test
```

`npm run examples` 重新生成示例，`npm run build` 将示例一同打包进插件。修改示例或生成器后按此顺序构建。

Blockbench 集成测试使用独立的测试配置目录，以 `--remote-debugging-port=9241` 启动 Blockbench，且 `--userData` 路径必须包含 `trail-bb-test-profile`：

```sh
npm run test:blockbench
node scripts/test-blockbench.mjs --english
```

测试输出保存在 `test/output/`。插件包包含 Three.js TransformControls、JSZip 和 Pako 的第三方许可。钻石剑贴图来自 Mojang 的 [bedrock-samples](https://github.com/Mojang/bedrock-samples)，示例持握动画和刀光技术基于现有 Sword Trail 示例。

---

# English

Simple Trail is a Blockbench plugin for creating trails on Minecraft Bedrock attachables.

It follows Simple Ragdoll’s resource-pack workflow: import a pack, choose an attachable, place two sample points, configure the trail, preview it and export. **Sword Trail**, an ordinary sword trail, is included as an editable example.

## Getting started

1. Load `dist/simple_trail.js` from Blockbench’s plugin manager.
2. Choose **Tools → Sword Trail Example**, or import a `.zip`, `.mcpack` or `.mcaddon` through **File → Import → Import Trail Resource Pack**.
3. Double-click an attachable. In Trail mode, place points A and B using the 3D handles or numeric fields. Each point follows its selected bone.
4. Set lifetime, sampling interval, width and opacity curves, color and blending.
5. Start the preview, select **Move the whole attachable**, and use the move (V) or rotate (R) handle. **Test Swing** provides a quick motion. Space pauses or resumes; Escape cancels a drag.
6. Check the entries to include in the attachable browser and export. Each attachable uses one selected sampling geometry; multiple attachables can be exported together.

Configurations can be imported and exported as `.trail.json`, and are saved with `.bbmodel` projects. Reimport the original resource pack to relink a saved project after restarting Blockbench. Generated packs can also be reimported without accumulating duplicate trail resources.

## Configuration and export

Points use Bedrock model coordinates, like bone pivots. Lifetime and interval determine the number of historical segments, up to 32. Width and opacity curves use normalized age from 0 to 1. The width anchor controls which part of the sampled span stays fixed as it narrows. Constant opacity shares one render controller; varying opacity uses one controller per segment and is not a per-vertex gradient.

The default emission expression uses `v.trail_attack`, the player’s attack progress. Set it to `1` for continuous emission. First person defaults to view-model space; world space also compensates player translation and camera rotation. A teleport threshold clears old positions after large jumps. Custom PNG textures must match the triangular mask in `assets/triangle.png`.

Export produces a modified copy of the selected resource pack, preserving its manifest, original holding animations and other resources. Generated assets are isolated per attachable. Importing an add-on does not cause its behavior pack to be repackaged. A resource-pack manifest is required for an importable `.mcpack`.

The runtime supports player-held attachables without modifying the player entity or requiring behavior-pack scripts. The source pack must supply its own working attachable model, holding animations and dependencies.

The preview checks 3D movement and trail shape; it does not evaluate arbitrary game Molang queries or reproduce a first-person camera. Its recording checkbox replaces the game emission condition. Model edits are included in export; editing imported animation assets is outside the plugin’s export scope.

The bone sampling and triangle fitting come from the existing Sword Trail implementation. New parameter combinations still require in-game validation, especially first-person world space and varying opacity. Automated verification covers mathematical/resource tests and Blockbench 5.2.2 UI operations in Chinese and English.

The configured example is `examples/sword_trail.mcpack`; its unmodified source pack and standalone configuration are beside it. Build with Node.js 22+: `npm ci`, `npm run examples`, `npm run build`, then `npm test`.
