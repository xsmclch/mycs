# git
## First set WHO Y R
Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
## git init
- git init
- git init --bare
```bash
echo "# CZUi-SelfShellleran" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/xsmclch/CZUi-SelfShellleran.git
git push -u origin main
```
	git log --all --graph --decorate (--oneline)
	git status
	git add
	git commit
	git checkout "commitID" to goto the ID's status
	git checkout master(branch name, to goto the newest of the branch)
	git diff IDofcommitToCompare "filename" to see the diff between now and the last version
	git branch : To see the branch status
	git branch -vv : see the details
	git branch <newbranchname> : To open up a new branch
	git checkout -b <newbranchname> : Open up and enter a new branch
	git merge <branchToMergename> Done if there is no conflict
		conflict?
		vim <filename> deal with the conflict mark and->
		git add <filename> 
		git merge --continue

# git remote
```bash
git remote add <remotename> <url/etc>
git push <remotename> <local branch>:<remote branch>
git clone <url> (--shallow) <folder name>
git branch --set-upstream-to=origin/master get corresponse to the remote branch
git fetch
git pull = git fetch; git merge
git branch -m newname
git push origin :old-branch-name new-branch-name
git push origin -u new-branch-name
