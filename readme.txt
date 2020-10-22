*基本概念：
·当项目太大，质量太差时，重构成本大，时间长，项目质量风险大，业务有变化的可能。可以考虑对项目的核心流程编写前端自动化测试用例，当我们修改系统时，测试用例会被一次一次调用，如果出错，可以第一时间感知到，及时修复错误。
·提高软件质量的方式：
  -- code review
  -- 测试人员测试
  -- 灰度发布机制
  -- TS、EsLint、StyleLint
  -- 前端自动化测试工具
·测试种类：
  -- 单元测试：对一个独立的模块进行功能测试
  -- 集成测试：对多个独立的模块进行功能测试
  -- 端到端测试
  -- 回归测试
  -- 性能测试
  -- 压力测试
  -- 安全测试 
·前端自动化框架种类：
  -- Jasmine
  -- Macha/Chai
  -- Jest

*Jest：
·特点：速度快、API简单、易配置、隔离性好、监控模式、IDE整合、Snapshot、多项目并行、覆盖率、Mock丰富
·安装：cnpm install jest -D
·使用：
   npm run jest：运行改命令后，jest会找到该文件所在目录及子目录中所有*.test.js文件测试模块运行，并将结果输出在控制台
   npm run jest  --watchAll：监听所有测试文件的变化，当有变化时则重新测试所有的测试用例
·配置：npx jest --init
   运行改命令后，将弹出配置选项，按照提示选择即可,最后生成jest.config.js
·jest.config.js说明：
  -- coverageDirectory: "testReport"：将覆盖率测试报告输出到testReport文件夹。
                                    运行npx jest --coverage，将生成报告
·matchers：匹配器
  -- toBe：类似js中的"==="
     test('测试10与10相匹配',()=>{
       except(10).toBe(10)  //测试通过
     })
  -- toEqual：匹配内容相同
     test('测试对象内容相等',()=>{
       const a={one:1}
       except(a).toEqual({one:1})  //虽然引用地址不同，但测试仍然通过
     })
  -- toBeNull：===null
  -- toBeUndefined：===undefined
  -- toBeDefined：变量已被定义过的
  -- toBeTruthy：是否为真
  -- toBeFalsy：是否为假，例如0、false、null、undefined
  -- not：except(1).not.toBeFalsy() 等价于 except(1).toBeTruthy() 
  -- toBeGreaterThan：except(10).toBeGreaterThan(9),期望10比9大，结果通过
  -- toBeLessThan：except(10).toBeLessThan(9),期望10比9小，结果不通过
  -- toBeGreaterThanOrEqual：期望大于等于
  -- toBeLessThanOrEqual：期望小于等于
  -- toBeCloseTo：计算浮点数时代替toEqual方法，因为js计算浮点数时会有误差，except(0.1+0.2).toBeCloseTo(0.3)
  -- toContain：数组是否包含，except([1,2,3]).toMatch(4)，结果不通过
  -- toMatch：字符串是否包含，except('jacksplwxy').toMatch('jack')，结果通过
  -- toThrow：希望函数运行时能抛出指定的异常
      const throwNewErrorFunc = () => {
        throw  new Error('this is a new error')
      }
      test('toThrow', () => {
        expect(throwNewErrorFunc).toThrow('this is a new error')
      })
  -- 更多匹配器，参考：https://jestjs.io/docs/en/expect
      
































































