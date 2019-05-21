import mysql.connector
import os

def create_schema():
	os.system('python3 CreateTableUsers.py')
	os.system('python3 CreateTableContacts.py')

	print("Schema created successfully")

if __name__ == '__main__':
	create_schema()
