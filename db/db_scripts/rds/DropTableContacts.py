import mysql.connector

def drop_contacts():
	connection, cursor = None, None
	try:
		connection = mysql.connector.connect(host='emailrepo.cxz70el1sxbh.ap-south-1.rds.amazonaws.com', user='root', password='awsugblr123#', database='emailrepo')
		cursor = connection.cursor()
		cursor.execute('DROP TABLE Contacts;')
		print("Table Contacts dropped successfully.")
	except mysql.connector.Error as err:
		print(err)
	finally:
		if connection:
			connection.close()
		if cursor:
			cursor.close()


if __name__ == '__main__':
	drop_contacts()
