import boto3

dynamodb = boto3.resource('dynamodb')

dynamodb.create_table(
	TableName='Contacts',
	KeySchema=[
		{
			'AttributeName': 'email_address',
			'KeyType': 'HASH' 
		},
		{
			'AttributeName': 'full_name',
			'KeyType': 'RANGE'
		}
	],
	AttributeDefinitions=[
		{
			'AttributeName': 'email_address',
			'AttributeType': 'S'
		},
		{
			'AttributeName': 'full_name',
			'AttributeType': 'S'
		},
		{
			'AttributeName': 'dnd_bounce_invalid',
			'AttributeType': 'B'
		}
	]
)

# Wait until the table exists.
table.meta.client.get_waiter('table_exists').wait(TableName='Contacts')

print(table.creation_date_time)
