---
title: Python 爬虫
date: 2024-02-23 00:00:00
tag:
  - Python
---
## 基本

Python virtual environment (venv)

$ pip list

这将显示当前虚拟环境中安装的所有软件包及其版本号。

## request库

```py
r = requests.get(URL)
# or put/delete/head/options
```

```py
response = requests.get(url, params = p_data)
# p_data 是dict结构， 给url添加参数
response.encoding
r.status_code == requests.codes.ok # 相当于r.ok
# status_code 状态码对象
```

r.content 是字节形式内容，text是编码后的内容（一般是Unicode编码）

[当http状态码为418时，可以发送user-agent](https://stackoverflow.com/questions/63388521/response-code-418-when-trying-to-web-scrape-the-api)

```
headers={
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36' 
}
```

## BeautifulSoup 和 lxml

`bs1 = BeautifulSoup(ht.content, 'lxml')`

lxml是xml和html的解析器

bs1.prettify(),用于美化HTML或XML文档的输出。

```python
from lxml import html # 若换为etree则为普通树结构
text = requests.get(url).text
ht = html.fromstring(text)
h1Ele = h1.xpath('//*[@id="firstHeading"]')[0] # 所有元素中id属性为~的
```

## bs1.find() and find_all() and select()

## XPath

## [[MongoDB]]

详见 https://cuiqingcai.com/202243.html

还有自己的程序

## 疑问
