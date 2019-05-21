import mysql.connector
import os

def drop_schema():
	os.system('python3 DropTableUsers.py')
	os.system('python3 DropTableContacts.py')

	print("Schema dropped successfully")

if __name__ == '__main__':
	drop_schema()
