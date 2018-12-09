# Makefile for lambda serverless functions

ROOT := .
include $(ROOT)/make-include.mk

lambda:
	$(PYTHON) create_serverless.py

clean:
	rm -f login.zip
