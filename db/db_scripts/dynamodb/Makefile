# Makefile for DB schema

ROOT := .
include $(ROOT)/make-include.mk

createtableschema:
	$(PYTHON) EmailrepoCreateTableSchema.py

droptableschema:
	$(PYTHON) EmailrepoDropTableSchema.py

clean:
	rm -f DropTable*.py
	rm -f CreateTable*.py
	rm -f InvokeCreateTable.py
	rm -f InvokeDropTable.py
