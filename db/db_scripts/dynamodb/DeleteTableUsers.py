import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')
table.delete()

print("Successfully deleted the table Users")
