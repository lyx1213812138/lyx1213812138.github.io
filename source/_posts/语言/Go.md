---
title: Go
data: 2024-05-01
tags:
  - 后端
  - Go
  - 语言学习
---
## Todo
### 1. 游标，文档流

```go
// 查找多个文档返回一个光标
// 遍历游标允许我们一次解码一个文档
for cur.Next(context.TODO()) {
	// 创建一个值，将单个文档解码为该值
	var elem Student
	err := cur.Decode(&elem)
	if err != nil {
		log.Fatal(err)
	}
	results = append(results, &elem)
}
```

### 2. 池化技术
### 3. 数据库
### 4. google论文
the tail at scale

## 基本语法
### itoa
https://www.jb51.net/article/257413.htm
行计数器
### 数组
可以直接通过\==比较运算符来比较两个数组
### 切片
t:=x[m:n]的t的地址还是原x的地址
因为slice值包含指向第一个slice元素的指针，因此向函数传递slice将允许在函数内部修改底层数组的元素。换句话说，复制一个slice只是对底层的数组创建了一个新的slice别名（§2.3.2）
容量和长度
```
fmt.Println(summer[:20]) // panic: out of range 
endlessSummer := summer[:5] // extend a slice (within capacity) and the value is original slice
```
我们不能确认append时在原先的slice上的操作是否会影响到新的slice。因此，通常是将append返回的结果直接赋值给输入的slice变量：

`runes = append(runes, r) // avoid changing original slice, so we change original variable` 

因为我们一开始就知道names的最终大小，因此给slice分配一个合适的大小将会更有效。下面的代码创建了一个空的slice，但是slice的容量刚好可以放下map中全部的key：

`names := make([]string, 0, len(ages))`

### for range 中赋值问题
如果要改变其中的结构，要用t[i]
```go
type T struct {
  A int
  B string
}
func main() {
  t := []T{{1, "a"}, {2, "b"}}
  fmt.Println(t)
  for i, v := range t {
    fmt.Printf("%p %p\n", &v, &t[i]) // 地址不同
    v.A = 3
  }
}
```
### rune
在Go中，`rune` 是一个内置类型，代表一个 Unicode 码点，也就是一个 Unicode 字符。

### map
`if age, ok := ages["bob"]; !ok { /* ... */ }`
ok 键是否真的存在于map中

### struct
点操作符也可以和指向结构体的指针一起工作

如果结构体成员名字是以大写字母开头的，那么该成员就是导出的

如果要在函数内部修改结构体成员的话，用指针传入是必须的；因为在Go语言中，所有的函数参数都是值拷贝传入的，函数参数将不再是函数调用时的原始变量。slice是因为它的值就是指针。

需要注意的是Printf函数中%v参数包含的#副词，它表示用和Go语言类似的语法打印值。对于结构体类型来说，将包含每个成员的名字。

`json.Marshal(movies)`
`data, err := json.MarshalIndent(movies, "", " ")`

结构体的成员Tag可以是任意的字符串面值，但是通常是一系列用空格分隔的key:"value"键值对序列；
`Year int" "json:\"released\""` 
`Color bool "json:\"color,omitempty\""`
`json.Unmarshal(data, &titles)`

## 错误处理
### 传播错误到父亲函数

```go
if err != nil { return nil, fmt.Errorf("parsing %s as HTML: %v", url,err) }
```
由于错误信息经常是以链式组合在一起的，所以错误信息中应避免大写和换行符。

在Go中，错误处理有一套独特的编码风格。检查某个子函数是否失败后，我们通常将处理失败的逻辑代码放在处理成功的代码之前。如果某个错误会导致函数返回，那么成功时的逻辑代码不应放在else语句块中，而应直接放在函数体中。Go中大部分函数的代码结构几乎相同，首先是一系列的初始检查，防止错误发生，之后是函数的实际逻辑。

## defer
所以，对匿名函数采用defer机制，可以使其观察函数的返回值。
`func double(x int) (result int) { defer func() { fmt.Printf("double(%d) = %d\n", x,result) }() return x + x }`
被延迟执行的匿名函数可以修改函数返回给调用者的所有返回值：

## 包和文件
默认的包名就是包导入路径名的最后一段，因此即使两个包的导入路径不同，它们依然可能有一个相同的包名。
```
import (
    "crypto/rand"
    mrand "math/rand" // alternative name mrand avoids conflict
)
```

指定当前工作目录 GOPATH
```
$ export GOPATH=$HOME/gobook
$ go get gopl.io/...
```

pkg子目录用于保存编译后的包的目标文件，bin子目录用于保存编译后的可执行程序，例如helloworld可执行程序。
## 读整个文件
```
ioutil.ReadFile(filename)
```
`ReadFile`函数返回一个字节切片（byte slice），必须把它转换为`string`
## 接口
接口的动态类型和动态值
非空接口可能类型不空而值为nil，可能在一个函数内外变量为nil的定义不同
```go
var p *int
fmt.Println(p==nil)
f(p) //func f(p interface{}) {fmt.Println(p==nil)}
```

### 接口与方法
问题：cannot convert v (variable of type data.Up) to type data.Vgroup: data.Up does not implement data.Vgroup (method GetVideo has pointer receiver) 方法不能是指针
https://chenhe.me/post/pointer-and-interface-in-go#%E6%8E%A5%E5%8F%A3%E7%9A%84%E6%9C%AC%E8%B4%A8
- `Book` 与 `*Book` 是两个完全不同的类型。
- 值接收器的方法隐式地同时被声明为指针类型的方法。反之**不**成立。
- 接口的实现不一定是结构体，而可能是任意类型。
- 可以认为接口的值相当于接口的一个实例。把一个接口的实现赋值给接口变量，接口的值不是实现的值，是类型和实现值的指针

