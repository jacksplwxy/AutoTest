*基本概念：
·使用优势：
  -- 更好的组织项目代码，增加项目可维护性：编写代码时需要考虑如何组织代码使得自动化测试更容易编写
  -- 更小的bug出现概率，尤其是回归测试中的Bug：项目复杂时，修改功能可能引起其他bug，需要多次回归测试。这种情况可以引入前端自动化测试，自动跑一遍用例即可，可节约大量回归测试时间
  -- 修改工程质量差的项目时，增加安全感：当项目太大，质量太差时，重构成本大，时间长，项目质量风险大，业务有变化的可能。可以考虑对项目的核心流程编写前端自动化测试用例，当我们修改系统时，测试用例会被一次一次调用，如果出错，可以第一时间感知到，及时修复错误。
  -- 具备潜在的文档特性：每个集成测试就是一个story，通过用例即可知道项目的主流程是什么，核心功能点什么

·提高软件质量的方式：
  -- code review
  -- 测试人员测试
  -- 灰度发布机制
  -- TS、EsLint、StyleLint
  -- 前端自动化测试工具
·测试种类：
  -- 单元测试：对一个独立的模块进行功能测试
  -- 集成测试：对多个独立的模块进行功能测试。单元测试只能保证当个功能，如果我们测试一个项目，无法确保各个功能之间的依赖没有问题。集成测试，可以让我们站在业务流程的角度来进行测试，以确保这个流程是没有问题的。
  -- 端到端测试：集成测试只是对于前端的测试，是脱离真实后端环境的，仅仅只是将前端放在真实环境中运行，而后端和数据都应该使用Mock的。而端到端测试（E2E Test）则是将整个应用放到真实的环境中运行，包括数据在内也是需要使用真实的。
  -- 回归测试
  -- 性能测试
  -- 压力测试
  -- 安全测试 
·单元测试：https://zhuanlan.zhihu.com/p/55960017
·前端自动化框架种类：
  -- Jasmine
  -- Macha/Chai
  -- Jest

*Jest：
·特点：速度快、API简单、易配置、隔离性好、监控模式、IDE整合、Snapshot、多项目并行、覆盖率、Mock丰富
·Jest的核心实现原理：
  -- 代码：src/Jest/lesson1
·安装：cnpm install jest -D
·使用：
   npm run jest：运行改命令后，jest会找到该文件所在目录及子目录中所有*.test.js文件测试模块运行，并将结果输出在控制台
   npm run jest  --watchAll：监听所有测试文件的变化，当有变化时则重新测试所有的测试用例
   npm run jest  --watch：只监听所有测试文件的变化，当有变化时则重新测试有变化的文件夹中的测试用例，即watchAll中的o模式
·配置：npx jest --init
   运行改命令后，将弹出配置选项，按照提示选择即可,最后生成jest.config.js
·it：test的别名，也可以用it代替test
·jest.config.js说明：
  -- 代码：src/Jest/lesson3
  -- coverageDirectory: "testReport"：将覆盖率测试报告输出到testReport文件夹。
                                    运行npx jest --coverage，将生成报告
  -- moduleFileExtensions：文件后缀名省略
  -- transform：将不同后缀文件通过不同插件进行转换
  -- transformIgnorePatterns：忽略不需要转换的文件夹
  -- moduleNameMapper：将别名映射到真正的路径文件上
  -- snapshotSerializers：通过第三方插件，对快照文件进行格式化存储
  -- testMatch：匹配哪些文件夹下的文件需要进行测试
  -- testURL：jest自动虚拟浏览器对应的地址
  -- watchPlugins：通过第三方插件，为测试监听增加功能，例如可以提示用户选择哪些文件需要测试
·jest结合babel原理：
  -- 代码：src/Jest/lesson4
  -- 执行 npm run test，运行jest，其内部集成插件babel-jest
  -- 该插件会检查当前环境是否安装了 @babel/core，如果安装就会读取 .babelrc 的配置
  -- 在运行测试之前，结合babel，先把代码转换为commonjs语法
  -- 运行的是转换过的测试代码
