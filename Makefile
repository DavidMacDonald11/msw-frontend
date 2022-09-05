SHELL := /bin/zsh
.DEFAULT_GOAL := run

.PHONY: run
run:
	npm run dev

.PHONY: deploy
deploy:
	git push origin main
	vercel --prod
	vercel logs https://davids-minecraft-server.vercel.app/
