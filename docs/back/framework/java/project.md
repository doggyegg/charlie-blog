# 从前端视角看：从 0 到 1 完整开发一个 Spring Boot 接口

作为前端开发者初探 Java 后端，最大的困惑往往不是语言语法，而是**层层嵌套的架构模型**。为什么写一个简单的增删改查，要拆分出 `Controller`、`Service`、`Dto`、`Vo` 这么多层和这么多文件？

本文将结合一次真实的“获取登录日志列表与详情”的开发实战，从前端视角剖析后端标准接口的开发全路程与经验论。

---

## 为什么要分层？业务架构浅析

在复杂的企业级多模块项目中（如 `framework-model` 纯数据声明模块 VS `system-core` 核心业务模块），分层的本质是为了解耦：

- **Model 模块层 (DTO / VO)**：如同前端单独抽离出来的 `types.d.ts` 或 NPM 类型定义包库。纯轻量级声明，方便被项目中其他微服务直接引用而无需引入沉重的底层数据库代码。
- **Core 模块层 (Controller / Service)**：具体的加工厂和路由层，只有当别人实际发送 HTTP 流量时才会被这里处理。

## Step 0: 核心驱动力（设计数据库表）

**这是前后端思维差异最明显的地方！**

- **前端（组件驱动/视图驱动）**：通常拿到 UI 设计图后，先搭页面结构，再倒推需要什么样的数据结构（State / Props）。
- **后端（领域驱动/数据驱动）**：拿到需求后，第一件事是**设计表结构**，建表。

在几乎所有以 Java 为主导的传统企业级开发流程里，真正的**绝对起点（Step 0）永远都是设计和建立数据库表 (SQL DDL)**。如果没有物理表，框架的 ORM 映射就成了无源之水。

### 1. 典型的建表 SQL 语句 (DDL)

实际开发中，我们通常会在 Navicat 这类工具里执行如下建表语句：

```sql
CREATE TABLE `tfsl_login_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_name` varchar(50) NOT NULL COMMENT '登录账号',
  `login_status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '登录状态（1成功 0失败）',
  `ip_address` varchar(128) DEFAULT NULL COMMENT '登录IP地址',
  `client_type` varchar(32) DEFAULT NULL COMMENT '客户端类型',
  `login_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除标记（0未删除 1已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户登录日志表';
```

### 2. 后端建表的“潜规则”与避坑指南

当你去建一张新表时，如果不遵循行业规范，后端代码写起来会极其痛苦：

- **下划线与驼峰的自动魔法**：数据库的列名必须使用**下划线命名法**（如 `user_name`），只要保持规范，它到了代码实体层就会自动映射为**驼峰命名**的属性（如 `userName`）。千万不要在数据库里用驼峰！
- **必须要有注释 (COMMENT)**：不仅是为了给同事看，更因为随着前后端分离的流行，后端通常会使用代码生成器。如果你的列写了 COMMENT，生成出来的代码和给前端的 API 接口文档都会自带中文说明，直接解放双手。
- **永远带着祖传的四个公共字段**：几乎所有的业务表，闭着眼睛也要加上 `id`（主键），`create_time`（创建时间），`update_time`（修改时间），以及 `is_deleted`（逻辑删除标志，后端绝不轻易做物理删除）。
- **状态字段用整数类型**：表示状态的（比如上线的状态 0和1），坚决不要用字符串，用 `tinyint` 最小的整数类型，又省空间又好建索引。

有了这张表，我们才能在接下来的环节开启 Java 代码旅程！

---

## Step 1: 建立与数据库的“倒影”映射 (Entity 实体层)

**在真正的 0-1 开发中，Entity 才是万物的起源。** 因为无论是 DTO 还是 VO，最终都是在对数据库里的数据进行加工。

**Entity 是干什么用的？**
在后端，我们不能手写各种散乱的 SQL 语句去操作数据库，这就涉及到了 **ORM (对象关系映射)** 的概念。`Entity` 就是数据库里那张表在 Java 代码里的**1:1镜像倒影**。

- 数据库里有一张表叫 `tfsl_login_log`
- 我们在代码里就建一个实体类 `TfslLoginLogEntity`
- 表里有个字段叫 `user_name` `varchar(50)`，实体里就有个属性叫 `private String userName;`

可以说，只要你把 `Entity` 建好了，利用 MyBatis-Plus 这种框架，你连增删改查的 SQL 都不用写了，直接调用 `save(entity)` 或者 `removeById(id)` 就全自动完成了对表的同步操作。这叫**数据持久化**。

```java
@Data
@TableName("tfsl_login_log") // 告诉框架：我这个类映射哪张表
public class TfslLoginLogEntity extends BaseEntity { // BaseEntity 里通常有公共字段像 createTime

    private String userName; // 映射 user_name
    private String loginStatus;

    // ...数据库里有什么，这里就写什么
}
```

---

## Step 2: 定义数据的“出入口”格式 (Model 层)

后端写接口的第一步，通常是先规范好需要收什么数据（DTO）和返回什么数据（VO）。这等同于前端的 `Interface` 声明。

### 1向后端传参格式: DTO (Data Transfer Object)

专门用于定义从外部系统或前端传向后端的入参格式。
对于分页查询，我们通常会让它继承基础的的分页类（自带 `page` 和 `limit`）：

```java
@Data // Lombok 插件提供的魔法，自动生成 getter/setter
@EqualsAndHashCode(callSuper = true)
public class TfslLoginLogQueryDto extends PageQueryDto {
    private String userName;     // 查询条件：用户名
    private String loginStatus;  // 查询条件：登录状态
    // ...
}
```

### 2. 返回给前端的格式: VO (View Object)

专门用于筛选和处理完后，返回给前端展现的“提纯”数据模型。避免把数据库底层敏感的原始字段（如密码、软删除标记）泄露给外部。

```java
@Data
public class TfslLoginLogPageVo implements Serializable {
    private Long id;
    private String userName;

    // 高光经验：利用 @JsonFormat 治愈前端！
    // 加上这一行，后端给到前端的时间绝不再是一串看不懂的时间戳或机器符，而是标致的字符串
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime loginTime;
}
```

---

## Step 3: 搭建数据的“翻译官” (Convert 转换器)

数据库实际存储的对象叫 **Entity**，我们要返回的是 **VO**。这个相互转换的苦力活，一般靠 `MapStruct` 等映射工具全自动实现，相当于前端数组里的 `.map()` 方法。

```java
@Mapper(componentModel = "spring") // 交给 Spring 容器接管
public interface ITfslLoginLogConvert {

    // 只要我们在接口定义好，编译期会自动生成字段对应塞值的冗长代码
    TfslLoginLogPageVo convertToPageVo(TfslLoginLogEntity entity);
}
```

---

## Step 4: 构建核心业务“加工厂” (Service 层)

业务核心逻辑在此发生。对于一个分页列表接口，通常使用成熟的 ORM 框架（比如 **MyBatis-Plus**）。

1. **组合条件**：利用 `LambdaQueryWrapper` 进行参数的装配转换（翻译成 SQL）。
2. **执行查询**：创建 `Page` 对象，利用框架自带分页查出原始 Entity 数据。
3. **数据打磨**：使用上一步的 Convert 翻译官，将数据转换为最终向前端展示的 VO。

```java
@Service // 声明它是一个服务加工厂
public class TfslLoginLogServiceImpl extends ServiceImpl<TfslLoginLogMapper, TfslLoginLogEntity> implements ITfslLoginLogService {

    @Override
    public IPage<TfslLoginLogPageVo> list(TfslLoginLogQueryDto queryDto) {
        // 1. 动态生成查询条件的 SQL Wrapper
        LambdaQueryWrapper<TfslLoginLogEntity> queryWrapper = Wrappers.lambdaQuery(TfslLoginLogEntity.class)
                .like(StringUtils.isNotBlank(dto.getUserName()), TfslLoginLogEntity::getUserName, dto.getUserName());

        // 2. 装配分页参数开始查询
        IPage<TfslLoginLogEntity> page = new Page<>(queryDto.getPage(), queryDto.getLimit());
        IPage<TfslLoginLogEntity> pageData = super.page(page, queryWrapper);

        // 3. 将原汁原味的数据转成提纯后的 VO 对象
        return pageData.convert(convert::convertToPageVo);
    }
}
```

---

## Step 5: 安装对外的“门面”路由 (Controller)

这是最靠近前端工程师的一层，你甚至可以把它视作加强版的 `Express Router`。

```java
@RestController // 表示所有接口默认返回 JSON
@RequestMapping("/system/loginLog") // 一级路由前缀
public class TfslLoginLogController {

    private final ITfslLoginLogService loginLogService; // 注入加工厂

    @PostMapping("/list") // 定义二级路由和请求方式
    @SaCheckPermission("M_system_P_loginLog_B_view") // 核心权限守卫钩子
    public Result<IPage<TfslLoginLogPageVo>> list(@RequestBody @Validated TfslLoginLogQueryDto queryDto) {
        // Result.success 是统一套上一层 {code:0, message:"操作成功"} 的外壳
        return Result.success(loginLogService.list(queryDto));
    }
}
```

---

## 🔥 跨栈避坑与经验总结

在尝试运行和调试你刚写的接口时，以下两点能避免浪费 80% 的排错时间：

### 1. JSON 解析严苛度踩坑

当你拿着 Postman 兴奋地发起 `POST` 测试时，绝不能像在 JS 代码里那样放飞自我：

```javascript
// 后端接到直接报 500 序列化 JSON 异常！因为这在后端眼里属于非法格式。
{
    page: 1,
    limit: 10
}
```

**经验**：原生 HTTP 请求传输的 JSON 字符串必须严丝合缝，所有的 `Key`（对象属性名）必须包裹上标准的双引号，不然 `Jackson` 序列化库会直接报错拦截。

### 2. 多模块项目编译的盲区

这是前端转 Java 时几乎必踩的坑。如果在 `Vue` 或者 `React` 里，代码一保存，WebPack / Vite 的热更立刻生效。

但在如上这种多模块（Multi-Module）架构下：如果你修改的是被当作“依赖引入”的底层 `Model` 或 `Core` 层文件，而你只单独重启跑在最外层业务入口的 `spring-boot:run` 命令，**你的新代码是不会被识别并生效的。**
**经验**：一定要退回到整个项目的根目录文件夹，完整地执行强制全量覆盖编译：

```bash
mvn clean install -DskipTests
```

当系统把你刚写的包重新打成最新的 `.jar` 文件后，你的业务代码才能真正跑出效果！
