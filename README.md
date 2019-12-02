# moacVote
##投票项目操作文档
###DApp使用
1. DApp运行在tokenpocket中，tokenpocket下载地址[https://www.tokenpocket.pro]，iOS手机下载testflight版本，App Store版本无dapp store。
2. 进入APP，点击发现菜单，在搜索框输入“墨客投票工具”，可发现如图dapp，点击进入。
	![1](https://github.com/gaoshan-tech/moacVote/raw/master/pic/1.jpeg)
3. 进入dapp首页，确认当前地址是否有moac，没有moac无法发起投票。
	![2](https://github.com/gaoshan-tech/moacVote/raw/master/pic/2.jpeg)
4. 点击“进入投票”按钮，进入投票列表页，点击右上角“发布投票”按钮，进入发布投票页面，按照提示填写内容，即可发起投票，发起投票需支付少量moac。
	当然不是所有人都有权限发起投票，需要管理员授权才可以发起。
	![3](https://github.com/gaoshan-tech/moacVote/raw/master/pic/3.jpeg)
  ![4](https://github.com/gaoshan-tech/moacVote/raw/master/pic/4.jpeg)
  ![5](https://github.com/gaoshan-tech/moacVote/raw/master/pic/5.jpeg)
5. 列表页等待投票项目链上交易成功，即可发起投票，这里说明下显示规则
	- 交易未上链，投票发起人可见，其他人不可见，再次点击进入可继续支付
	- 交易等待确认，投票发起人可见，其他人不可见，不可进行操作
	- 交易成功，投票发起人可见，其他人不可见，不可进行操作
	- 进行中，满足白名单、黑名单规则的人均可见，满足条件的人都可以投票
	- 已结束，满足白名单、黑名单规则的人均可见，不可进行操作
	![6](https://github.com/gaoshan-tech/moacVote/raw/master/pic/6.jpeg)
  ![7](https://github.com/gaoshan-tech/moacVote/raw/master/pic/7.jpeg)
6. 进行中的投票，点击进入，可进行投票，投票也需要支付少量moac，投票有几个状态
	- 交易等待确认，投票人可见，其他人不可见，不可进行操作
	- 交易成功，满足白名单、黑名单规则的人均可见
	![8](https://github.com/gaoshan-tech/moacVote/raw/master/pic/8.jpeg)
  ![9](https://github.com/gaoshan-tech/moacVote/raw/master/pic/9.jpeg)

###后台管理使用
后台管理地址:http://host/moacVote，功能模块如下图
	(img)
####投票列表
1. 白名单/黑名单
	- 上传文件为txt，格式如图所示，多个地址换行显示
![10](https://github.com/gaoshan-tech/moacVote/raw/master/pic/10.png)
	- 白名单规则：只允许白名单内地址查看和投票
	- 黑名单规则：不允许黑名单内地址查看和投票
	- 如果同时设置白名单和黑名单，只允许白名单内排除掉黑名单的地址查看和投票
2. 投票其他操作
	- 删除：删除该投票，dapp上不再显示
	- 导出：导出完整投票情况excel

####管理员管理
- 只有将钱包地址添加至管理员列表中，才有权限在dapp中发起投票
- 删除、编辑、修改密码不用复述了吧，按照提示操作即可
