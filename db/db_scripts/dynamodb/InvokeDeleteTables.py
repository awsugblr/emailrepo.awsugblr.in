import os

def delete_tables():
	os.system('python3 DeleteTableUsers.py')
	os.system('python3 DeleteTableContacts.py')

	print("Tables deleted successfully")

if __name__ == '__main__':
	delete_tables()