·Matchers：匹配器
  -- 代码：
     -- src/Jest/lesson4
     -- src/Jest/lesson5
  -- Common：
    -- toBe：类似js中的"==="
       test('测试10与10相匹配',()=>{
         except(10).toBe(10)  //测试通过
       })
    -- toEqual：匹配内容相同
       test('测试对象内容相等',()=>{
         const a={one:1}
         except(a).toEqual({one:1})  //虽然引用地址不同，但测试仍然通过
       })
    -- not：except(1).not.toBeFalsy() 等价于 except(1).toBeTruthy()
  -- Truthiness：
    -- toBeNull：===null
    -- toBeUndefined：===undefined
    -- toBeDefined：变量已被定义过的
    -- toBeTruthy：是否为真
    -- toBeFalsy：是否为假，例如0、false、null、undefined
  -- Numbers： 
    -- toBeGreaterThan：except(10).toBeGreaterThan(9),期望10比9大，结果通过
    -- toBeLessThan：except(10).toBeLessThan(9),期望10比9小，结果不通过
    -- toBeGreaterThanOrEqual：期望大于等于
    -- toBeLessThanOrEqual：期望小于等于
    -- toBeCloseTo：计算浮点数时代替toEqual方法，因为js计算浮点数时会有误差，except(0.1+0.2).toBeCloseTo(0.3)
  -- Arrays and iterables
    -- toContain：数组是否包含，except([1,2,3]).toMatch(4)，结果不通过
  -- Strings：
    -- toMatch：字符串是否包含，except('jacksplwxy').toMatch('jack')，结果通过
  -- Exceptions：
    -- toThrow：希望函数运行时能抛出指定的异常
        const throwNewErrorFunc = () => {
          throw  new Error('this is a new error')
        }
        test('toThrow', () => {
          expect(throwNewErrorFunc).toThrow('this is a new error')
        })
  -- 更多匹配器，参考：https://jestjs.io/docs/en/expect
·命令行工具：
  -- Press w to show more
  -- Press a to run all tests.
  -- Press o to only run tests related to changed files // 必须关联git
  -- Press f to run only failed tests
  -- Press p to filter by a filename regex pattern.
  -- Press t to filter by a test name regex pattern. // 匹配某个 desc
  -- Press q to quit watch mode.
  -- Press Enter to trigger a test run.
  -- jest --watch 默认进入的是 o 模式  
·Jest异步代码的测试方法： 
  -- 代码：src/Jest/lesson6
  -- fetchData函数形式为：测试回调函数中的返回值正确性
      export const fetchData=(fn)=>{
        axios.get('http://www.dell-lee.com/react/api/demo.json').then((res)=>{
          fn(res.data)
        })
      }
      //测试代码为：
      test('fetchData 返回结果为 {success: true}', (done) => {
        fetchData((data) => {
          expect(data).toEqual({
            success: true
          })
          done()
        })
      })
     -- 若没有done回调函数，fetchData中的回调函数不会执行
     -- done回调函数执行了，才表明该测试用例完整进行完了
  --  fetchData函数形式为：直接返回promise时
      export const fetchData=(fn)=>{
        return axios.get('http://www.dell-lee.com/react/api/demo.json')
      }
      //测试代码为：
      test('fetchData 返回结果为 {success: true}', () => {
        return fetchData().then((response) => {
          expect(response.data).toEqual({
            success: true
          })
        })
      })
  -- fetchData函数形式为：
      export const fetchData=(fn)=>{
        return axios.get('http://www.dell-lee.com/react/api/demo123.json')
      }
      //测试代码为：
      test('fetchData 返回结果为 404', () => {
        // 要求 expect 语法必须执行一次
        expect.assertions(1)
        return fetchData().catch((e) => {
          // console.log(e.toString()) // Error: Request failed with status code 404
          expect(e.toString().indexOf('404') > -1).toBe(true)
        })
      })
  -- fetchData函数形式为：测试成功的情况
      export const fetchData=(fn)=>{
        return axios.get('http://www.dell-lee.com/react/api/demo.json')
      }
      //测试代码为：
      test('fetchData 返回结果为 {success: true}', () => {
        return expect(fetchData()).resolves.toMatchObject({
          data: {
            success: true
          }
        })
      })
  -- fetchData函数形式为：测试失败的情况
      export const fetchData=(fn)=>{
        return axios.get('http://www.dell-lee.com/react/api/demo123.json')
      }
      //测试代码为：
      test('fetchData 返回结果为 404', () => {
        return expect(fetchData()).rejects.toThrow()
      })
  -- fetchData函数形式为：测试成功的情况
      export const fetchData=(fn)=>{
        return axios.get('http://www.dell-lee.com/react/api/demo.json')
      }
      //测试代码为：
      test('fetchData 返回结果为 {success: true}', async () => {
        await expect(fetchData()).resolves.toMatchObject({
          data: {
            success: true
          }
        })
      })
  -- fetchData函数形式为：测试失败的情况
      export const fetchData=(fn)=>{
        return axios.get('http://www.dell-lee.com/react/api/demo123.json')
      }
      //测试代码为：
      test('fetchData 返回结果为 404', async () => {
        await expect(fetchData()).rejects.toThrow()
      })
  -- fetchData函数形式为：测试成功的情况
      export const fetchData=(fn)=>{
        return axios.get('http://www.dell-lee.com/react/api/demo.json')
      }
      //测试代码为：
      test('fetchData 返回结果为 {success: true}', async () => {
        const response = await fetchData()
        expect(response.data).toEqual({
          success: true
        })
      })
  -- fetchData函数形式为：测试失败的情况
      export const fetchData=(fn)=>{
        return axios.get('http://www.dell-lee.com/react/api/demo123.json')
      }
      //测试代码为：
      test('fetchData 返回结果为 404', async () => {
        expect.assertions(1)
        try {
          await fetchData()
        } catch (error) {
          // console.log(error.toString())
          expect(error.toString()).toEqual('Error: Request failed with status code 404')
        }
      })
