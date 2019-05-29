import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Contacts')
table.delete()

print("Successfully deleted the table Contacts")
