import os

def create_tables():
	os.system('python3 CreateTableUsers.py')
	os.system('python3 CreateTableContacts.py')

	print("Tables created successfully")

if __name__ == '__main__':
	create_tables()