·Jest钩子函数：
  -- 代码：src/Jest/lesson7
  -- 钩子函数：在jest执行过程中自动会调用的函数，跟vue的生命周期函数原理一致
  -- 钩子函数分类
     -- beforeAll：在所有测试用例执行前调用
     -- afterAll：在所有测试用例执行后调用
     -- beforeEach：在每一个测试用例执行前调用
     -- afterEach：在每一个测试用例执行后调用
     -- describe: 
        -- 分组测试
        -- 作用域：每个describe都有自己的作用域且互不影响。
        -- test.only：忽略分组中的其他用例，只执行带有only的用例
  -- 更多钩子函数：https://jestjs.io/docs/en/api
·Jest中的Mock：
  -- 代码：src/Jest/lesson8
  -- 生成mock函数：const func = jest.fn()
  -- mock函数作用：
     -- 捕获函数的是否调用、调用次数、调用传参、调用顺序、调用返回值以及this
     -- 可以让我们自由的设置返回结果
     -- 改变函数的内部实现
  -- API:
     -- mockReturnValue
     -- mockReturnValueOnce
     -- mockImplementation
     -- mockImplementationOnce
     -- mockResolvedValue
     -- mockResolvedValueOnce
     -- mockReturnThis
 -- 本地去模拟异步请求：
     -- 代码：src/Jest/lesson10
     -- 直接使用创建的 __mock__ 模拟
     -- 打开jest.config.js，automock: true,
 -- unmock：取消模拟
 -- jest.requireActual：
    -- 代码：src/Jest/lesson10
    -- 同步请求不写入__mock__时，用该函数
 -- timers：定时器模拟
    -- 代码：src/Jest/lesson11
    -- jest.useFakeTimers()
    -- 避免定时器等待时间：
       -- jest.runAllTimers() 执行所有的timers
       -- jest.runOnlyPendingTimers() 只执行当前队列中的timers
       -- jest.advanceTimersByTime(msToRun) 时间快进多少
 -- 对消耗性能的方法模拟：
    -- 代码：src/Jest/lesson12
    -- 在集成测试中只需知道该方法执行过
    -- jest.mock('./util')：jest.mock发现util是一个类，会自动把类的构造函数和方法变成jest.fn()，如此即不用真正运行util类的真实方法
 -- 对DOM节点操作的测试：
    -- 代码：src/Jest/lesson13
    -- 测试DOM要记得把测试环境设为浏览器环境：
       {
            // testEnvironment: "node",
           testEnvironment: "jest-environment-jsdom",
       }
    -- jest在底层模拟了一套dom api：
       test('测试 addDivToBody', () => {
           addDivToBody()
           addDivToBody()
           let len = $('body').find('div').length
           expect(len).toBe(2)
       })
