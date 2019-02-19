# Makefile for lambda serverless functions

ROOT := .
include $(ROOT)/make-include.mk

lambda:
	$(PYTHON) create_serverless.py

clean:
	rm -f login.zip
	rm -f activecontacts.zip
	rm -f addnewcontact.zip
	rm -f invalidcontacts.zip
	rm -f activecontact.zip
	rm -f invalidcontact.zip
