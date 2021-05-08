.SILENT: ;               # no need for @
.ONESHELL: ;             # recipes execute in same shell
.NOTPARALLEL: ;          # wait for this target to finish
.EXPORT_ALL_VARIABLES: ; # send all vars to shell
Makefile: ;              # skip prerequisite discovery

# Determine this Makefile as Main file
THIS_MAKEFILE := $(word $(words $(MAKEFILE_LIST)), $(MAKEFILE_LIST))

# Run this makefile help by default
.DEFAULT_GOAL = help

---: ## -------------------------------------------
.PHONY: install
install: ## Install NPM packages
	npm install

.PHONY: eslint
eslint: ## Run ESLint static analyzer
	npm run lint

.PHONY: test
test: ## Run Newman tests
	npx newman run PostmanAssertsInit.postman_collection.json \
		-r cli,htmlextra,json \
		--reporter-json-export ./reports/postman_runner_report.json \
		--reporter-htmlextra-export ./reports/postman_ci_tests_report.html

---: ## -------------------------------------------
.PHONY: help
help: .logo ## Show this help and exit
	echo "Targets:"
	echo ''
	grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(THIS_MAKEFILE) | awk 'BEGIN {FS = ":.*?## "}; \
		{printf "  %-15s %s\n", $$1, $$2}'
	echo ''
%:
	@:
