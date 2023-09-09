################################################################################
# Dependency Installation
################################################################################

install-client-dependencies:
	@cd client && npm install

install-server-dependencies:
	@cd server && npm install

dependencies:
	@make install-client-dependencies && make install-server-dependencies


################################################################################
# Running Dev Servers
################################################################################

run-client-dev:
	@cd client && npm start

run-server-dev:
	@cd server && npm start

dev:
	@make -j 2 run-client-dev run-server-dev
