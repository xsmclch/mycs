# mkdir (-p)
# cd . .. - 
# ls ll -l -a -h -t -F
# touch a{1..3}.py
	touch -- -a <!-- to create a file called "-a" -->
# cat nano vim
# mv
# cp
# rm -r -f {rm -rf /}
# find / -name "hello"
-exec:
	find . -name "*.sh" -exec cp {} ./here \;
# grep wordForMatch "dir" or /.sh ect.. 
# ssh usr@xxx.xxx.xxx.xxx sftp...
# < > >>
# echo
# $_ $@ $# $$ $0 argv
# source \*.sh to import \*.sh
# journalctl
# xdg-open
# cat <!-- stdinput from keyboard! -->
	cat < cat.txt
	i am a cat
	cat < cat.txt > cat2.txt
	cat cat2.txt
 	(output) i am a cat

# |:
	ps aux | grep bash
		a | b 
		b's input is a's output!

# ps
server:
	#! /bin/bash
	sleep 60

chmod +x server
./server &
use **jobs** to check the ps
use **fg** with para **%1** to go back to the **1st** ps
use ^z to stop and ^c to end a ps
if a ps is stopped, use **bg %1** to awake the **1st** ps
  
# data wrangling
	 cat ssh.log | sed 's/.*Disconnected from //' | less
	sed -- a filter!

正则表达式是一种用于匹配和操作文本的强大工具，它是由一系列字符和特殊字符组成的模式，用于描述要匹配的文本模式¹。以下是一些基本的正则表达式语法：

- **普通字符**：包括没有显式指定为元字符的所有可打印和不可打印字符。这包括所有大写和小写字母、所有数字、所有标点符号和一些其他符号¹。

- **特殊字符**：有特殊含义的字符，例如 `*`，表示任何字符串的意思。如果要查找字符串中的 `*` 符号，则需要对 `*` 进行转义，即在其前加一个 `\\`，例如 `runo\\*ob` 匹配字符串 `runo*ob`¹。

- **限定符**：用来指定正则表达式的一个给定组件必须要出现多少次才能满足匹配。有 `*` 或 `+` 或 `?` 或 `{n}` 或 `{n,}` 或 `{n,m}` 共6种¹。

- **字符类**：用方括号 `[]` 表示。例如 `[ABC]` 匹配 `...` 中的所有字符，例如 `[aeiou]` 匹配字符串 "google runoob taobao" 中所有的 `e` `o` `u` `a` 字母¹。

- **非打印字符**：也可以是正则表达式的组成部分。例如 `\\n` 匹配一个换行符¹。

- **边界匹配符**：例如 `^` 匹配输入字符串的开始位置¹。

- **逻辑操作符**：例如 `|` 指明两项

# data wrangling
	echo 'aba' | sed 's/[ab]//'
	output: ba
	echo 'bba' | sed 's/[ab]//' output: ba
	echo 'abcdefg' | sed 's/[dfg]//' output: abcefg
	echo 'abcdefg' | sed 's/[dfg]//g' output: abce (**g** match every time)
	echo abcaba | sed -E 's/(ab)*//g' output: ca **ab**c**ab**a
cat ssh.log | sed -E 's/^.*Disconnected from (invalid )?user .* [0-9.]+ port [0-9]+$//'

cat ssh.log | sed -E 's/^.\*Disconnected from (invalid |authenticating )?user .\* [0-9.]+ port [0-9]+(\[preauth\])?$//' | head -n5

cat ssh.log | sed -E 's/^.\*Disconnected from (invalid |authenticating )?user (.\*) [0-9.]+ port [0-9]+(\[preauth\])?$/\2/' | head -n5
	**\2** means use the second **capture group** (.*) to replace the matched text

cat ssh.log | sed -E 's/^.?*Disconnected from (invalid |authenticating )?user (.*) [0-9.]+ port [0-9]+(\[preauth\])?$/\2/' | head -n5
wc -l

cat ssh.log | sed -E 's/^.?*Disconnected from (invalid |authenticating )?user (.*) [0-9.]+ port [0-9]+(\[preauth\])?$/\2/' | sort | uniq -c

cat ssh.log | sed -E 's/^.?*Disconnected from (invalid |authenticating )?user (.*) [0-9.]+ port [0-9]+(\[preauth\])?$/\2/' | sort | uniq -c | sort -nk1,1 | tail -n10

cat ssh.log | sed -E 's/^.?*Disconnected from (invalid |authenticating )?user (.*) [0-9.]+ port [0-9]+(\[preauth\])?$/\2/' | sort | uniq -c | sort -nk1,1 | tail -n10 | awk '{print $2}' | paste -sd'\0'

## awk
这是一个 `awk` 命令，用于处理文本文件的每一行。`awk` 是一种编程语言，用于在文本文件中查找并处理模式。

这个命令的结构是 `awk 'pattern {action}'`，其中 `pattern` 是一个或多个条件，`action` 是当这些条件满足时执行的操作。

在你给出的命令 `awk '$1 == 3 && $2 ~ /^(c.*i|J.*n)$/ {print $0}'` 中：

- `$1 == 3`：这是第一个条件，它检查每一行的第一个字段（字段之间默认由空格或制表符分隔）是否等于 `3`。

- `$2 ~ /^(c.*i|J.*n)$/`：这是第二个条件，它使用正则表达式检查每一行的第二个字段是否匹配模式 `^(c.*i|J.*n)$`。这个模式匹配所有以 `c` 开始、`i` 结束，或者以 `J` 开始、`n` 结束的字符串。

- `&&`：这是逻辑与操作符，它要求两个条件都满足。

- `{print $0}`：这是当条件满足时执行的操作，它会打印整行的内容。在 `awk` 中，`$0` 表示整行的内容。
cat ssh.log | sed -E 's/^.?*Disconnected from (invalid |authenticating )?user (.*) [0-9.]+ port [0-9]+(\[preauth\])?$/\2/' | sort | uniq -c | awk '($1 == 1 || $1 == 3)&& $2 ~ /^(c.*i|J.*n)$/ {print $0}' | sed 's/[1-3][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9] .*//'

# htop
- use htop to veiw the detail of process
# log
system log is put in /var/log/syslog
Use
```bash
logger "Hello log"
```
To put "Hello log" into log

# stress
# link
- ln -s /path file_name
	-snf /newpath file_name
	unlink file_name
# 启动图像
/etc/motd

# 关于引号的使用

在shell脚本中，单引号(' ')，双引号(" ")和无引号有着不同的用途：

1. **单引号(' ')**：在单引号中的所有字符都会被直接解释为字符串，不会进行任何变量替换或转义字符的解析。例如，`echo '$USER'`将输出`$USER`，而不是当前用户的用户名。

2. **双引号(" ")**：在双引号中，某些特殊字符（如`$`, `\`, `` ` ``等）会被解析。例如，`echo "$USER"`将输出当前用户的用户名。

3. **无引号**：如果没有引号，shell将尝试解析所有的特殊字符。这在你想要进行词分割或路径扩展时很有用。例如，`echo $USER`也将输出当前用户的用户名，但是`echo $HOME/*.txt`将列出你的主目录中所有以`.txt`结尾的文件。


# make
in search of Makefile
# exa
replacement of ls
# tr
eg: echo "hello" | tr [a-z] [A-Z]


# math expr
```bash
num=10
((num++))
let num=num+1
numm=$(expr $num+1)
```




# vim
## mov
- hjkl left down up right
- w goto next word; b goback
- e to goto next word's end
- num + mov
- f + <char> to find next matched <char> and F find previous
- gg goto top G goto end
- $ goto end of line 0 goto head of line
## veiw
- v to go into visual mode
v + `mov` to select
- ctrl+d go down ctrl+u go up
- /<string> to search <string> **n** goto next matched string and **N** goback
## edit
- i goto insert mode simply
- o open a new line and turn to insert mode
- O open a new line before the present line and turn to i
- a turn into insert mode and start after the present character
- d + mov to delete and dd to delete a line (the content you delete will be paste in your next p)
- c to change cc(line)
- y to copy yy(line)
- p to paste
- u to undo
- ctrl+r to redo 
- s is like d+i
- v to selete and shift+> to TAB
## command
- :x save and close, only the file is change will write in
- :w save
- :q quit :wq save and close, always write in 
- v to select and :norm i// to add // to the beginning of every line you've selected
