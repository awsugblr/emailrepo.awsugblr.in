import mysql.connector

def create_contacts():
	connection, cursor = None, None
	try:
		connection = mysql.connector.connect(host='emailrepo.cxz70el1sxbh.ap-south-1.rds.amazonaws.com', user='root', password='awsugblr123#', database='emailrepo')
		cursor = connection.cursor()
		cursor.execute('CREATE TABLE Contacts (ContactID DOUBLE NOT NULL AUTO_INCREMENT PRIMARY KEY, EmailAddress VARCHAR(100) NOT NULL, FullName VARCHAR(100), DNDEmailBounce BOOLEAN, Comments VARCHAR(150));')
		print("Table Contacts created successfully.")
	except mysql.connector.Error as err:
		print(err)
	finally:
		if connection:
			connection.close()
		if cursor:
			cursor.close()


if __name__ == '__main__':
	create_contacts()
