---
title: Python
data: 
tags:
  - Python
  - 语言学习
---
## 杂记

- for循环好办法
	- for tittle , address, price, img, name , sex in zip(tittles , addresses, prices, imgs, names, sexs)  
	- list(zip()) 把 zip 对象变成 list
	
- 通过使用 `if __name__ == '__main__':` 条件，我们可以区分出程序是直接执行还是作为模块导入的。

	这样，我们可以在直接执行时运行一些特定的代码，而在作为模块导入时，这些代码将不会被执行。
	
- 列表的高端用法

	- `list1 = [a*a for a in range(1,10)]`

- time.sleep(2)

	- 在Python中，`time.sleep(2)`是一个用于暂停程序执行的函数。它会使程序在执行到该语句时停顿2秒钟，然后再继续执行后面的代码。`time`是一个Python内置的模块

- json解析

  ```
  # 使用loads()方法将JSON字符串转换为Python对象
  person = json.loads(data)
  # dumps() 反过来
  ```

- 在Python中，`enumerate()`函数用于在迭代过程中同时获取元素的索引和值。
	- ```for index, fruit in enumerate(fruits):
		    print(index, fruit)
 
- `except requests.RequestException:`
	- requests.RequestException 是Python中requests库定义的一个基本异常类。这个异常类是其他异常类的父类，可以捕获所有请求过程中的异常。

- exc_info参数是一个布尔值，默认值为False。如果将exc_info设置为True，logging模块将会在日志中输出异常的详细信息，包括异常类型、异常值和traceback 

	- ```logging.error('error occurred while scraping %s', url, exc_info=True)```
	
- 在re模块中，search() 第一个匹配到的。match_object.span()
	这将返回一个元组，其中包含匹配项的起始位置和结束位置。match_object.group() 这将返回匹配的字符串。

	- 还有findall()

- 你可以使用`sort()`函数来对包含字典的列表按照特定的键进行排序。在Python中，`sort()`函数是用于对可变序列进行原地排序的方法。下面是一个示例代码，演示如何使用`sort()`函数对包含字典的列表按照特定键进行排序：

	```python
	# 创建一个包含字典的列表
	people = [
	    {'name': 'Alice', 'age': 25},
	    {'name': 'Bob', 'age': 30},
	    {'name': 'Charlie', 'age': 20}
	]
	
	# 使用lambda函数作为排序的key参数，指定按照age键进行排序
	people.sort(key=lambda x: x['age'])
	
	# 打印排序后的结果
	for person in people:
	    print(person)
	```

	运行上述代码，输出结果如下：

	```json
	{'name': 'Charlie', 'age': 20}
	{'name': 'Alice', 'age': 25}
	{'name': 'Bob', 'age': 30}
	```

	在这个示例中，我们使用了lambda函数作为`sort()`函数的key参数，指定按照字典中的age键进行排序。lambda函数接受一个字典作为参数，并返回该字典的age值。`sort()`函数根据返回的age值进行排序，从而实现按照age键进行排序的效果。

	你也可以根据需要指定其他键进行排序，只需将lambda函数中的键名修改为你想要排序的键即可。

	希望这个示例能帮助你理解如何使用`sort()`函数对包含字典的列表按照特定键进行排序。如果你还有其他问题，请随时提问。

- ```name_str = ''.join([now_char['text'] for now_char in char_list])```

- 所以大多数Python程序员会遵循一种命名惯例就是让属性名以单下划线开头来表示属性是受保护的

- @property 和 @属性名.setter 装饰器
```python
class Person:
	@property
	def name(self):
		return self._name
	
	@name.setter
	def name(self, value):
		if isinstance(value, str):
			self._name = value
		else:
			raise ValueError("Name must be a string")
		
print(person.name)  # 输出: Alice
person.name = "Bob"  # 更新名字
```

- 作用域和命名空间
	- global 和 nonlocal
```python
num = 1 
def fun1(): 
	global num # 需要使用 global 关键字声明 
	print(num) 
```

```python
def outer(): 
	num = 10 
	def inner(): 
		nonlocal num # nonlocal关键字声明 
		print(num)
```

- 静态方法和类方法
	- 静态方法 ：类的静态方法和我们自定义的函数基本没什么区别，没有 self，且不能访问类属性，实际项目中很少用到，因为可以使用普通函数替代。@staticmethod 装饰器声明。
	- 类方法：必须包含一个参数，通常约定为 cls ，cls 代表 类本身（可以用 cls() 实例化 class），这个参数也不需要我们传值。

- 处理数组：insert() 方法可以在列表的指定位置插入一个元素。如果你想在列表的最前面添加一个元素，可以使用 insert(0, element)，其中 0 表示列表的第一个位置。  另一种方法是通过拼接（concatenation）来创建一个新的列表，将新元素和原列表合并。b = [0] + b

- 输入
```
a,b = map(int,input().split());  
print(a+b)
```

- print
	在Python中，print 函数默认在输出之后添加一个换行符。如果你不希望print函数在输出后换行，可以使用end参数来指定不换行。end参数的默认值是\n，表示换行。如果你想要在同一行输出多个内容，可以将end参数设置为一个空字符串''。