断言：
- 一个类型断言检查它操作对象的动态类型是否和断言的类型匹配
- 一个接口类型的类型断言改变了类型的表述方式，改变了可以获取的方法集合（通常更大），但是它保留了接口值内部的动态类型和值的部分。
## json解析
结构的属性名必须大写
```go
var data struct {
	Code int `json:"code"`
	// not: code int
}
err := json.Unmarshal([]byte(`{ "code": 901 }`), &data)
fmt.Printf("%#v\n%v", data, err)
```

## 测试
### 单元测试
https://juejin.cn/post/7172037988950474759
- 以 `_test.go` 为后缀名， 单独通过 go test 来编译并执行
- `func TestName(t *testing.T)`
- `{source_filename}_test.go`
- `t.Error, t.Errorf, t.Fatal(+f), t.Fail, t.Log(+f)`
- `--cover` 代码覆盖率
### Mock
对有调库，文件输入，网络传输的代码的单元测试
打桩：函数替换
![](Pasted%20image%2020241104185053.png|)
### 性能测试
![](Pasted%20image%2020241104185451.png)

## string和int转换
- strconv.Atoi(strval)
- strconv.Itoa(intval)
## 判断类型
```go
func justifyType(x interface{}) {
    switch v := x.(type) {
    case string:
        fmt.Printf("x is a string，value is %v\n", v)
    case int:
        fmt.Printf("x is a int is %v\n", v)
    case bool:
        fmt.Printf("x is a bool is %v\n", v)
    default:
        fmt.Println("unsupport type！")
    }
}
```
## 编译
main包里的所有用到的文件都要编译运行

## 匿名函数引用外部变量
```go
for _, f := range filenames {
	go func(f string) {
		thumbnail.ImageFile(f) // NOTE: ignoring errors 
	}(f)
}

// 错误！
for _, f := range filenames {
	go func() {
		thumbnail.ImageFile(f) // NOTE: incorrect! // ... 
	}() 
}
// gorutine执行函数时 f 可能已经变了
```
## Go 版本管理
gopath 此电脑/用户下载依赖的位置
`go mod init` 初始化此模块，用于定位此项目，包括包与包之间的引用
`go mod tidy` 下载所需，删除不需
go proxy 把github等上的包拉取下来，作为备份和缓存

struct{}类型当占位符

## 性能优化
### pprof
```
import ( 
	_ "net/http/pprof" 
	// 会自动注册 handler 到 http server，方便通过 http 接口获取程序运行采样报告
)
func main() { 
	runtime.GOMAXPROCS(1) // 限制 CPU 使用数，避免过载
	runtime.SetMutexProfileFraction(1) // 开启对锁调用的跟踪 
	runtime.SetBlockProfileRate(1) // 开启对阻塞操作的跟踪 
	go func() { 
		// 启动一个 http server，注意 pprof 相关的 handler 已经自动注册过了 
		if err := http.ListenAndServe(":6060", nil); err != nil { 
			log.Fatal(err) 
		} 
		os.Exit(0) 
	}() 
}
```

基本命令：
`go tool pprof -http=:8080 "http://localhost:6060/debug/pprof/XXX"`

XXX改为：
- profile ：cpu占用，火焰图等
- heap：内存
- allocs：申请内存，可能引起频繁 GC
- goroutine：申请协程过多
- mutex：锁的争用的阻塞
- block：阻塞

优化之后 -> 改动前后响应数据diff
https://farmerchillax.github.io/2023/07/04/Go%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90%E5%B7%A5%E5%85%B7/

## 火焰图
https://www.ruanyifeng.com/blog/2017/09/flame-graph.html
y轴调用栈
平顶 -> 性能问题

## GC
https://zhuanlan.zhihu.com/p/334999060
三色标记法：同bfs，黑色是已经遍历，灰色是在队列中，白色是未遍历（可能不可达）
弱三色不变式：不允许“从灰色对象出发，到达白色对象的、未经访问过的路径被赋值器破坏”，允许“赋值器修改对象图，导致某一黑色对象引用白色对象“
插入屏障：在A对象引用B对象的时候，B对象被标记为灰色。
删除屏障：被删除的对象，如果自身为灰色或者白色，那么被标记为灰色。
混合写屏障：为了消除栈的重扫过程（栈上的很容易被删除），一旦栈被扫描变为黑色，则它会继续保持黑色， 并要求将对象分配为黑色。
- GC 开始将栈上的对象全部扫描并标记为黑色；
- GC 期间，任何在栈上创建的新对象，均为黑色；
- 被删除的堆对象标记为灰色；
- 被添加的堆对象标记为灰色；
## [逃逸分析](https://geektutu.com/post/hpg-escape-analysis.html)
逃逸分析：分析这个变量需不需要放到堆上，降低效率但是保证函数ret后还在
情况有：指针逃逸，interface{}动态类型逃逸，栈空间不足，闭包

## GMP模型
G：goroutine
M：工作线程（OS thread），它直接对应于操作系统的线程。M负责实际执行Go代码。一个M可以执行多个Goroutine，但同一时间只能执行一个Goroutine
P：执行Go代码所需的资源

## DataBase
![](Pasted%20image%2020241106215030.png)
![](Pasted%20image%2020241106225845.png)

## 指针切片
```
users := []*User{
	{Name: "Jinzhu", Age: 18, Birthday: time.Now()},
	{Name: "Jackson", Age: 19, Birthday: time.Now()},
}
```

