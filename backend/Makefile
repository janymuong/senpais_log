# Makefile: Creating Python Virtual Environment
# setup && activation

setup:
	# create python virtualenv & source it
	# source splog/Scripts/activate ---GitBash
	# source splog/bin/activate ---GNU/Linux
	python -m virtualenv splog

install:
	# this should be run from inside a virtualenv
	# pip install --upgrade pip &&\
	pip install -r requirements.txt

test:
	# tests go here

lint:
	# pylint: Linter for Python code view-source: https://www.pylint.org/
	# this should be run from inside a virtualenv
	pylint --disable=R,C,W1203,W1202 flaskr/__init__.py

all: install lint test