·snapshot：
  -- 代码：src/Jest/lesson9
  -- snapshot：快照测试
  -- toMatchSnapshot：生成快照文件夹__snapshots__
  -- toMatchInlineSnapshot：行内快照
     -- 对于变化的配置量 Snapshot({ time2: expect.any(Date)})
     -- 同样可以接收 Date | String | Number
  -- 示例：
     test('should generateAnotherConfig 函数', () => {
       expect(generateAnotherConfig()).toMatchSnapshot({
         time2: expect.any(Date)
       })
     })
·vscode的jest插件：扩展中搜索Jest并安装
  -- Jest Snippets：Jest语法提示


*TDD：
·TDD(Test Driven Development) ：测试驱动开发，是一种测试开发流程
·TDD的开发流程（Red-Green Development）：
  -- 编写一个测试用例。
  -- 运行测试，测试用例无法通过测试。
  -- 编写一段代码，使测试用例通过测试。
  -- 优化代码，完成开发。
  -- 重复上述步骤。
·TDD的特点：
  -- 先写测试再写代码
  -- 一般结合单元测试使用，是白盒测试
  -- 测试重点在代码
  -- 安全感低
  -- 优势：
     -- 测试速度快
     -- 长期减少回归bug；
     -- 代码质量好（组织、可维护性）；
     -- 测试覆盖率高
     -- 错误测试代码不容易出现
·TDD + 单元测试适用范围
  -- 如果要写一个纯库类，跟业务没有关系，非常适合用TDD。
  -- 如果是写业务代码，常常由于测试代码中要用功能代码的数据结构，造成耦合性高

*BDD：
·BDD(Behavior Driven Development)：行为驱动开发，是一种测试开发流程
·BDD的开发流程：
  -- 编写代码
  -- 编写测试用例
  -- 运行测试，测试用例无法通过测试
  -- 编写代码，使测试用例通过测试
  -- 优化代码，完成开发
  -- 重复上述步骤
·BDD的特点：
  -- 先写代码再写测试
  -- 一般结合集成测试使用，是黑盒测试
  -- 测试重点在UI（DOM）
  -- 安全感高（站在用户的角度）
  -- （测试用例运行）速度慢
·BDD + 集成测试适用范围：

*Vue环境中配置Jest：
·文档：https://jestjs.io/docs/en/configuration

*vue-test-utils:
·官网：https://vue-test-utils.vuejs.org/zh/guides/
·简介：Vue Test Utils 是 Vue.js 官方的单元测试实用工具库，为jest和vue提供了一个桥梁，暴露出一些接口，让我们更加方便的通过Jest为Vue应用编写单元测试

*Jest在vscode中debugger：https://www.cnblogs.com/chentingjun/p/11764708.html

*其他特点：
·TDD+BDD混合测试
·编写测试用例时，注意测试与业务解耦
·代码测试覆盖率高并不代表一定靠谱，还需要保证集成测试尽量多
·功能测试和UI测试
·测试越独立，隐藏的问题越多
·前后端异步代码模拟，可以考虑写个爬虫，定时爬取后端真实数据作为mock测试数据


*许可协议：
  本项目所有文档遵循CC-BY-SA 4.0协议（ https://creativecommons.org/licenses/by-sa/4.0/deed.zh ）。使用者可以对本创作进行转载、节选、混编、二次创作，可以将其运用于商业用途，唯须署名作者，并且采用本创作的内容必须同样采用本协议进行授权


*更多前端工程化内容：
·npm：https://github.com/jacksplwxy/npm
·webpack：https://github.com/jacksplwxy/webpack
·代码质量：https://github.com/jacksplwxy/Good-Code
·前端自动化测试：https://github.com/jacksplwxy/AutoTest
·前端性能优化：https://github.com/jacksplwxy/FrontEndPerformanceOptimization
·web安全：https://github.com/jacksplwxy/security
·持续集成/持续部署：https://github.com/jacksplwxy/CI-CD





















































